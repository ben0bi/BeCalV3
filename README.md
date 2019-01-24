# BeCalV3
BeCal Version 3: Users first, thats why I rewrite it from scratch. Old BeCal works like a charm, though.

THIS FILE ALSO SERVES AS LICENSE FILE

LICENSE:

This software is free to use when the following conditions are met:

+ If this software is used in public places, an e-Ink screen must be used as display if possible.
The Software has an eInk coloring layout.
It is power saving, you can read it in bright sunlight and there are even multicolor screens.
The software is made for Black/White/Red-Screens.

+ You may not sell this software or parts of it to other parties. This is a free software and so commercial use is prohibited.
You may use this software to sell your own products, but not the software itself.

EXPLANATION:

This shall be an "expert system" for everything. Cities shall use it for their bus lines, event calendar, property management, store management, whatever.
I actually work in a property management and rebuilding company, so I make "this" stuff first.

It is nothing, absolutely nothing done yet. Users are not used yet, but I work on it. (see index.html)
Bus plans are not working but almost all is set up fine. Maps work fine and look nice.

How does a page work?

First of all, the initpage_default method loads some custom css for the user and sets up the base framework of the page. You should call it. ;)
It also loads the language file and this one fires "your" main method after loading the translations. So, see below how the page works:

Instead of using "external" composer or something, I use my own JS file loader.
I know there is some "import" statement in ECMAScript 6, but I will use ECMA_5 style for older browsers. 
I will use it, when it is used everywhere. ;)
The fileloader works recursive and loads all the files from a json config file. After loading, it will fire "your" main method.

What, there are two main methods to fire? Why?

Because there are also language files involved and because the JSloader needs to load the LanguageLoader first, we need to set up
TWO functions to get the page running properly:

YOUR initpage() (see all html files) will be called from the JS file loader after loading the scripts. 
Here you should only call initpage_default(mainmethod2).

As described above, initpage_default loads the language file and calls your "real" main method after loading.

in "mainmethod2" you can call all YOUR fancy stuff, what you want to do with the page.
There is actually no way to use HTML direct in the page when using initpage_default. Sorry for that.

To keep it general it is a little more complicated, but also more general. ;)

Here is some example code:

<script src="js/ben0biJSLoader.js"></script>

<script>

// this will be called after the js files loaded.
function initpage()
{
	// By default you just need to call this one line here:
	initpage_default(mainmethod);
}

// and this will be called after the language file has loaded. The languageloader is defined in yourJSfilesFile.json
function mainmethod()
{
	// "now" we can do stuff.
	$('#content').html("YAY, here is some content.");
}

// Finally, load all the stuff and go...
ben0biJSLoader.recursiveLoad("yourJSfilesFile.json", initpage);
</script>


