Title: ClimateVis
Date: 2014-06-09
Authors: Andrea Yocom, Gene Krasnitskiy, Rudy Resch, Simon Wiedemann
Summary: Climate visualization team project for UO Physics Scientific Programming course.

## Executive Summary
Our team has developed an interactive visualization of average annual temperature, total annual precipitation, and total annual carbon dioxide emissions. There are two tabs: a Map tab and a Science tab. 

### Map Tab
In the Map tab, users can watch the evolution of one or more of these variables at a time on a Google map. Users can also draw a rectangle around a region to produce a line plot of the average of each variable within the region over time. 
 
### Science Tab
In the Science tab, users can manipulate both axes of a 2D scatterplot. The variables that can be chosen are year, average annual global temperature, total annual global precipitation, total annual global carbon dioxide emissions, and average annual Arctic sea ice extent.

## Original Project Goal
We originally aimed to develop an interactive visualization that allows users to explore what correlations exist between atmospheric CO2 concentrations and hydrological variables related to global climate change. We intended to use data from 1850-present of the following hydrological variables: sea level, ice volume, and oceanic temperature. The original concept was to visualize correlations in a moving bubble chart, in which time is represented by moving frames that will trace out a pattern (see for example [Gapminder](www.gapminder.org)). 

We had several additional interests. These were the following:
1. To build an intensity worldmap visualization that allows users to explore spatiotemporal patterns in precipitation levels worldwide. 
2. To make projections based on historical data for hydrological variables. 
3. To explore non-hydrological variables, particularly economic datasets such as GDP and energy consumption, which could be plotted both on the intensity worldmap and on the moving bubble chart.


## Project Clarification
As we hunted for data for this project, the desire to build an intensity worldmap engulfed our original goals. We were able to find temperature, precipitation, and carbon dioxide emissions data which were mapped onto a latitude/longitude grid. For this reason, we focused first on the intensity heatmap for these variables.

### Data Sources
We used total monthly precipitation in millimeters[^precipData] and monthly air temperatures in degrees Celsius[^air_tempData] that had been projected onto a 0.5 degree latitude and longitude grid. We also used a one degree latitude by one degree longitude grid of carbon mass emissions[^CO2Data] 

### Data Processing

### Visualization Engine

### Web App Framework









### References

[^precipData]: [Willmott, C. J. and K. Matsuura (2012) Terrestrial Precipitation: 1900-2010 Gridded Monthly Time Series (1900 - 2010), http://climate.geog.udel.edu/~climate/html_pages/Global2011/Precip_revised_3.02/README.GlobalTsP2011.html.](http://climate.geog.udel.edu/~climate/html_pages/download.html#P2011rev)

[^air_tempData]: [Willmott, C. J. and K. Matsuura (2012) Terrestrial Air Temperature: 1900-2010 Gridded Monthly Time Series (1900 - 2010), http://climate.geog.udel.edu/~climate/html_pages/Global2011/README.GlobalTsT2011.html.](http://climate.geog.udel.edu/~climate/html_pages/download.html#T2011)

[^CO2Data]: [Carbon Dioxide Information Analysis Center (CDIAC), **DOI:** 10.3334/CDIAC/ffe.AnnualIsomass.2013](http://cdiac.ornl.gov/CO2_Emission/gridded)
