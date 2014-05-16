# # -*- coding: utf-8 -*-
# # <nbformat>3.0</nbformat>

# # <codecell>

# # preamble
import pandas as pd

print pd.__version__
# # pd.set_option('display.mpl_style', 'default') # Make the graphs a bit prettier
# #figsize(15,5) #not working

import matplotlib.pyplot as plt
# #enable inline plotting
# # %matplotlib inline

# # <codecell>

# # define our file path and what we want our headers to be
file_path = '../climate-vis/data/PrecipData/precip.1900'
# latitude, longitude in decimal degrees. Monthly values are total precipitation in mm.
header = ['Longitude', 'Latitude', 'January', 'February', 'March', 'April', 'May', 'June', 'July', \
                 'August', 'September', 'October', 'November', 'December']
df = pd.read_table(file_path,sep='\s*', names = header)

# # <codecell>

# #check out what we got here
# print df.tail()

# # <codecell>

# #check data types
print df.dtypes

# # <codecell>

plt.scatter(df['Longitude'],df['Latitude'],c=df['January'],edgecolors='none')

