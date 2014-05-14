climate-vis
===========

Climate visualization team project for UO Physics Scientific Programming course.

# Climate Visualization Project Overview

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
- Week of 5/13: Find Data
	- CO2 - Simon
	- Precipitation - Gene
	- Oceanic Temperature - Rudy
	- Sea Level - Andrea
- Week of 5/20: Clean data, make simple lat/lon plots, draft visualization
	- Clean precipitation, temperature, and CO2 data - Andrea and Gene
	- Add timeline cursor to existing D3 hurricane map and define data structure for - Simon
	- Explore options for a heatmap on some global projection - Rudy

##Useful Links
- [Gapminder](http://www.gapminder.org/)
- [Google Motion Chart](https://developers.google.com/chart/interactive/docs/gallery/motionchart?csw=1)
- [Bootstrap](http://getbootstrap.com/)
- [Third National Climate Assessment (NCA) Report](http://www.globalchange.gov/ncadac)
- [NY Times article about NCA Report](http://www.nytimes.com/2014/05/07/science/earth/climate-change-report.html)
- [D3: mbostock's blocks](bl.ocks.org/mbostock)
- [D3: How To Make a Map](http://bost.ocks.org/mike/map/)
