import sys

def readFile(filename):
    results = []
    with open(filename) as inputfile:
        for line in inputfile:
            line = line.strip().split(',')
            strip_line = map(str.strip, line)
            results.append(strip_line)
    return results

def delBlckSpace(list):
    cnt1 = 0
    for elm in list:
        cnt2 = 0
        for itm in elm:
            if itm == '':
                del list[cnt1][cnt2]
            cnt2+=1
        cnt1+=1
    return list

#Filename
filename = "../data/appData/CO2_1900_to_2010res_1.csv"

#read file
file = readFile(filename)

#write Javascript format
content = "/*Data structure: each element is (counter, longitude, latitude, magnitude (year1), magnitude (year2), ....)*/ \n var CO2Data= ["

for i in xrange(1,len(file),1):
	content += " "+str(file[i])+",\n "

content+="];"
print content





