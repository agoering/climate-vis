var map, drawingManager, animationSpeed;
var PrecipMap, PrecipHeatData;
var TempMap, TempHeatData;
var CO2Map, CO2HeatData;

var maxYear = 2005;
var minYear = 2000;

var minPrecip = 0.0;
var maxPrecip = 19452.0;

var minTemp = -63.0;
var maxTemp = 36.5;

var minCO2 = 0.0;
var maxCO2 = 74.1;

var p = 1;

var play = false;

//data = getData();

var gradient1 = [
        'rgba(0, 255, 255, 0)',
        'rgb(0, 255, 255)',
        'rgb(0, 191, 255)',
        'rgb(0, 127, 255)',
        'rgb(0, 63, 255)',
        'rgb(0, 0, 255)',
        'rgb(0, 0, 223)',
        'rgb(0, 0, 191)',
        'rgb(0, 0, 159)',
        'rgb(0, 0, 127)',
        'rgb(63, 0, 91)',
        'rgb(127, 0, 63)',
        'rgb(191, 0, 31)',
        'rgb(255, 0, 0)'
];

var gradient2 = [
'rgba(0, 222, 229, 1)','rgba(0, 228, 220, 1)','rgba(0, 227, 205, 1)','rgba(0, 226, 190, 1)','rgba(0, 225, 176, 1)',
'rgba(0, 225, 162, 1)','rgba(0, 224, 147, 1)','rgba(0, 223, 133, 1)','rgba(0, 222, 119, 1)','rgba(0, 222, 105, 1)',
'rgba(0, 221, 91, 1)','rgba(0, 220, 77, 1)','rgba(0, 219, 64, 1)','rgba(0, 218, 50, 1)','rgba(0, 218, 36, 1)',
'rgba(0, 217, 23, 1)','rgba(0, 216, 10, 1)','rgba(3, 215, 0, 1)','rgba(16, 215, 0, 1)','rgba(20, 214, 0, 1)',
'rgba(42, 213, 0, 1)','rgba(55, 212, 0, 1)','rgba(67, 211, 0, 1)','rgba(80, 211, 0, 1)','rgba(93, 210, 0, 1)',
'rgba(105, 209, 0, 1)','rgba(118, 208, 0, 1)','rgba(130, 208, 0, 1)','rgba(142, 207, 0, 1)','rgba(154, 206, 0, 1)',
'rgba(166, 205, 0, 1)','rgba(178, 204, 0, 1)','rgb(190, 204, 0)','rgb(202, 203, 0)','rgb(202, 191, 0)',
'rgb(201, 178, 0)','rgb(201, 165, 0)','rgb(200, 152, 0)','rgb(199, 139, 0)','rgb(198, 126, 0)',
'rgb(197, 114, 0)','rgb(197, 101, 0)','rgb(196, 89, 0)','rgb(195, 76, 0)','rgb(194, 64, 0)',
'rgba(194, 52, 0, 1)','rgba(193, 40, 0, 1)','rgba(192, 28, 0, 1)','rgba(191, 16, 0, 1)','rgba(191, 4, 0, 1)'
];


var gradient3 = [
        'rgba(140, 255, 102, 0)',
        'rgb(140, 255, 102)',
        'rgb(134, 238, 100)',
        'rgb(129, 221, 99)',
        'rgb(124, 205, 98)',
        'rgb(119, 188, 96)',
        'rgb(114, 172, 95)',
        'rgb(109, 155, 94)',
        'rgb(104, 138, 92)',
        'rgb(99, 122, 91)',
        'rgb(94, 105, 90)',
        'rgb(89, 89, 89)',
];


function initialize() {

		setAnimationSpeed(1200);

        PrecipHeatData = new google.maps.MVCArray();
        TempHeatData = new google.maps.MVCArray();
        CO2HeatData = new google.maps.MVCArray();


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
        
        for (var i = 1; i < PrecipData.length; i+=p) {
                var latLng = new google.maps.LatLng(parseFloat(PrecipData[i][2]), parseFloat(PrecipData[i][1]));
                var magnitude = parseFloat(PrecipData[i][3]);
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                PrecipHeatData.push(weightedLoc);
        };
        
        var minTemp =parseFloat(TempData[1][3]);
        for (var i = p; i < TempData.length; i+=p) {
                if(minTemp>parseFloat(TempData[i][3])){
                		minTemp=parseFloat(TempData[i][3]);
                }
        }
        
        for (var i = 1; i < TempData.length; i+=p) {
                var latLng = new google.maps.LatLng(parseFloat(TempData[i][2]), parseFloat(TempData[i][1]));
                var magnitude = parseFloat(TempData[i][3])-minTemp;
                var weightedLoc = {
                        location: latLng,
                        weight:Math.pow(magnitude,20)
                };
                TempHeatData.push(weightedLoc);
        };
        
        var maxTemp =TempHeatData.getAt(0).weight;
        for (var i = 1; i < TempHeatData.getLength(); i+=1) {
                if(maxTemp<TempHeatData.getAt(i).weight){
                		maxTemp=TempHeatData.getAt(i).weight;
                }
        }
        //document.getElementById("demo").innerHTML=TempHeatData.getAt(0).weight;
        
        for (var i = 1; i < CO2Data.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(CO2Data[i][2]), parseFloat(CO2Data[i][1]));
                var magnitude = parseFloat(CO2Data[i][3]);
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                CO2HeatData.push(weightedLoc);
        };

		var pre =PrecipHeatData.getAt(0).weight;

        for (var i = 1; i < PrecipHeatData.getLength(); i+=1) {
                if(pre>PrecipHeatData.getAt(i).weight){
                		pre=PrecipHeatData.getAt(i).weight;
                }
        }
        
        //document.getElementById("demo").innerHTML=pre;
        
        //document.getElementById("demo").innerHTML=[opacity,radius];

        
        PrecipMap = new google.maps.visualization.HeatmapLayer({
                data: PrecipHeatData,
                dissipating: false,
                map: map,
                gradient: gradient1
        });
        
        TempMap = new google.maps.visualization.HeatmapLayer({
                data: TempHeatData,
                dissipating: false,
                map: map,
        });
        
        CO2Map = new google.maps.visualization.HeatmapLayer({
                data: CO2HeatData,
                dissipating: false,
                map: map,
        });
        
        
        setGradient(gradient2,2);
        setGradient(gradient3,3);
        
        setOpacity(0.33,1);
        setRadius(1.4,1);
        setOpacity(0.33,2);
        setRadius(1.4,2);
        setOpacity(0.33,3);
        setRadius(10,3);
        
        removeMap(1);
        removeMap(2);
        removeMap(3);
        
}

