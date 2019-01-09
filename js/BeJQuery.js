/* jquery additions.
	by benobi, 2019aD
*/

// append a jquery element (el) to other jquery element/s (id or class name).
jQuery.appendElementTo=function(contentIDorClass, jqElement)
{
	$(contentIDorClass).each(function() {$(this).append(jqElement);});
};

// create a new DOM element with given tagname, id and classes.
jQuery.getNewElement=function(tagname='div',id='', classes='')
{
	var el = $(document.createElement(tagname));
	if(id!='')
		el.attr('id', id);
	if(classes!='')
		el.attr('class', classes);
	return el;
};

// create a new A tag which calls a JS function on click.
jQuery.getNewJSButton=function(buttonContent,jsFunctionName, id='',classes='')
{
	var el = jQuery.getNewElement('a',id,classes);
	$(el).attr('href','javascript:');
	$(el).attr('onclick', jsFunctionName);
	$(el).html(buttonContent);
	return el;
};

// create a new div with given  content, id and classes.
jQuery.getNewDiv=function(content='',id='', classes='')
{
	var el = jQuery.getNewElement('div',id,classes);
	if(content!='')
		el.html(content);
	return el;
};