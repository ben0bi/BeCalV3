/* BeMapServices 
	by ben0bi @ 2019
	
	needs: jQuery, BeJQuery, OpenLayers, Stamen
*/

/* A Benobi Map. It contains several layers. */
var BeMap = function(mapContentID,mapName)
{
	var me = this; // prevent sub functions from getting this-ed.
	
	var m_map = null;
	var m_mapName = mapName; 		// the map id and class predessor.
	var m_contentID = mapContentID; // the content where the map is located in.
	
	// array with points on the map. This array can be changed. Its meant for bus, train and other lines.
	var m_lineArray = new Array();
	var m_lineSource = null; // the source with has the pointArray.
	this.getLineSource = function() {return m_lineSource;}	// return the line source for adding it to custom layers.
	this.addPoint = function(lon, lat) {m_lineArray.push([lon, lat]);}; // add a point to the line array.
	this.clearPoints = function() {m_lineArray= new Array();};			// clear all points from the line array.
	
	// array with the layer groups in it.
	var m_layerArray = new Array();
	
	// which layer is actually seen?
	var m_actualLayer = 0;
	
	// the mouse position control to move and zoom the map.
	var m_mousePositionControl = null;
	
	/* hide all layers. */
	this.hideAllLayers = function()
	{
		for(var i=0;i<m_layerArray.length;i++)
			m_layerArray[i].setVisible(false);
	};
	
	// I don't know if you can change layers like that after initializing so it's preinit time :)
	this.preinit_clearLayers = function()
	{
		m_layerArray = new Array();
		// TODO: Clear the layers on the map.
	};
	
	/* Add a layer or layergroup to the layer array. */
	this.preinit_addLayer = function(layer)
	{
		m_layerArray.push(layer);
	};
	
	/* switch through the layer groups. */
	this.switchLayers = function()
	{
		m_actualLayer++;
		if(m_actualLayer>=m_layerArray.length)
			m_actualLayer = 0;
		
		me.hideAllLayers();
		if(m_layerArray.length>0)
			m_layerArray[m_actualLayer].setVisible(true);
	};
	
	/* create the benobi default map layer groups. */
	this.preinit_createDefaultLayers = function()
	{
		// style for the bus lines
		// TODO: generalize this.
		var buslineStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: '#FF0000',
			width: 5
			})
		});
		// style for the bus lines when drawing a new one.
		buslineDrawStyle = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: '#3333FF',
				width: 3
			})
		});
		var rpgBuslineStyle = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: '#33AA33',
				width: 5
			})
		});
		
		// the standard, sweet coloured layer.
		var rpgLayer = new ol.layer.Group({
			visible: true,
			layers:[
				new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'watercolor'}), opacity: 1.0 }),
//				new ol.layer.Tile({ source: new ol.source.OSM(), opacity: 0.6 })
				new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'terrain'}), opacity: 0.6 }),
				new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'terrain-labels'}), opacity: 1.0 }),
				new ol.layer.Vector({source: m_lineSource, style: rpgBuslineStyle})
			]
		});

		// the black/white and red layer (e-ink)
		var eInkLayer = new ol.layer.Group({
			visible: false,
			layers:[
				new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'toner'}), opacity: 1.0 }),
				//new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'toner-background'}), opacity: 1.0 }),			// toner-background does not seem to load.
				//new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'toner'}), brightness: 0.5, contrast: 0.5 }),	// toner is way to strong. We only take background full opaque.
				//new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'toner-labels'}), opacity: 1.0 }),				// for that we need to put the label over again.
				// add the line layer for bus lines.
				new ol.layer.Vector({source: m_lineSource, style: buslineStyle})
			]
		});

		// "business layer"
		var businessLayer1 = new ol.layer.Group({
			visible: false,
			layers:[
				new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'terrain'}), opacity: 1.0 }),
				//new ol.layer.Tile({ source: new ol.source.OSM(), opacity: 1.0 })
				new ol.layer.Vector({source: m_lineSource, style: buslineStyle})
			]
		});
		
		// standard OSM map view (with terrain background?)
		var businessLayer2 = new ol.layer.Group({
			visible: false,
			layers:[
				//new ol.layer.Tile({ source: new ol.source.Stamen({layer: 'terrain-background'}), opacity: 1.0 }),
				new ol.layer.Tile({ source: new ol.source.OSM(), opacity: 1.0 }),
				new ol.layer.Vector({source: m_lineSource, style: buslineStyle})
			]
		});
		
		// add all the layer groups.
		me.preinit_clearLayers();
		me.preinit_addLayer(rpgLayer);
		me.preinit_addLayer(eInkLayer);
		me.preinit_addLayer(businessLayer1);
		me.preinit_addLayer(businessLayer2);
	};
	
	/* initialize the map. */
	this.init = function()
	{
		// TODO: Generalize this.
		// instance is the last map created.
		BeMap.instance = me;

		var domel = jQuery.getNewDiv('',m_mapName,'map');
		var infoview = jQuery.getNewDiv('',m_mapName+'_InfoView','');
		var mousepos = jQuery.getNewDiv('XY:',m_mapName+'_MousePositionDisplay', 'map-mouseposition-display');
		// TODO: multiple map links.
		var switchViewLink = jQuery.getNewJSButton('', 'BeMap.switchLayers("'+m_mapName+'")', m_mapName+'_switchMapViewButton', 'switchMapViewButton');

		$(infoview).append(mousepos);
		$(infoview).append(switchViewLink);
	
		$(m_contentID).append(domel);
		$(m_contentID).append(infoview);
		
		// create the map control.
		// and the mouse position text view.
		m_mousePositionControl = new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(4),
			projection: 'EPSG:4326',
			className: m_mapName+'_map-mouse-position map-mouse-position',
			target: document.getElementById(m_mapName+'_MousePositionDisplay'),
			undefinedHTML: '&nbsp;'
		});
		
		// create the source for the points, this is a general source which will be applied to all maps.
		m_lineSource = new ol.source.Vector();
		
		// create the default layers. You can compose your own layers, just look at the code.
		me.preinit_createDefaultLayers();
		
		// the actual map
		m_map = new ol.Map({
			target: m_mapName,
			layers: m_layerArray,
			projection: new ol.proj.Projection('EPSG:900913'),
			displayProjection: new ol.proj.Projection('EPSG:4326'),
			controls: ol.control.defaults().extend([m_mousePositionControl]),
			units: 'meters',
			view: new ol.View({
				center: ol.proj.fromLonLat([7.3956, 47.1923]),
				numZoomLevels: 18,
				maxResolution: 35000,
				minResolution: 1,
				zoom: 13
			})
		});

		// add the drawing to the vector source.
		var busDraw = new ol.interaction.Draw(
		{
			source: m_lineSource,
			type: 'LineString',
			style: buslineDrawStyle
		});
		m_map.addInteraction(busDraw);
	};

	// DO IT.
	me.init();
}

BeMap.instance = null;
BeMap.switchLayers = function(mapName)
{
	// how to get the right map? another time.
	if(BeMap.instance != null)
		BeMap.instance.switchLayers();
};
	