function drawHeat(year){
        
        var index = year-minYear+3;


        PrecipHeatData.forEach(function(elm, i){
        		elm.weight=PrecipData[i*p+1][index];
        });
        
        PrecipMap.set('data',PrecipHeatData);
        
        var minTemp =parseFloat(TempData[1][index]);
        for (var i = p; i < TempData.length; i+=p) {
                if(minTemp>parseFloat(TempData[i][index])){
                		minTemp=parseFloat(TempData[i][index]);
                }
        }
        
        TempHeatData.forEach(function(elm, i){
        		elm.weight=Math.pow(parseFloat(TempData[i*p+1][index])-minTemp,20);
        });
        
        TempMap.set('data',TempHeatData);
        
        CO2HeatData.forEach(function(elm, i){
        		elm.weight=parseFloat(CO2Data[i+1][index]);
        });
        
        CO2Map.set('data',CO2HeatData);
}

function removeMap(mn) {
		if(mn==1)
        		PrecipMap.setMap(null);
        if(mn==2)
        		TempMap.setMap(null);
        if(mn==3)
        		CO2Map.setMap(null);
        //document.getElementById("demo").innerHTML="delete";
}

function reinitializeMap(mn) {
        if(mn==1){
        		PrecipMap.setMap(map);
                
                setOpacity(0.33,1);
        		setRadius(1.4,1);
        }
        if(mn==2){
        		TempMap.setMap(map);
                
                setOpacity(0.33,2);
        		setRadius(1.4,2);
        }
        if(mn==3){
        		CO2Map.setMap(map);
                
                setOpacity(0.33,3);
        		setRadius(5,3);
        }
        //document.getElementById("demo").innerHTML="initialize";
}

function setGradient(gradient,mn) {
        if(mn==1)
        		PrecipMap.set('gradient',gradient);
        if(mn==2)
        		TempMap.set('gradient',gradient);
        if(mn==3)
        		CO2Map.set('gradient',gradient);
}

function setRadius(r,mn) {
		 if(mn==1){
        		PrecipMap.set('radius', r);
                
                var slider = document.getElementById("PrecipRadiusSlider");
                slider.value = r;
                var field = document.getElementById("PrecipRadiusField");
                field.value = r;
        }
        if(mn==2){
        		TempMap.set('radius', r);
                
                var slider = document.getElementById("TempRadiusSlider");
                slider.value = r;
                var field = document.getElementById("TempRadiusField");
                field.value = r;
        }
        if(mn==3){
        		CO2Map.set('radius', r);
                
                var slider = document.getElementById("CO2RadiusSlider");
                slider.value = r;
                var field = document.getElementById("CO2RadiusField");
                field.value = r;
        }
}

function setOpacity(r,mn) {
        if(mn==1){
        		PrecipMap.set('opacity', r);
                
                var slider = document.getElementById("PrecipOpacitySlider");
                slider.value = r;
                var field = document.getElementById("PrecipOpacityField");
                field.value = r;
        }
        if(mn==2){
        		TempMap.set('opacity', r);
                
                var slider = document.getElementById("TempOpacitySlider");
                slider.value = r;
                var field = document.getElementById("TempOpacityField");
                field.value = r;
        }
        if(mn==3){
        		CO2Map.set('opacity', r);
                
                var slider = document.getElementById("CO2OpacitySlider");
                slider.value = r;
                var field = document.getElementById("CO2OpacityField");
                field.value = r;
    	}
}

function TimeUpdate(newValue){
        drawHeat(newValue);
        
        var input = document.getElementById("slider");
        var number = document.getElementById("timefield");
		input.value = newValue;
        number.value = newValue;
        
}

function forwardYear(){
        var number = document.getElementById("timefield");

        var newValue = parseInt(number.value)+1;

        if(newValue<=maxYear){
                TimeUpdate(newValue);
        }
}

function start() {
        var number = document.getElementById("timefield");

        var timeValue = parseInt(number.value);
        
        if(timeValue == maxYear){
        		TimeUpdate(2000);
                setTimeout(start, animationSpeed);
        }
        
		if(play&&timeValue != maxYear){
        		forwardYear();
				setTimeout(start, animationSpeed);
        }
}

function stop() {
		setPlay(false);
        start(play);
}

function setPlay(bool){
		play = bool;
}

function setAnimationSpeed(speed){
		animationSpeed = speed;
        var input = document.getElementById("speedfield");
		input.value = speed;
}


