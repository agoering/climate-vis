import numpy as np
import matplotlib.pyplot as plt
from matplotlib import mlab
import csv

## read data into arrays of floats by year
def readData(textData, bottomCorner, topCorner):
        bottomLat, bottomLon = bottomCorner
        topLat, topLon = topCorner
        infile = open(textData,"r") ## read the data file
        content = infile.read()
        infile.close()
        lines = content.split('\n') ## split up lines
        data = []
        for each in lines:  ## split each line into separate strings
                if len(each) < 1:
                        continue          ## get rid of the empty list at the end
                row = each.split()
                temp = {'lat':float(row[0]), 'lon':float(row[1]), 'jan':float(row[2]), 'feb':float(row[3]), 'mar':float(row[4]), 'apr':float(row[5]), 'may':float(row[6]), 'jun':float(row[7]), 'jul':float(row[8]), 'aug':float(row[9]), 'sep':float(row[10]), 'oct':float(row[11]), 'nov':float(row[12]), 'dec':float(row[13]), 'tot':float(row[14]), 'avg':float(row[15])}
                if temp['lat'] <= bottomLat and temp['lat'] >= topLat:
                    if temp['lon'] <= topLon and temp['lon'] >= bottomLon:
                        data.append(temp)  
##for each data category year, value for the region in the square requested
        return data

def dataInRegion(path, bottomCorner, topCorner):  ## read data during the year of interest
        temp = readData(path, bottomCorner, topCorner)
        return temp
## list of precipitation or temperature data for each year
def avgData(data, period):  ## compute global average of desired values
    avg = 0. 
    for i in range(0, len(data)):
        avg += data[i][period]
    return avg/len(data)

def plotAvgData(years, value, label, title):  ## plot the trends in global averages
    fig = plt.figure(figsize=(10, 10))
    plt.plot(years, value)
    plt.suptitle(title)
    plt.xlabel('year')
    plt.ylabel(label)
    plt.show()

import sys

topCorner = list(raw_input('Enter lattitude, longitude of top left hand corner')) 
bottomCorner = list(raw_input('Enter lattitude, longitude of bottom right hand corner'))

dictTotPrecip = {}
dictAvgTemp = {}
#topCorner = [-150, 50]
#bottomCorner = [-50, 15]

for k in range(0, 111):
    year = 1900 + k  ## keys can be any type, e.g. integer
    dictTotPrecip[year] = avgData(dataInRegion("data/lowResPrecipAvg"+str(year)+".csv", bottomCorner, topCorner), 'tot')
    dictAvgTemp[year] = avgData(dataInRegion("data/lowResTempAvg"+str(year)+".csv", bottomCorner, topCorner), 'avg')
## compute global average for total precipitation and average temperatures

## read data into arrays of floats by year
def readCO2Data(textData, bottomCorner, topCorner):
        bottomLat, bottomLon = bottomCorner
        topLat, topLon = topCorner
        infile = open(textData,"r") ## read the data file
        content = infile.read()
        infile.close()
        lines = content.split('\n') ## split up lines
        data = []
        for each in lines:  ## split each line into separate strings
                if len(each) < 1:
                        continue          ## get rid of the empty list at the end
                row = each.split()
                temp = {'lat':float(row[0]), 'lon':float(row[1]), 'tot':float(row[2])}
                if temp['lat'] <= bottomLat and temp['lat'] >= topLat:
                    if temp['lon'] <= topLon and temp['lon'] >= bottomLon:
                        data.append(temp)  
##for each data category year, value for the region in the square requested
        return data

def co2DataInRegion(path, bottomCorner, topCorner):  ## read data during the year of interest
        temp = readCO2Data(path, bottomCorner, topCorner)
        return temp
## list of CO2 data for each year

dictCO2 = {}
for k in range(0, 111):
    year = 1900 + k
    dictCO2[year] = avgData(co2DataInRegion("data/gridCO2"+str(year)+".csv", bottomCorner, topCorner), 'tot')
## compute average regional carbon dioxide emissions    

totPrecip = []
avgTemp = []
totCO2 = []
yearVals = []
years = sorted(dictTotPrecip.keys())  ## sorting keys in ascending order of years
for year in years:
    totPrecip.append(dictTotPrecip[year])
    avgTemp.append(dictAvgTemp[year])
    totCO2.append(dictCO2[year])
    yearVals.append(year)

plotAvgData(yearVals, totPrecip, 'average precip in millimiters', 'regional terrestrial average of values of total annual precipitation in millimeters')
#plt.savefig("regional-avg-total-annual-precipitation.png")
plotAvgData(yearVals, avgTemp, 'average temperature in degrees Celcius', 'regional terrestrial annual average of values in degrees Celcius')
#plt.savefig("regional-avg-average-annual-temperature.png")
plotAvgData(yearVals, totCO2, 'total CO2 emissions in millions of metric tons', 'regional terrestrial annual average of values in millions of metric tons')
#plt.savefig("regional-avg-average-annual-co2-emissions.png")
