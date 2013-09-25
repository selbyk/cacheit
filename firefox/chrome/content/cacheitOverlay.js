var CacheIt = {
	onLoad: function() {
		this.prefBranch = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService).getBranch('cacheit.');
		
		//Show Contextmenu
		try{ var showcontext = this.prefBranch.getBoolPref('showcontext'); }
		catch (err) {}
		
		//Show Toolbar menu
		try{ var showtoolbar = this.prefBranch.getBoolPref('showtoolbar'); }
		catch (err) {}
		
		//Show Statusbar
		try{ var showstatusbar = this.prefBranch.getBoolPref('showstatusbar'); }
		catch (err) {}
		
		try{ var showgoogle = this.prefBranch.getBoolPref('showgoogle'); }
		catch (err) {}
		
		try{ var showcoral = this.prefBranch.getBoolPref('showcoral'); }
		catch (err) {}
		
		try{ var showbing = this.prefBranch.getBoolPref('showbing'); }
		catch (err) {}
		
		try{ var showblekko = this.prefBranch.getBoolPref('showblekko'); }
		catch (err) {}
		
		try{ var showwayback = this.prefBranch.getBoolPref('showwayback'); }
		catch (err) {}
		
		try{ var showwebcite = this.prefBranch.getBoolPref('showwebcite'); }
		catch (err) {}
		
		try{ var showwebcite = this.prefBranch.getBoolPref('showwebcite'); }
		catch (err) {}
		
		try{ var shortcutenabled = this.prefBranch.getBoolPref('shortcutenabled'); }
		catch (err) { alert("Shortcut not in prefs"); }
		
		document.getElementById("cacheit-contextmenu").hidden = (!showcontext);
		document.getElementById("cacheit-toolsmenu").hidden = (!showtoolbar);
		document.getElementById("cacheit-statusbar").hidden = (!showstatusbar);
		
		document.getElementById("cacheit-coral").hidden = (!showcoral);
		document.getElementById("cacheit-google").hidden = (!showgoogle);
		document.getElementById("cacheit-bing").hidden = (!showbing);
		document.getElementById("cacheit-blekko").hidden = (!showblekko);
		document.getElementById("cacheit-wayback").hidden = (!showwayback);
		document.getElementById("cacheit-webcite").hidden = (!showwebcite);
		
		document.getElementById("cacheit-key").setAttribute("disabled", !shortcutenabled);
		
		document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", CacheIt.disable, false);
		document.getElementById("menu_ToolsPopup").addEventListener("popupshowing", CacheIt.disable, false);
	},
	
	disable: function() {
		var url = CacheIt.getURL();
		
		var myRe = new RegExp("^http://([^:/]+)\.nyud\.net/");
		var coralTest = myRe.exec(url);
		
		myRe = new RegExp("^([^:]+:)?/{2,}([^:/]+)(:\[0-9]+)?/(.*)");
		var httpTest = myRe.exec(url);
		
		if(httpTest== null || httpTest[1] != "http:" || coralTest != null){
			document.getElementById("cacheit-contextmenu").disabled = 1;
			document.getElementById("cacheit-toolsmenu").disabled = 1;
		}else{
			document.getElementById("cacheit-contextmenu").disabled = 0;
			document.getElementById("cacheit-toolsmenu").disabled = 0;
		}
	},
	
	coral: function(button){
		myRe = new RegExp("^([^:]+:)?/{2,}([^:/]+)(:\[0-9]+)?/(.*)");
		reResults = myRe.exec(CacheIt.getURL());

		var url;
		if(reResults[3] != null) {
			var port = new String(reResults[3]).substr(1);
			url = "http://"+reResults[2]+"."+port+".nyud.net/"+reResults[4];
		} else {
			url = "http://"+reResults[2]+".nyud.net/"+reResults[4];
		}
		CacheIt.handleURL(url, button);
	},
	
	google: function(button){
		url = CacheIt.getURL();
		var archive = "http://google.com/search?q=cache:";
		if (url.indexOf("google.com") >= 0)
			alert("Error: Google can't cache itself!");
		else 
			CacheIt.handleURL(encodeURI(archive) + encodeURIComponent(url), button);
	},
	
	wayback: function(button){
		CacheIt.handleURL("http://web.archive.org/web/*/" + encodeURI(CacheIt.getURL()), button);
	},
	
	blekko: function(button){
		CacheIt.handleURL("http://blekko.com/ws/" + encodeURI(CacheIt.getURL()) + "+/cache", button);
	},
	
	bing: function(button){
		// This code was taken from Ressurect Pages, a Firefox extension with similar intensions. It is under the MIT/X11 License
		var xhr=new XMLHttpRequest();
		xhr.open('GET',
			'http://api.search.live.net/xml.aspx'+
			'?AppId=FD382E93B5ABC456C5E34C238A906CAB1E6F9875'+
			'&Query=url:'+CacheIt.getURL()+
			'&Sources=web&Web.Count=1',
			false
		);
		xhr.send(null);

		try {
			var c=xhr.responseXML.getElementsByTagName('web:CacheUrl');
			CacheIt.handleURL(c[0].textContent, button);
		} catch (e) {
			CacheIt.handleURL('http://www.bing.com/search?q=url:'+CacheIt.getURL(), button);
		}
	},
	
	webcite: function(button){
		CacheIt.handleURL('http://webcitation.org/query.php?url='+CacheIt.getURL(),button);
	},
	
	default: function(button){
		this.prefBranch = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService).getBranch('cacheit.');
		try{ var defaultprovider = this.prefBranch.getCharPref('defaultprovider');}
		catch (err) {alert("icouldn't get the provider");}
		switch(defaultprovider)
		{
			case "coral":
				CacheIt.coral(button);
			break;
			case "google":
				CacheIt.google(button);
			break;
			case "wayback":
				CacheIt.wayback(button);
		}
	},
	
	getURL: function(){
		var cm = gContextMenu;
		if(cm && cm.onLink)
			return(cm.linkURL);
		else
			return(getWebNavigation().currentURI.spec);
	},
	
	handleURL: function(url, button){
		this.prefBranch = Components.classes['@mozilla.org/preferences-service;1'].
		getService(Components.interfaces.nsIPrefService).getBranch('cacheit.');
		
		switch(button){
			case 0:
				try { var handle = this.prefBranch.getCharPref('leftclick');} 
				catch (err) {alert("icouldn't get the loadurl pref");}
			break;
			case 1:
				try { var handle = this.prefBranch.getCharPref('middleclick');} 
				catch (err) {alert("icouldn't get the loadurl pref");}
			break;
			case 2:
				try { var handle = this.prefBranch.getCharPref('rightclick');} 
				catch (err) {alert("icouldn't get the loadurl pref");}
			break;
			case 3:
				try { var handle = this.prefBranch.getCharPref('shortcutload');} 
				catch (err) {alert("icouldn't get the loadurl pref");}
		}
		
		switch(handle)
		{
			case "current":
				loadURI(url);
			break;
			case "newtab":
				delayedOpenTab(url);
			break;
			case "newtabbg":
				gBrowser.addTab(url);
			break;
			case "newwindow":
				window.open(url);
			break;
			case "copy":
				var oclipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
				oclipboard.copyString(url);
		}
	},
	
	settings: function() {
		var settingsHandle = window.open("chrome://cacheit/content/cacheitSettings.xul", "cacheitoptionswindow", "chrome,resizable,centerscreen,close=no");
		settingsHandle.focus();
	},

	about: function () {
		var settingsHandle = window.open("chrome://cacheit/content/cacheitAbout.xul", "cacheitaboutwindow", "chrome,centerscreen,close=no");
		settingsHandle.focus();
	}
};

window.addEventListener("load", function () { CacheIt.onLoad(); }, false);