# Climate Visualization Project Overview
Climate visualization team project for UO Physics Scientific Programming course.
by Andrea, Gene, Rudy, and Simon

## Abstract
We want to develop an interactive visualization that allows users to explore what correlations exist between atmospheric CO2 concentrations and hydrological variables related to global climate change. We will use data from 1850-present of the following hydrological variables: sea level, ice volume, and oceanic temperature. The visualization will likely be a moving bubble chart, in which time is represented by moving frames that will trace out a pattern (see for example www.gapminder.org).

## Development Milestones

- Week of 5/5: Find relevant datasets; set up Github collaboration. Discuss visualization strategy.
- Week of 5/12: Draft visualization; clean/smooth data and make simple temporal plots.
- Week of 5/19: Process data (format/smooth/baseline and extract features as needed), include in visualization, making sure at least 2 variables work in the interactive tool (CO2, sea level). Tweak visualization as needed.
- Week of 5/26: Finish working datasets into visualization. Explore correlations; draft report.
- Week of 6/2: Continue report. Work on additional tasks if time allows.
- Week of 6/9: Final cosmetic tweaks; finish report.

###Bonus Tasks
If we have time, we would like to undertake several additional tasks. First, we would like build an intensity worldmap visualization that allows users to explore spatiotemporal patterns in precipitation levels worldwide. Second, we would like to make projections based on historical data for hydrological variables. Third, we would like to explore non-hydrological variables, particularly economic datasets such as GDP and energy consumption, which could be plotted both on the intensity worldmap and on the moving bubble chart.

##To Do:
- Due 5/13: Find Data
	- CO2 - Simon
	- Precipitation - Gene
	- Oceanic Temperature - Rudy
	- Sea Level - Andrea
- Due 5/20: Clean data, make simple lat/lon plots, draft visualization
	- Clean precipitation, temperature, and CO2 data - Andrea and Gene
	- Add timeline cursor to existing D3 hurricane map and define data structure for - Simon
	- Explore options for a heatmap on some global projection - Rudy
- Due 5/27: Figure out how to include data in visualization by dynamically selecting subsets, type, and how to process data.
 	- Simon: GUI stuff - Figure out how to do a lat/lon selector box or just type in lat/lon selections manually?
	- Rudy: Figure out the "map" vs "trend" situation in bootstrap and whether bootstrap can work with Python and with the libraries from Gmaps, etc. 
	- Gene: Keep cranking through interesting trends hiding in the data.
	- Andrea: Figure out how to create a data library and standardized functions based on needs identified by Gene
- Due 5/30: 
	- Andrea: Format 2000-2005 precip annual average data to single and separate .csv files for Simon.
	- Simon: Working timeline given the .csv files from Andrea.
	- Rudy: Skeleton of Bootstrap UI
	- Gene: Send Rudy a figure for the comparison plots. 
- Due 6/3:
	- Andrea: Supply non-reduced precip, temp, and CO2 datasets, explore reduction methods in Pandas. Think about looking at less global data blocks - by latitude or by continent for instance - for get happy plot. Also think about temporal filtering - summer vs winter, 
	- Gene: Explore reduction methods
	- Simon: Continue exploring performance enhancements for speed of year slider
	- Rudy: See if we can host external files or come up with a backup plan in the event that Heroku is no good for us.
	
##Useful Links
- [Gapminder](http://www.gapminder.org/)
- [Google Motion Chart](https://developers.google.com/chart/interactive/docs/gallery/motionchart?csw=1)
- [Bootstrap](http://getbootstrap.com/)
- [Third National Climate Assessment (NCA) Report](http://www.globalchange.gov/ncadac)
- [NY Times article about NCA Report](http://www.nytimes.com/2014/05/07/science/earth/climate-change-report.html)
- [D3: mbostock's blocks](http://bl.ocks.org/mbostock)
- [D3: How To Make a Map](http://bost.ocks.org/mike/map/)
