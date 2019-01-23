/******************************************
 *                                        *
 * GIT - Grenchen Institute of Technology *
 *                                        *
 ******************************************
 
     BeLanguageLoader.js
	
     by Oki Wan Benobi, 2019
 */

var g_lang = [];

function loadLanguage(lang, afterLoadFunction)
{
	var langFile = 'lang/lang_'+lang+'.json';
	// Make an ajax call to load the language file.
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
    {
       	if (xhr.readyState === XMLHttpRequest.DONE)
		{
        	if (xhr.status === 200) 
			{
				var json = xhr.response;
				g_lang = json;
				var maxCount=0;
				// count the paths
				for (var key in json) 
				{
					if(key!="//" && json.hasOwnProperty(key)) 
					{
						maxCount++;
					}
				}
				m_maxCount = maxCount;
				console.log("Language translation count: "+maxCount);
			} else {
					console.log("XHR Error: "+xhr.status);
			}
			
			if(typeof(afterLoadFunction)==="function")
				afterLoadFunction();
		}
    };
    xhr.open("GET", langFile, true);
	xhr.responseType = "json";
    xhr.send();
}

// return a sentence
function L(identifier)
{
	if(g_lang[identifier])
		return g_lang[identifier];
	return "* not set *";
}