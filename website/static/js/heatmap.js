var map, drawingManager, animationSpeed, step;
var PrecipMap, PrecipHeatData;
var TempMap, TempHeatData;
var CO2Map, CO2HeatData;

var maxYear = 2010;
var minYear = 1900;

var minPrecip = 0.0;
var maxPrecip = 19452.0;

var minTemp = -63.0;
var maxTemp = 36.5;

var minCO2 = 0.0;
var maxCO2 = 74.1;

var play = false;

var gradient1 = ['rgba(0, 227, 229, 0)',
'rgb(0, 227, 229)','rgb(0, 192, 227)','rgb(0, 63, 255)','rgb(0, 125, 223)','rgb(0, 93, 221)',
'rgb(0, 61, 219)','rgb(0, 29, 218)','rgb(1, 0, 216)','rgb(32, 0, 214)','rgb(62, 0, 212)',
'rgb(91, 0, 210)','rgb(120, 0, 209)','rgb(149, 0, 207)','rgb(177, 0, 205)','rgb(203, 0, 202)',
'rgb(201, 0, 171)','rgb(200, 0, 141)','rgb(198, 0, 112)','rgb(196, 0, 83)','rgb(194, 0, 54)',
'rgb(192, 0, 26)','rgb(191, 0, 0)'
];

