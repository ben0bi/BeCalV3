function showLoginWindow(contentIDorClass)
{
	var el = jQuery.getNewDiv('test_content','test_id','test_class1 testc2');
	jQuery.appendElementTo(contentIDorClass,el);
}

// append a jquery element to another jquery element.
jQuery.appendElementTo=function(contentIDorClass, jqElement)
{
	$(contentIDorClass).each(function() {$(this).append(jqElement);});
};

// create a new div with given  content, id and classes.
jQuery.getNewDiv=function(content='',id='', classes='')
{
	var el = $(document.createElement('div'));
	if(content!='')
		el.html(content);
	if(id!='')
		el.attr('id', id);
	if(classes!='')
		el.attr('class', classes);
	return el;
};