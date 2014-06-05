var map, heatmap, data, heatmapData, drawingManager;

var maxYear = 2005;
var minYear = 2000;

var p = 9;

var play = false;

data = getData();


var gradient1 = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
];

var gradient2 = [
        'rgba(140, 255, 102, 0)',
        'rgba(140, 255, 102, 1)',
        'rgba(134, 238, 100, 1)',
        'rgba(129, 221, 99, 1)',
        'rgba(124, 205, 98, 1)',
        'rgba(119, 188, 96, 1)',
        'rgba(114, 172, 95, 1)',
        'rgba(109, 155, 94, 1)',
        'rgba(104, 138, 92, 1)',
        'rgba(99, 122, 91, 1)',
        'rgba(94, 105, 90, 1)',
        'rgba(89, 89, 89, 1)',
];


function initialize() {

        heatmapData = new google.maps.MVCArray();

        var mapOptions = {
                zoom: 2,
                center: new google.maps.LatLng(5,45),
                mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

        
        drawingManager = new google.maps.drawing.DrawingManager({
                drawingControl: true,
                drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                                google.maps.drawing.OverlayType.RECTANGLE
                        ]
                },
        });

        drawingManager.setMap(map);
        drawingManager.setOptions({
  				  rectangleOptions: {
    						fillColor: '#ffff00',
                            strokeWeight: 1,
                }
  		});
        
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
  			if (event.type == google.maps.drawing.OverlayType.RECTANGLE) {
                    var bounds = event.overlay.getBounds();
                    var NE = bounds.getNorthEast();
					var SW = bounds.getSouthWest();
                    
                    document.getElementById("Text").innerHTML=[NE,SW];
            };
            
            drawingManager.setDrawingMode(null);
            
            var newShape = event.overlay;
            newShape.type = event.type;
            newShape.setMap(null);
            
		});
        
        for (var i = 1; i < data.length; i+=p) {
                var latLng = new google.maps.LatLng(data[i][2], data[i][1]);
                var magnitude = data[i][3]
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                heatmapData.push(weightedLoc);
        };
          
        var div = document.getElementById("parameters");
        var spans = div.getElementsByTagName("span")

        var opacity = parseFloat(spans[0].innerHTML);
        var radius = parseFloat(spans[1].innerHTML);
        
        heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                dissipating: false,
                map: map,
                opacity: opacity,
                radius: radius,
                gradient: gradient1
        });

        heatmap.setMap(map);
}

function drawHeat(year){
        
        var index = year-minYear+3;


        heatmapData.forEach(function(elm, i){
        		elm.weight=data[i*p+1][index];
        });
        
        heatmap.set('data',heatmapData);

        

        var div = document.getElementById("parameters");
        var spans = div.getElementsByTagName("span");

        var opacity = parseFloat(spans[0].innerHTML);
        var radius = parseFloat(spans[1].innerHTML);
        
        changeOpacity(opacity);
        changeRadius(radius);

}

function deleteMap() {
        heatmap.setMap(null);
        document.getElementById("demo").innerHTML="delete";
}

function reinitializeMap() {
        heatmap.setMap(map);
        document.getElementById("demo").innerHTML="initialize";
}

function changeGradient() {
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient2);
}

function changeRadius(a) {
        heatmap.set('radius', a);
        document.getElementById("radius").innerHTML=a;
}

function changeOpacity(a) {
        heatmap.set('opacity', a);
        document.getElementById("opacity").innerHTML=a;
}

function TimeUpdate(newValue){
        document.getElementById("year").innerHTML=newValue;
        drawHeat(newValue);
}

function forwardYear(){
        var div = document.getElementById("panel");
        var year = document.getElementById("year").innerHTML;

        var newYear = parseInt(year)+1;

        if(newYear<=maxYear){
                document.getElementById("year").innerHTML=newYear;
                drawHeat(newYear);
        }
        
        var input = document.getElementById("slider");
		input.value = newYear;
}

function backwardYear(){
        var div = document.getElementById("panel");
        var year = document.getElementById("year").innerHTML;

        var newYear = parseInt(year)-1;

        if(newYear>=minYear){
                document.getElementById("year").innerHTML=newYear;
                drawHeat(newYear);
        }
        
        var input = document.getElementById("slider");
		input.value = newYear;
}

function start() {
		var div = document.getElementById("panel");
        var year = document.getElementById("year").innerHTML;
        
        var spansValue = parseInt(year);
        
        if(spansValue == maxYear)
        		setPlay(false);
        
		if(play){
        		forwardYear();
				setTimeout(start, 500);
        }
}

function stop() {
		setPlay(false);
        start(play);
}

function setPlay(bool){
		play = bool;
}