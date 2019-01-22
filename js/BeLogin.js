// Login stuff.

// by benobi
// depends on:
// jquery
// bejquery

function showLoginWindow(contentIDorClass)
{
	var inputName = jQuery.getNewElement('input','BeCal_input_login_name', 'login_input');
	inputName.attr('placeholder', 'Name');
	var inputPW = jQuery.getNewElement('input', 'BeCal_input_login_pw','login_input');
	inputPW.attr('placeholder', 'Password');

	var linkNormalSend = jQuery.getNewJSButton('<nobr>LOG IN</nobr>','sendLoginData()','BeCal_button_login_send','btn');

/* New system stuff */
	
	var firstUserMessage = jQuery.getNewDiv('This is a <span class="green">fresh system</span> with <span class="red">no user</span>.<br />You need to <span class="green">create</span> a <span class="green">root user</span> with all privileges.','','login_message');
	var redoPW = jQuery.getNewElement('input', 'BeCal_input_login_pw2','login_input');
	redoPW.attr('placeholder', 'PW again');	
	var linkAddRootUser = jQuery.getNewJSButton('<nobr>Install ROOT</nobr>', 'BeLogin.createRootUser()', 'BeCal_button_login_createRoot','btn');
	
/* endof new system stuff. */	
	
	var content = jQuery.getNewDiv('','BeCal_WINDOW_login','window')
	//var el = jQuery.getNewDiv('','','positiveCenter');
	

// standard login
/*	$(content).append(inputName);
	$(content).append(inputPW);
	$(content).append(linkNormalSend);
*/

// root user login
	//$(content).append(firstUserMessage);
	$(content).append(inputName);
	$(content).append(inputPW);
	$(content).append(redoPW);
	$(content).append(linkAddRootUser);


	//$(el).append(content);
	jQuery.appendElementTo(contentIDorClass,firstUserMessage);
	
	jQuery.appendElementTo(contentIDorClass,content);
}
