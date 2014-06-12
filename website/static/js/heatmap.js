//Initialize global variables
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

var infowindow = new google.maps.InfoWindow();
var position = 0;

//Define rectangle array (in order to delete element after new rectangle is selected)
var rectangles = new google.maps.MVCArray();
rectangles.push(new google.maps.Rectangle({
		bounds: new google.maps.LatLngBounds(
        		new google.maps.LatLng(0, 0),
      			new google.maps.LatLng(0, 0)
        )
    })
);

var rectangle;

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

//INITIALIZE VISUALIZATION-----------------------------------------
function initialize() {

		//Map Options
        var mapOptions = {
                zoom: 2,
                center: new google.maps.LatLng(5,45),
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                center: new google.maps.LatLng(0, 0),
                zoom: 2
        };
		
        //Set map into canvas
        map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);


//DRAWING MANAGER------------------------------------------------------

        //Define drawing manager
        drawingManager = new google.maps.drawing.DrawingManager({
                drawingControl: true,
                drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                                google.maps.drawing.OverlayType.RECTANGLE
                        ]
                },
        });
		
        //Set drawing manager into map
        drawingManager.setMap(map);
        
        //Set rectangle options
        drawingManager.setOptions({
  				  rectangleOptions: {
    						fillColor: '#ffff00',
                            strokeWeight: 1,
                            editable: true,
                            draggable: true
                }
  		});
        
        //Listen to event drawing completed
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
            
            //Delete previous rectangle
            rectangles.getAt(0).setMap(null);
            rectangles.clear();
            
            //Get drawn rectangle into a variable
            rectangle = event.overlay;
            rectangle.type = event.type;
			
            //Plot and display the info inside the rectangle
            rectangleInfo(rectangle);
            
            //push rectangle to array
            rectangles.push(rectangle);
			
            //Listen to bounds of rectangle changed event. Update info and plot when
            google.maps.event.addListener(rectangle, 'bounds_changed', function(){
            		rectangleInfo(rectangle);
            });
			
            //After drawing rectangle, go back to null modus
            drawingManager.setDrawingMode(null);
		});
        
        //For right click on a place in the map, show information of that place
        google.maps.event.addListener(map, "rightclick", function (e) {
        		//Dsiplay datainformation at infowindow
        		infowindowInfo(e);
        		
        		infowindow.open(map);
        });
        
        
//DATA TO MAP------------------------------------------------------------------
		
		//Define heat map data array
        PrecipHeatData = new google.maps.MVCArray();
        TempHeatData = new google.maps.MVCArray();
        CO2HeatData = new google.maps.MVCArray();
		
        //get the index to find data at selected year
        var index = 2010-minYear+3;
        
        //push precipitation data to precipitation heat map array
        for (var i = 0; i < PrecipData.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(PrecipData[i][2]), parseFloat(PrecipData[i][1]));
                var magnitude = parseFloat(PrecipData[i][index]);
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                PrecipHeatData.push(weightedLoc);
        };
        
        //Set range value
        PrecipHeatData.push({
                        location: new google.maps.LatLng(-65, -168),
                        weight:maxPrecip
                });
        PrecipHeatData.push({
                        location: new google.maps.LatLng(-65, -167),
                        weight:minPrecip
                });
        
        //push temperature data to temperature heat map array
        for (var i = 0; i < TempData.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(TempData[i][2]), parseFloat(TempData[i][1]));
                //magnitudes have to be > 0
                var magnitude = parseFloat(TempData[i][index])-minTemp;
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                TempHeatData.push(weightedLoc);
        };
        
         TempHeatData.push({
                        location: new google.maps.LatLng(-65, -168),
                        weight:(maxTemp-minTemp)
                });
        TempHeatData.push({
                        location: new google.maps.LatLng(-65, -167),
                        weight:Math.pow(0.00001,2)
                });
        
        //push CO2 data to CO2 heat map array
        for (var i = 0; i < CO2Data.length; i+=1) {
                var latLng = new google.maps.LatLng(parseFloat(CO2Data[i][2]), parseFloat(CO2Data[i][1]));
                var magnitude;
                //problems for value -0.0
                if(CO2Data[i][index]=='-0.0')
                		magnitude = 0.000001;
                else
                		magnitude = parseFloat(CO2Data[i][index]);
                var weightedLoc = {
                        location: latLng,
                        weight:magnitude
                };
                CO2HeatData.push(weightedLoc);
        };
        
         CO2HeatData.push({
                        location: new google.maps.LatLng(-65, -168),
                        weight:maxCO2
        });
        
        CO2HeatData.push({
                        location: new google.maps.LatLng(-65, -167),
                        weight:minCO2
        });


//INITIALISE HEAT MAP--------------------------------------

        PrecipMap = new google.maps.visualization.HeatmapLayer({
                data: PrecipHeatData,
                dissipating: false,
                map: map,
                maxIntensity: 10000
        });
        
        TempMap = new google.maps.visualization.HeatmapLayer({
                data: TempHeatData,
                dissipating: false,
                map: map,
                maxIntensity: 800
        });
        
        CO2Map = new google.maps.visualization.HeatmapLayer({
                data: CO2HeatData,
                dissipating: false,
                map: map,
                maxIntensity: 70
        });
        
        //choose gradient
        setGradient(gradient1,1);
        setGradient(gradient2,2);
        setGradient(gradient3,3);
        
        //At first, show empty map
        removeMap(1);
        removeMap(2);
        removeMap(3);
        
        //Set Animation speed & years steps
		setAnimationSpeed(1500);
        setStep(5);
}


