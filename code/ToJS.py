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
filename = "../data/CO2Avg/CO2_2000_to_2005.csv"

#read file
file = readFile(filename)

#add Null content
zero = [0] * len(file[0])

file.append(zero)


content = "/*Data structure: each element is (latitude, longitude, magnitude (year1), magnitude (year2), ....)*/ \n var CO2Data= ["

for elm in file:
	content += " "+str(elm)+",\n "

content+="];"
print content





