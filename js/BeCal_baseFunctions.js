/* basic functions of the becal system which do not belong to any specific system or module. */

// change the css color.
function changeCSS_Color(foldername)
{
	$('#csscolor').attr('href', 'styles/colors/'+foldername+'/colors.css');
	cookieset('csscolor', foldername, 90);
}

// load language and init the page.
var g_afterLangFunction = null;
function initpage_default(afterLangFunction)
{
	g_afterLangFunction = afterLangFunction;
	loadLanguage('DE', initpage_default_2);
}

// get the cookie and change the style on startup, after the language loaded.
function initpage_default_2()
{
	var csscolor=cookieget('csscolor');
	if(csscolor!="")
		changeCSS_Color(csscolor);
	
	var content = jQuery.getNewDiv('','content');
	
	var blocker = jQuery.getNewDiv('','blocker');
	var blockercontent = jQuery.getNewDiv('<nobr>Bitte warten,</nobr><br /><nobr>ich arbeite..</nobr>','blockercontent');
	$(blocker).append(blockercontent);
	
	var footer = jQuery.getNewDiv('2018, 2019 by benobiTech incorporated', 'footer');
	
	var githubLink = jQuery.getNewLink('https://github.com/ben0bi/BeCalV3', 'github');

	$(footer).append('&nbsp;|&nbsp;');
	$(footer).append(githubLink);
	
	$(content).append(footer);
	
	jQuery.appendElementTo('body', content);
	jQuery.appendElementTo('body', blocker);
	hideBlocker();
	
	// load the after language function. ("Real" init)
	if(typeof(g_afterLangFunction)==="function")
		g_afterLangFunction();
}

function showBlocker(){$('#blocker').show();}
function hideBlocker(){$('#blocker').hide();}
function setBlockerContent(c){$('#blockercontent').html(c);}

// remove all spaces from a text.
function removeSpaces(text)
{
	var result='';
	for(var i =0;i<text.length;i++)
	{
		if(text[i]!=' ' && text[i]!='	')
			result+=text[i];
	}
	return result;
}