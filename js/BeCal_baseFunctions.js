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
}