//HEAT MAP FUNCTIONS--------------------------------------------
function drawHeat(year){
		
        //update information of infowindow
		if(position != 0){
        		infowindowInfo(position);
   		}
        
        var index = year-minYear+3;
                
		//update heat map values
        PrecipHeatData.forEach(function(elm, i){
        		if(i<PrecipHeatData.length-2)
        				elm.weight=parseFloat(PrecipData[i][index]);
        });
        
        PrecipMap.set('data',PrecipHeatData);

        
        TempHeatData.forEach(function(elm, i){
        		if(i<TempHeatData.length-2)
                		elm.weight=(TempData[i][index]-minTemp);
        });
        
        TempMap.set('data',TempHeatData);
        
        
        CO2HeatData.forEach(function(elm, i){
        		if(i<CO2HeatData.length-2){
                		if(CO2Data[i][index]=='-0.0')
                				elm.weight = 0.000001;
                		else
                				elm.weight=parseFloat(CO2Data[i][index]);
                }
        });
        
        CO2Map.set('data',CO2HeatData);
}

function TimeUpdate(newValue){
		//Update Heat maps
        drawHeat(newValue);
        
        //Set values of year-slider and time-textfield
        var input = document.getElementById("slider");
        var number = document.getElementById("timefield");
		input.value = newValue;
        number.value = newValue;
}

function start() {
		
        //get year value of time-textfield
        var number = document.getElementById("timefield");
        var timeValue = parseInt(number.value)+parseInt(step);
        
        if(timeValue > maxYear){
        		TimeUpdate(maxYear);
        }
        
        //animate heat map update
		if(play&&timeValue <= maxYear){
                TimeUpdate(timeValue);
				setTimeout(start, animationSpeed);
        }
}

function stop() {
		//stop animation
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
}

function reinitializeMap(mn) {
        if(mn==1){
        		PrecipMap.setMap(map);
                
                setOpacity(0.5,1);
        		setRadius(2,1);
        }
        if(mn==2){
        		TempMap.setMap(map);
                
                setOpacity(0.5,2);
        		setRadius(2.5,2);
        }
        if(mn==3){
        		CO2Map.setMap(map);
                
                setOpacity(0.7,3);
        		setRadius(3,3);
        }
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


//DRAWING FUNCTIONS-----------------------------------------------
//get average values inside rectangle bounds
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

//get Magnitude at specific position and year
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

//draw google line chart for given average data
function drawChart(p, t, c){
		var pltArray = [];
        var titleRow = ['Year', 'Precipitation', 'Temperature', 'CO2'];
        pltArray.push(titleRow);
        var year = 1900;
        for(var i = 0; i<p.length; i++){
        		var row = [year, p[i], t[i], c[i]];
                pltArray.push(row);
                year++;
        }
        pltArray = google.visualization.arrayToDataTable(pltArray);
        //google.load("visualization", "1", {packages:["corechart"]});
        var options = {
        		title: 'Average values inside the rectangle bounds',
                vAxes: {0: {logScale: false, title: "Precipitation (mm)"},
            			1: {logScale: false, title: "Temperature (C)",textPosition: "in"},
                        2: {logScale: false, title: "CO2 (ppm)", textPosition: "out"}
                },
    			series:{
                       0:{targetAxisIndex:0},
                       1:{targetAxisIndex:1},
                       2:{targetAxisIndex:2}
       			},
                hAxis: { ticks: [1900,1910,1920,1930,1940,1950,1960,1970,1980,1990,2000,2010] },
        };
        var chart = new google.visualization.LineChart(document.getElementById('lineChart_div'));
        chart.draw(pltArray, options);
}

//Plot and write rectangle info
function rectangleInfo(rect){
			//Get rectangle bounds
            var NE = rect.getBounds().getNorthEast();
            var SW = rect.getBounds().getSouthWest();
            
            //Get average data inside rectangle
            var PrecipAvr = Average(NE,SW,PrecipData);
            var TempAvr = Average(NE,SW,TempData);
            var CO2Avr = Average(NE,SW,CO2Data);
            
            //Write content of Rectangle info textbox
            var string ="Rectangle Bounds (North East, South West): "+NE+","+SW+"\n";
            string+="Precipitation Averages: "+PrecipAvr+"\n";
            string+="Temperature Averages: "+TempAvr+"\n";
            string+="CO2 Averages: "+CO2Avr+"\n";
            
            document.getElementById("RectangleTextArea").innerHTML=string;
            
            //Draw google line chart with the given average magnitudes
      		drawChart(PrecipAvr,TempAvr, CO2Avr);
}

//write and display content of infowindow 
function infowindowInfo(p){
        //get position into global variable
        position = p;
        
        //get latitude/longitude values of the selected position
        var latLng = p.latLng;
        
        //set infowindow at that position
        infowindow.setPosition(latLng);
        
        //write information into infowindow
        var content = "";
        
        content+="Lat/Lng: ".bold()+(Math.round(latLng.lat()*100)/100)+", "+(Math.round(latLng.lng()*100)/100)+"<br>";
        
        //get actual year
        var y = document.getElementById("timefield");
        var year = parseInt(y.value);
        
        //get data values at selected position and year
        var PrecipMgn = getMagnitude(PrecipData,latLng,year);
        var TempMgn = getMagnitude(TempData,latLng,year);
        var CO2Mgn = getMagnitude(CO2Data,latLng,year);
        
        //write values into infowindow
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
}


window.onresize = function(event) {
rectangleInfo(window.rectangle);
}
