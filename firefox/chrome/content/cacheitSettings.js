// Script from Popup Count 0.3.3
// By Pike

var cacheitSettings = {

	onLoad: function()
	{
		// Setup object properties
		this.prefBranch = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService).getBranch('cacheit.');

		//Geting the cache provider.
		try
		{
		var defaultprovider = this.prefBranch.getCharPref('defaultprovider');
		}
		catch (err) {}
		document.getElementById('defaultprovider').value = defaultprovider;

		//What to do with the URL
		try
		{
		var leftclick = this.prefBranch.getCharPref('leftclick');
		}
		catch (err) {}
		document.getElementById('leftclick').value = leftclick;

		try
		{
		var middleclick = this.prefBranch.getCharPref('middleclick');
		}
		catch (err) {}
		document.getElementById('middleclick').value = middleclick;
		
		try
		{
		var rightclick = this.prefBranch.getCharPref('rightclick');
		}
		catch (err) {}
		document.getElementById('rightclick').value = rightclick;
		
		try
		{
		var shortcutload = this.prefBranch.getCharPref('shortcutload');
		}
		catch (err) {}
		document.getElementById('shortcutload').value = shortcutload;

		//Show Contextmenu
		try
		{
		var showcontext = this.prefBranch.getBoolPref('showcontext');
		}
		catch (err) {}
		document.getElementById('showcontext').checked = showcontext;

		//Show Toolbar menu
		try
		{
		var showtoolbar = this.prefBranch.getBoolPref('showtoolbar');
		}
		catch (err) {}
		document.getElementById('showtoolbar').checked = showtoolbar;

		//Show Statusbar
		try
		{
		var showstatusbar = this.prefBranch.getBoolPref('showstatusbar');
		}
		catch (err) {}
		//document.getElementById('showstatusbar').checked = showstatusbar;
		
		try
		{
		var showgoogle = this.prefBranch.getBoolPref('showgoogle');
		}
		catch (err) {}
		document.getElementById('showgoogle').checked = showgoogle;
		
		try
		{
		var showcoral = this.prefBranch.getBoolPref('showcoral');
		}
		catch (err) {}
		document.getElementById('showcoral').checked = showcoral;
		
		try
		{
		var showbing = this.prefBranch.getBoolPref('showbing');
		}
		catch (err) {}
		document.getElementById('showbing').checked = showbing;
		
		try
		{
		var showblekko = this.prefBranch.getBoolPref('showblekko');
		}
		catch (err) {}
		document.getElementById('showblekko').checked = showblekko;
		
		try
		{
		var showwayback = this.prefBranch.getBoolPref('showwayback');
		}
		catch (err) {}
		document.getElementById('showwayback').checked = showwayback;
		
		try
		{
		var showwebcite = this.prefBranch.getBoolPref('showwebcite');
		}
		catch (err) {}
		document.getElementById('showwebcite').checked = showwebcite;
		
		try
		{
		var shortcutenabled = this.prefBranch.getBoolPref('shortcutenabled');
		}
		catch (err) {}
		document.getElementById('shortcutenabled').checked = shortcutenabled;
		
		document.getElementById("defaultprovider").disabled = !shortcutenabled;
		document.getElementById("shortcutload").disabled = !shortcutenabled;
		
	},

	onAccept: function()
	{
		var defaultprovider = document.getElementById('defaultprovider').value;
		this.prefBranch.setCharPref('defaultprovider', defaultprovider);

		var leftclick = document.getElementById('leftclick').value;
		this.prefBranch.setCharPref('leftclick', leftclick);

		var middleclick = document.getElementById('middleclick').value;
		this.prefBranch.setCharPref('middleclick', middleclick);
		
		var rightclick = document.getElementById('rightclick').value;
		this.prefBranch.setCharPref('rightclick', rightclick);
		
		var shortcutload = document.getElementById('shortcutload').value;
		this.prefBranch.setCharPref('shortcutload', shortcutload);
		
		var showcontext = document.getElementById('showcontext').checked;
		this.prefBranch.setBoolPref('showcontext', showcontext);

		var showtoolbar = document.getElementById('showtoolbar').checked;
		this.prefBranch.setBoolPref('showtoolbar', showtoolbar);

		//var showstatusbar = document.getElementById('showstatusbar').checked;
		//this.prefBranch.setBoolPref('showstatusbar', showstatusbar);
		
		var showgoogle = document.getElementById('showgoogle').checked;
		this.prefBranch.setBoolPref('showgoogle', showgoogle);
		
		var showcoral = document.getElementById('showcoral').checked;
		this.prefBranch.setBoolPref('showcoral', showcoral);
		
		var showbing = document.getElementById('showbing').checked;
		this.prefBranch.setBoolPref('showbing', showbing);
		
		var showblekko = document.getElementById('showblekko').checked;
		this.prefBranch.setBoolPref('showblekko', showblekko);
		
		var showwayback = document.getElementById('showwayback').checked;
		this.prefBranch.setBoolPref('showwayback', showwayback);
		
		var showwebcite = document.getElementById('showwebcite').checked;
		this.prefBranch.setBoolPref('showwebcite', showwebcite);
		
		var shortcutenabled = document.getElementById('shortcutenabled').checked;
		this.prefBranch.setBoolPref('shortcutenabled', shortcutenabled);

		var topWindow = getTopWindow();
		
		topWindow.document.getElementById("cacheit-contextmenu").hidden = (!showcontext);
		topWindow.document.getElementById("cacheit-toolsmenu").hidden = (!showtoolbar);
		//topWindow.document.getElementById("cacheit-statusbar").hidden = (!showstatusbar);
		
		topWindow.document.getElementById("cacheit-coral").hidden = (!showcoral);
		topWindow.document.getElementById("cacheit-google").hidden = (!showgoogle);
		topWindow.document.getElementById("cacheit-bing").hidden = (!showbing);
		topWindow.document.getElementById("cacheit-blekko").hidden = (!showblekko);
		topWindow.document.getElementById("cacheit-wayback").hidden = (!showwayback);
		topWindow.document.getElementById("cacheit-webcite").hidden = (!showwebcite);
		
		topWindow.document.getElementById("cacheit-key").setAttribute("disabled", !shortcutenabled);
	}
};

function getTopWindow()
{
	var windowManager = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService();
	var windowManagerInterface = windowManager.QueryInterface( Components.interfaces.nsIWindowMediator );
	var topWindow = windowManagerInterface.getMostRecentWindow( "navigator:browser" );
	if( !topWindow )
	{
		topWindow = window.openDialog("chrome://browser/content/browser.xul", "_blank", "chrome,all,dialog=no", "about:blank", null, null);
	}

	return topWindow;
}
