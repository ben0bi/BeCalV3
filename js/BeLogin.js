// Login stuff.

// by benobi
// depends on:
// jquery
// bejquery

var BeLogin = function(){};

BeLogin.lmesg = '';
BeLogin.setMessage=function(text) {$('#BeCal_login_message').html(text);BeLogin.lmesg=text;}

BeLogin.createRootUser = function()
{
	console.log("Trying to create root user..");
	var name = $('#BeCal_input_login_name').val();
	name = name.toUpperCase();
	name = removeSpaces(name);
	var pw1 = $('#BeCal_input_login_pw').val();
	var pw2 = $('#BeCal_input_login_pw2').val();

	console.log("PW: "+pw1+" / "+pw2);

	if(name=='')
	{
		BeLogin.setMessage(L('message_no_name_given'));
		return;
	}

	if(pw1=='')
	{
		BeLogin.setMessage(L('message_empty_pw_not_allowed'));
		return;
	}

	if(pw1!=pw2)
	{
		BeLogin.setMessage(L('message_passwords_do_not_match'));
		return;
	}

	BeLogin.setMessage(L('message_login_create_ok_1'));

	showBlocker();
	console.log("Checking for name: "+name.toUpperCase());
	// TODO: CHECK FOR NAME

}

function showLoginWindow(contentIDorClass)
{
	showBlocker();

	//BeLogin.setMessage("HELLO WORLD!");

	$(contentIDorClass).html('');

	// create the login stuff.
	var inputName = jQuery.getNewInput('',L('placeholder_input_login_name'),'BeCal_input_login_name', 'login_input');
	var inputPW = jQuery.getNewInput('',L('placeholder_input_login_password'),'BeCal_input_login_pw','login_input');
	inputPW.attr('type', 'password');

	var content = jQuery.getNewDiv('','BeCal_WINDOW_login','window');

	// this stuff will be needed every time.
	//$(content).append(login_message);
	$(content).append(inputName);
	$(content).append(inputPW);

	// set up the php request.
	var url = 'php/ajax_getUserCount.php';
	// The ajax call succeeded, check for user count and create the right login screen.
	var successmethod = function(data)
	{
		console.log("USER COUNT:" +data);
		if(data==0 || data =='0')
		{
			// TODO: Translation
			BeLogin.setMessage(L('message_login_fresh_installation'));
			var redoPW = jQuery.getNewInput('',L('placeholder_input_login_redo_password'),'BeCal_input_login_pw2','login_input');
			redoPW.attr('type', 'password');
			var linkAddRootUser = jQuery.getNewJSButton(L('button_login_createroot'), 'BeLogin.createRootUser()', 'BeCal_button_login_createRoot','btn');

			$(content).append(redoPW);
			$(content).append(linkAddRootUser);
			appendMe();
			hideBlocker();
		}else{
			err='';
			if(parseInt(data)!=data) 
			{
				console.log("WARN: There could be a DB error, please check connection and credentials.");
				err = L('message_warn_login_DB_fail');
			}
			// create a standard login if an user is found.
			createStandardLogin(err);
		}
	}

	// crate a standard login screen.
	var createStandardLogin = function(err)
	{
		if(err!='') err = '<br /><br />'+err;
		BeLogin.setMessage(L('message_login_welcome')+err);
		var linkNormalSend = jQuery.getNewJSButton(L('button_login_login'),'BeLogin.sendLoginData()','BeCal_button_login_send','btn');
		
		$(content).append(linkNormalSend);
		appendMe();
	}
	
	// create a login screen which shows that there was an intern error.
	var errorLogin=function()
	{
		console.log("Ajax call seems to not be working.");
		createStandardLogin(L('message_ajax_not_working'));
	}
	
	// append all the stuff to the content.
	var appendMe = function()
	{	
		// login message is outside the login content box.
		var login_message = jQuery.getNewDiv(BeLogin.lmesg,'BeCal_login_message', 'login_message');
		jQuery.appendElementTo(contentIDorClass,login_message);

		// add the content..
		jQuery.appendElementTo(contentIDorClass,content);

		// So is the footer.
		var footer = jQuery.getNewDiv('2018, 2019 by benobi', 'footer');
		var githubLink = jQuery.getNewLink('https://github.com/ben0bi/BeCalV3', 'github');
		var aboutLink = jQuery.getNewLink('credits.html', 'about');
		$(footer).append('&nbsp;|&nbsp;');
		$(footer).append(aboutLink);
		$(footer).append('&nbsp;|&nbsp;');
		$(footer).append(githubLink);
		// append the footer.
		jQuery.appendElementTo(contentIDorClass, footer);
		hideBlocker();
	}

	// create the ajax call to the db to get the user count.
	$.ajax({
		type: 'POST',
		url: url,
		data: '', // data
		success: successmethod,
		error: errorLogin,
		dataType: 'text'
	});
}
