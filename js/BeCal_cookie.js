var cookie = function()
{
	var me = this; // prevent this from this-ing the wrong function body.
	
	var addcookietext = function(key, explanation)
	{
		var val=me.getCookie(key);
		if(val=="") val="nicht gesetzt";
		var txt='<tr><td>'+key+'</td><td>'+val+'</td><td>'+explanation+'</td>';
		txt+='<td><a href="javascript:" onclick="cookieremove(\''+key+'\');location.reload();">RESET</a></td></tr>';
		return txt;
	};
	
	this.getTable = function()
	{
		var txt='<table border="1">';
		txt+='<tr><td>Key</td><td>Aktueller Wert</td><td>Erklärung</td><td>Reset</td></tr>';
	
	/* ADD HERE ALL YOUR USED COOKIES FOR EXPLANATION */
	
		txt+=addcookietext('csscolor', 'CSS Style für die Farben.');
		txt+=addcookietext('cssdesign', 'CSS Style für das Design.');
		
		// your address
		txt+=addcookietext('myname','Dein Name');
		txt+=addcookietext('mystreet','Deine Strasse');
		txt+=addcookietext('mycity', 'Deine Stadt');
		txt+=addcookietext('myzip', 'Deine Postleitzahl');
		txt+=addcookietext('myphone', 'Deine Telefonnummer');
		txt+=addcookietext('myemail', 'Deine Email');
	
	/* ENDOF ADD */
	
		txt+='</table>';

		return txt;
	};

/* Friendly stolen from here:
https://www.w3schools.com/js/js_cookies.asp
*/
	this.getCookie =function(cname) 
	{
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	};
	
	/* Standard expiration: 1 day */
	this.setCookie=function(cname, cvalue, exdays=1) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	};
	
	this.removeCookie=function(cname)
	{
		document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	};
};

cookie.instance = new cookie();

cookieset=function(cname, cvalue, exdays=1) {cookie.instance.setCookie(cname, cvalue, exdays);};
cookieget=function(cname) {return cookie.instance.getCookie(cname);};
cookieremove=function(cname) {cookie.instance.removeCookie(cname);};
cookie_getTable = function() {return cookie.instance.getTable();};


