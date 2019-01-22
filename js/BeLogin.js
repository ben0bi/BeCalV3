// Login stuff.

// by benobi
// depends on:
// jquery
// bejquery

var BeLogin = function(){};

BeLogin.setMessage=function(text) {$('#BeCal_login_message').html(text);}

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
		BeLogin.setMessage('<span class="red">No name given!</span>');
		return;
	}
	
	if(pw1=='')
	{
		BeLogin.setMessage('<span class="red">Empty password is not allowed.</span>');
		return;
	}
	
	if(pw1!=pw2)
	{
		BeLogin.setMessage('<span class="red">Passwords do not match.</span>');
		return;
	}
	
	BeLogin.setMessage("Your input is ok. Let's try it..");

	showBlocker();
	console.log("Checking for name: "+name.toUpperCase());
	
}

function showLoginWindow(contentIDorClass)
{
	showBlocker();
	
	var login_message = jQuery.getNewDiv('','BeCal_login_message', 'login_message');
	var inputName = jQuery.getNewElement('input','BeCal_input_login_name', 'login_input');
	inputName.attr('placeholder', 'Name');
	var inputPW = jQuery.getNewElement('input','BeCal_input_login_pw','login_input');
	inputPW.attr('placeholder', 'Password');
	inputPW.attr('type', 'password');

	var linkNormalSend = jQuery.getNewJSButton('<nobr>LOG IN</nobr>','BeLogin.sendLoginData()','BeCal_button_login_send','btn');
	
	var content = jQuery.getNewDiv('','BeCal_WINDOW_login','window');

	// this stuff will be needed every time.
	$(content).append(login_message);
	$(content).append(inputName);
	$(content).append(inputPW);

	// login message is outside the login content box.
	jQuery.appendElementTo(contentIDorClass,login_message);
	
	//var el = jQuery.getNewDiv('','','positiveCenter');
	
	// set up the php request.
	var url = 'php/ajax_getUserCount.php';
		
	// The ajax call succeeded, check for user count and create the right login screen.
	var successmethod = function(data)
	{
		console.log("USER COUNT:" +data);
		if(data==0 || data =='0')
		{
			BeLogin.setMessage('This is a <span class="green">fresh system</span> with <span class="red">no user</span>.<br />You need to <span class="green">create</span> a <span class="green">root user</span> with all privileges.');
			var redoPW = jQuery.getNewElement('input','BeCal_input_login_pw2','login_input');
			redoPW.attr('placeholder', 'PW again');	
			redoPW.attr('type', 'password');	
			var linkAddRootUser = jQuery.getNewJSButton('<nobr>Install ROOT</nobr>', 'BeLogin.createRootUser()', 'BeCal_button_login_createRoot','btn');
			
			$(content).append(redoPW);
			$(content).append(linkAddRootUser);
			appendMe();
			hideBlocker();
		}else{
			createStandardLogin();
		}
	}
		
	// crate a standard login screen.
	var createStandardLogin = function()
	{
		$(content).append(linkNormalSend);
		appendMe();
	}
		
	// append all the stuff to the content.
	var appendMe = function()
	{
		jQuery.appendElementTo(contentIDorClass,content);
		hideBlocker();
	}
		
	// create the ajax call to the db to get the user count.
	$.ajax({
		type: 'POST',
		url: url,
		data: '', // data
		success: successmethod,
		error: createStandardLogin,
		dataType: 'text'
	});
}
