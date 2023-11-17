

	var mymap = L.map('mapid', {
        crs: L.CRS.Simple,
        center: [50, 150],
        zoom: 0,
        minZoom: 0,
        maxZoom: 3,
        width:100,
        height:300
    }).setView([50, 150]);
    mymap.setMaxBounds([100, 300]);
    console.log(mymap.getBounds());
	var imageUrl = '/maps/map_0.3.10.svg',
        imageBounds = [[0, 0], [500, 1500]];
    L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
    }
    
    mymap.on('dragend', function onDragEnd(){
        var width = mymap.getBounds().getEast() - mymap.getBounds().getWest();
        var height = mymap.getBounds().getNorth() - mymap.getBounds().getSouth();
    
        alert (
            'center:' + mymap.getCenter() +'\n'+
            'width:' + width +'\n'+
            'height:' + height +'\n'+
            'size in pixels:' + mymap.getSize()
        )});

	mymap.on('click', onMapClick);
