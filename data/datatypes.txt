PrecipData
==========
Total monthly precipitation in millimeters.
	
[Willmott, C. J. and K. Matsuura (2012) Terrestrial Precipitation: 1900-2010 Gridded Monthly Time Series (1900 - 2010), http://climate.geog.udel.edu/~climate/html_pages/Global2011/Precip_revised_3.02/README.GlobalTsP2011.html.](http://climate.geog.udel.edu/~climate/html_pages/download.html#P2011rev)


TempData
========
Monthly air temperatures in degrees Celsius.

[Willmott, C. J. and K. Matsuura (2012) Terrestrial Air Temperature: 1900-2010 Gridded Monthly Time Series (1900 - 2010), http://climate.geog.udel.edu/~climate/html_pages/Global2011/README.GlobalTsT2011.html.](http://climate.geog.udel.edu/~climate/html_pages/download.html#T2011)

PrecipData/TempData Fields:
---------------------------

{Longitude (decimal degrees), Latitude (decimal degrees), January, February, March, April, May, June, July, August, September, October, November, December}

CO2 Data
========
One degree latitude by one degree longitude grid of carbon mass emissions from the [Carbon Dioxide Information Analysis Center (CDIAC)](http://cdiac.ornl.gov/CO2_Emission/gridded)

Co2 Data File Structure and Naming Convention
---------------------------------------------

There is a separate data file for each year.  The files have a basename
of gridiso and an extension of yyyy where yyyy is the year (e.g., 2000).

The unit of the mass data portrayed is 10E6 metric tonnes * per
mil of C or Tg * per mil C (Tg=10E12 g).  To calculate the del 13 C
signature in each grid cell, divide the values reported here by the
corresponding grid cell value in Annual Fossil-Fuel CO2 Emissions: Mass
of Emissions Gridded by One Degree Latitude by One Degree Longitude
(http://cdiac.ornl.gov/epubs/ndp/ndp058/ndp058_v2013.html).

Two identical sets of data are available:

1. Compressed gridiso.yyyy.Z files (one file for each year).  These 
files were compressed using the standard unix compression utility 
to speed downloading.  You will need to uncompress them using the 
unix "uncompress *" command, and

2. One tar file (gridiso.tar) file which contains all 260 files in 
a compressed state.  Before using the files, users will need to 
extract the files from the tar file using the "tar xvf gridiso.tar" 
command and then uncompress the resulting files using the unix 
"uncompress *" command.

We suggest the data should be plotted before directly incorporating the
data into a model or other use.  If read in correctly, the data should
plot a map of the world with North at the top and East to the right. On
each line, the data go from the 180-179 degrees west cell to the 179-180
degrees east cell until reading in the next line of data. 