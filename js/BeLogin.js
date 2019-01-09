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
	var linkSend = jQuery.getNewJSButton('<nobr>LOG IN</nobr>','sendLoginData','BeCal_button_login_send','btn');
	
	var content = jQuery.getNewDiv('','BeCal_WINDOW_login','window')
	//var el = jQuery.getNewDiv('','','positiveCenter');
	
	$(content).append(inputName);
	$(content).append(inputPW);
	$(content).append(linkSend);
	
	//$(el).append(content);
	
	jQuery.appendElementTo(contentIDorClass,content);
}