var gradient2 = ['rgba(0, 222, 229, 0)',
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


var gradient3 = ['rgba(107, 255, 150, 0)',
'rgba(107, 255, 150,1)', 'rgb(107, 242, 148)', 'rgb(107, 229, 147)', 'rgb(107, 216, 146)', 'rgb(107, 204, 145)',
'rgb(107, 191, 144)', 'rgb(107, 178, 143)','rgb(107, 165, 142)', 'rgb(107, 153, 141)','rgb(107, 140, 140)',
'rgb(107, 127, 139)','rgb(107, 114, 137)','rgb(107, 102, 136)','rgb(107, 89, 135)','rgb(107, 76, 134)',
'rgb(107, 63, 133)','rgb(107, 51, 132)','rgb(107, 38, 131)','rgb(107, 25, 130)','rgb(107, 12, 129)','rgb(108, 0, 128)'
];


function initialize() {

		setAnimationSpeed(700);
        setStep(5);


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


    //DRAWING MANAGER------------------------------------------------
        
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
                    
                    var PrecipAvr = Average(NE,SW,PrecipData);
                    var TempAvr = Average(NE,SW,TempData);
                    var CO2Avr = Average(NE,SW,CO2Data);
					
                    var string ="Rectangle Bounds (North East, South West): "+NE+","+SW+"\n";
                    string+="Precipitation Averages: "+PrecipAvr+"\n";
                    string+="Temperature Averages: "+TempAvr+"\n";
                    string+="CO2 Averages: "+CO2Avr+"\n";
                    
                    document.getElementById("RectangleTextArea").innerHTML=string;
            };
            
            drawingManager.setDrawingMode(null);
            
            var newShape = event.overlay;
            newShape.type = event.type;
            newShape.setMap(null);
            
		});
        
        google.maps.event.addListener(map, "rightclick", function (e) {
                var latLng = e.latLng;
                 
                var infowindow = new google.maps.InfoWindow();
                            
                infowindow.setPosition(latLng);
                
                var content = "";
                
                content+="Lat/Lng: ".bold()+(Math.round(latLng.lat()*100)/100)+", "+(Math.round(latLng.lng()*100)/100)+"<br>";
								
                var y = document.getElementById("timefield");
                var year = parseInt(y.value);
                
                var PrecipMgn = getMagnitude(PrecipData,latLng,year);
                var TempMgn = getMagnitude(TempData,latLng,year);
                var CO2Mgn = getMagnitude(CO2Data,latLng,year);
                
                if(typeof PrecipMgn == "undefined")
                		PrecipMgn = "";
                else
                		PrecipMgn = (Math.round(PrecipMgn*10)/10);
                if(typeof TempMgn == "undefined")
                		TempMgn = "";
                else
                		TempMgn = (Math.round(TempMgn*10)/10);
                if(typeof CO2Mgn == "undefined")
                		CO2Mgn = "";
                else
                		CO2Mgn = (Math.round(CO2Mgn*10000)/10000);
                
                content+="Precip: ".bold()+PrecipMgn+"<br>";
                content+="Temp: ".bold()+TempMgn+"<br>";
                content+="CO2: ".bold()+CO2Mgn;
                
                infowindow.setContent(content);
                
    			infowindow.open(map);
                             
                //document.getElementById("demo").innerHTML=latLng;

			});
        
        
	//DATA TO MAP---------------------------------------------
    
        var index = 2000-minYear+3;
        
        for (var i = 0; i < PrecipData.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(PrecipData[i][2]), parseFloat(PrecipData[i][1]));
                var magnitude = parseFloat(PrecipData[i][index]);
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                PrecipHeatData.push(weightedLoc);
        };
        
        /*PrecipHeatData.push({
                        location: new google.maps.LatLng(-65, -168),
                        weight:maxPrecip
                });
        PrecipHeatData.push({
                        location: new google.maps.LatLng(-65, -167),
                        weight:minPrecip
                });*/
        
        for (var i = 0; i < TempData.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(TempData[i][2]), parseFloat(TempData[i][1]));
                var magnitude = parseFloat(TempData[i][index])-minTemp;
                var weightedLoc = {
                        location: latLng,
                        weight:Math.pow(magnitude,20)
                };
                TempHeatData.push(weightedLoc);
        };
        
        
        for (var i = 0; i < CO2Data.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(CO2Data[i][2]), parseFloat(CO2Data[i][1]));
                var magnitude = parseFloat(CO2Data[i][index]);
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                CO2HeatData.push(weightedLoc);
        };
        
		
        //document.getElementById("demo").innerHTML=[min,max];


	//INITIALIZE MAP----------------------------

        PrecipMap = new google.maps.visualization.HeatmapLayer({
                data: PrecipHeatData,
                dissipating: false,
                map: map,
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
        
        setGradient(gradient1,1);
        setGradient(gradient2,2);
        setGradient(gradient3,3);
        
        setOpacity(0.33,1);
        setRadius(1.4,1);
        setOpacity(0.33,2);
        setRadius(1.4,2);
        setOpacity(0.33,3);
        setRadius(5,3);
        
        removeMap(1);
        removeMap(2);
        removeMap(3);
}

function drawHeat(year){
		
        var index = year-minYear+3;
                

        PrecipHeatData.forEach(function(elm, i){
        		elm.weight=parseFloat(PrecipData[i][index]);
        });
        
        PrecipMap.set('data',PrecipHeatData);

        
        TempHeatData.forEach(function(elm, i){
        		elm.weight=Math.pow(parseFloat(TempData[i][index])-minTemp,20);
        });
        
        TempMap.set('data',TempHeatData);
        
        
        CO2HeatData.forEach(function(elm, i){
        		elm.weight=parseFloat(CO2Data[i][index]);
        });
        
        CO2Map.set('data',CO2HeatData);
}

function TimeUpdate(newValue){
        drawHeat(newValue);
        
        var input = document.getElementById("slider");
        var number = document.getElementById("timefield");
		input.value = newValue;
        number.value = newValue;
}

function start() {
        var number = document.getElementById("timefield");

        var timeValue = parseInt(number.value)+parseInt(step);
        
        if(timeValue > maxYear){
        		TimeUpdate(minYear);
                setTimeout(start, animationSpeed);
        }
        
		if(play&&timeValue <= maxYear){
                TimeUpdate(timeValue);
				setTimeout(start, animationSpeed);
        }
}

function stop() {
		setPlay(false);
        start(play);
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

function setPlay(bool){
		play = bool;
}

function setAnimationSpeed(speed){
		animationSpeed = speed;
        var input = document.getElementById("speedfield");
		input.value = speed;
}

function setStep(s){
		step = s;
        var input = document.getElementById("stepfield");
		input.value = s;
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

function Average(ne,sw, data){
        var index = [];
        var average = [];
        for(var i = 0; i<data.length;i++){
        		var dlng = parseFloat(data[i][1]);
                var dlat = parseFloat(data[i][2]);
                if(dlng >= Math.round(sw.lng()) && dlng <= Math.round(ne.lng()) && dlat >= Math.round(sw.lat()) && dlat <= Math.round(ne.lat()))
                        index.push(i);
        }
        
        for(var i =3; i<data[1].length; i++){
        		var avr = 0;
                var n = parseFloat(index.length);
                for(var j = 0; j<n; j++)
                		avr+=parseFloat(data[index[j]][i]);
                avr/=n;
                average.push(avr);
        }
        return average;
}

function getMagnitude(data,latlng,year){
		var mgn;
        var index = year-minYear+3;
        for(var i = 0; i<data.length; i++){
        		var dlng = parseFloat(data[i][1]);
                var dlat = parseFloat(data[i][2]);
        		if(dlng==Math.round(latlng.lng()) && dlat==Math.round(latlng.lat()))
                		mgn = parseFloat(data[i][index]);
        }
		return mgn;
}