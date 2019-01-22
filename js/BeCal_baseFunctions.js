/* basic functions of the becal system which do not belong to any specific system or module. */

// change the css color.
function changeCSS_Color(foldername)
{
	$('#csscolor').attr('href', 'styles/colors/'+foldername+'/colors.css');
	cookieset('csscolor', foldername, 90);
}

// get the cookie and change the style on startup.
function initpage_default()
{
	var csscolor=cookieget('csscolor');
	if(csscolor!="")
		changeCSS_Color(csscolor);
	
	var content = jQuery.getNewDiv('','content');
	
	var blocker = jQuery.getNewDiv('','blocker');
	var blockercontent = jQuery.getNewDiv('Bitte warten, ich arbeite..','blockercontent');
	$(blocker).append(blockercontent);
	
	var footer = jQuery.getNewDiv('2018, 2019 by benobiTech incorporated', 'footer');
	
	var githubLink = jQuery.getNewLink('https://github.com/ben0bi/BeCalV3', 'github');

	$(footer).append('&nbsp;|&nbsp;');
	$(footer).append(githubLink);
	
	$(content).append(footer);
	
	jQuery.appendElementTo('body', content);
	jQuery.appendElementTo('body', blocker);
	hideBlocker();
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