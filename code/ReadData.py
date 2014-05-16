## read data into arrays of floats by year
def readData(textData): 
	infile = open(textData,"r") ## read the data file
	content = infile.read()
	infile.close()
	lines = content.split('\n') ## split up lines

	data = []
	for each in lines:  ## split each line into separate strings
		if len(each) < 1:
        		continue          ## get rid of the empty list 
					  ##at the end
    		temp = each.split()
    		data.append(temp)    ## data contains lists of data 
					 ##for each year
## latitude, longitude, january - december rainfall in millimeters 
	floatData = []
	for each in data:
		tempLine = []
		for element in each:
			temp = float(element)
			tempLine.append(temp)
		floatData.append(tempLine)
	return floatData
dataPrecip = [] ## list of data for each year
yearPrecip = [] ## list of corresponding years
for i in range(0, 9):
	temp = readData("PrecipData/precip.190"+str(i))
	dataPrecip.append(temp)
	year = 1900 + i
	yearPrecip.append(year)
for i in range(10, 99):
	temp = readData("PrecipData/precip.19"+str(i))
 	dataPrecip.append(temp)
	year = 1900 + i
        yearPrecip.append(year)
for i in range(0, 9):
        temp = readData("PrecipData/precip.200"+str(i))
        dataPrecip.append(temp)
	year = 2000 + i
        yearPrecip.append(year)
temp = readData("PrecipData/precip.2010")
dataPrecip.append(temp)
year = 2010
yearPrecip.append(year)
