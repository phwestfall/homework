
# Heroes Of Pymoli Data Analysis

## Background 

Congratulations! After a lot of hard work in the data munging mines, you've landed a job as Lead Analyst for an independent gaming company. You've been assigned the task of analyzing the data for their most recent fantasy game Heroes of Pymoli.

Like many others in its genre, the game is free-to-play, but players are encouraged to purchase optional items that enhance their playing experience. As a first task, the company would like you to generate a report that breaks down the game's purchasing data into meaningful insights.

-----

## Observable Trends

* Of the 1163 active players, the vast majority are male (84%). There also exists, a smaller, but notable proportion of female players (14%).

* Our peak age demographic falls between 20-24 (44.79%) with secondary groups falling between 15-19 (18.58%) and 25-29 (13.37%). 

* The age group that spends the most money is the 20-24 with $1,114.06 dollars as total purchase value and an average purchase of $4.32. In contrast, the demographic group that has the highest average purchase is the 35-39 with $4.76 and a total purchase value of $147.67. 
-----



```python
# Dependencies and Setup
import pandas as pd
import numpy as np

# Raw data file
file_to_load = "Resources/purchase_data.csv"

# Read purchasing file and store into pandas data frame
purchase_data = pd.read_csv(file_to_load)
```

## Player Count

* Total Number of Players



```python
# Use the length of list of screen names "SN", for total players.
total_players = len(purchase_data["SN"].value_counts())

# Create a data frame with total players named player count
player_count = pd.DataFrame({"Total Players":[total_players]})
player_count
```




<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>576</td>
    </tr>
  </tbody>
</table>
</div>



## Purchasing Analysis (Total)

* Number of Unique Items


* Average Purchase Price


* Total Number of Purchases


* Total Revenue



```python
# Calculations for unique items, average price, purchase count, and revenue
number_of_unique_items = len((purchase_data["Item ID"]).unique())
average_price = (purchase_data["Price"]).mean()
number_of_purchases = (purchase_data["Purchase ID"]).count()
total_revenue = (purchase_data["Price"]).sum()

# Create data frame with obtained values
summary_df = pd.DataFrame({"Number of Unique Items":[number_of_unique_items],
                           "Average Price":[average_price], 
                           "Number of Purchases": [number_of_purchases], 
                           "Total Revenue": [total_revenue]})

# Format with currency style
summary_df.style.format({'Average Price':"${:,.2f}",
                         'Total Revenue': '${:,.2f}'})
```





<table id="T_8eab2a8a_9c53_11e8_bca9_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Number of Unique Items</th> 
        <th class="col_heading level0 col1" >Average Price</th> 
        <th class="col_heading level0 col2" >Number of Purchases</th> 
        <th class="col_heading level0 col3" >Total Revenue</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8eab2a8a_9c53_11e8_bca9_d49a20d1630flevel0_row0" class="row_heading level0 row0" >0</th> 
        <td id="T_8eab2a8a_9c53_11e8_bca9_d49a20d1630frow0_col0" class="data row0 col0" >183</td> 
        <td id="T_8eab2a8a_9c53_11e8_bca9_d49a20d1630frow0_col1" class="data row0 col1" >$3.05</td> 
        <td id="T_8eab2a8a_9c53_11e8_bca9_d49a20d1630frow0_col2" class="data row0 col2" >780</td> 
        <td id="T_8eab2a8a_9c53_11e8_bca9_d49a20d1630frow0_col3" class="data row0 col3" >$2,379.77</td> 
    </tr></tbody> 
</table> 



## Gender Demographics

* Percentage and Count of Male Players


* Percentage and Count of Female Players


* Percentage and Count of Other / Non-Disclosed





```python
# Group purchase_data by Gender
gender_stats = purchase_data.groupby("Gender")

# Count the total of screen names "SN" by gender
total_count_gender = gender_stats.nunique()["SN"]

# Total count by gender and divivde by total players 
percentage_of_players = total_count_gender / total_players * 100

# Create data frame with obtained values
gender_demographics = pd.DataFrame({"Percentage of Players": percentage_of_players, "Total Count": total_count_gender})

# Format the data frame with no index name in the corner
gender_demographics.index.name = None

# Format the values sorted by total count in descending order, and two decimal places for the percentage
gender_demographics.sort_values(["Total Count"], ascending = False).style.format({"Percentage of Players":"{:.2f}"})



```





<table id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Percentage of Players</th> 
        <th class="col_heading level0 col1" >Total Count</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630flevel0_row0" class="row_heading level0 row0" >Male</th> 
        <td id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630frow0_col0" class="data row0 col0" >84.03</td> 
        <td id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630frow0_col1" class="data row0 col1" >484</td> 
    </tr>    <tr> 
        <th id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630flevel0_row1" class="row_heading level0 row1" >Female</th> 
        <td id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630frow1_col0" class="data row1 col0" >14.06</td> 
        <td id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630frow1_col1" class="data row1 col1" >81</td> 
    </tr>    <tr> 
        <th id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630flevel0_row2" class="row_heading level0 row2" >Other / Non-Disclosed</th> 
        <td id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630frow2_col0" class="data row2 col0" >1.91</td> 
        <td id="T_8ec2dd4c_9c53_11e8_8bab_d49a20d1630frow2_col1" class="data row2 col1" >11</td> 
    </tr></tbody> 
</table> 




## Purchasing Analysis (Gender)

* The below each broken by gender

  * Purchase Count
  
  * Average Purchase Price
  
  * Total Purchase Value
  
  * Average Purchase Total per Person by Gender


```python
# Count the total purchases by gender 
purchase_count = gender_stats["Purchase ID"].count()

# Average purchase prices by gender
avg_purchase_price = gender_stats["Price"].mean()

# Average purchase total by gender 
avg_purchase_total = gender_stats["Price"].sum()

# Average purchase total by gender divivded by purchase count by unique shoppers
avg_purchase_per_person = avg_purchase_total/total_count_gender

# Create data frame with obtained values 
gender_demographics = pd.DataFrame({"Purchase Count": purchase_count, 
                                    "Average Purchase Price": avg_purchase_price,
                                    "Average Purchase Value":avg_purchase_total,
                                    "Avg Purchase Total per Person": avg_purchase_per_person})

# Provide index in top left as "Gender"
gender_demographics.index.name = "Gender"

# Format with currency style
gender_demographics.style.format({"Average Purchase Value":"${:,.2f}",
                                  "Average Purchase Price":"${:,.2f}",
                                  "Avg Purchase Total per Person":"${:,.2f}"})


```




 
<table id="T_8ec591b8_9c53_11e8_885f_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Purchase Count</th> 
        <th class="col_heading level0 col1" >Average Purchase Price</th> 
        <th class="col_heading level0 col2" >Average Purchase Value</th> 
        <th class="col_heading level0 col3" >Avg Purchase Total per Person</th> 
    </tr>    <tr> 
        <th class="index_name level0" >Gender</th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ec591b8_9c53_11e8_885f_d49a20d1630flevel0_row0" class="row_heading level0 row0" >Female</th> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow0_col0" class="data row0 col0" >113</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow0_col1" class="data row0 col1" >$3.20</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow0_col2" class="data row0 col2" >$361.94</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow0_col3" class="data row0 col3" >$4.47</td> 
    </tr>    <tr> 
        <th id="T_8ec591b8_9c53_11e8_885f_d49a20d1630flevel0_row1" class="row_heading level0 row1" >Male</th> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow1_col0" class="data row1 col0" >652</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow1_col1" class="data row1 col1" >$3.02</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow1_col2" class="data row1 col2" >$1,967.64</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow1_col3" class="data row1 col3" >$4.07</td> 
    </tr>    <tr> 
        <th id="T_8ec591b8_9c53_11e8_885f_d49a20d1630flevel0_row2" class="row_heading level0 row2" >Other / Non-Disclosed</th> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow2_col0" class="data row2 col0" >15</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow2_col1" class="data row2 col1" >$3.35</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow2_col2" class="data row2 col2" >$50.19</td> 
        <td id="T_8ec591b8_9c53_11e8_885f_d49a20d1630frow2_col3" class="data row2 col3" >$4.56</td> 
    </tr></tbody> 
</table> 



## Age Demographics

* The below each broken into bins of 4 years (i.e. &lt;10, 10-14, 15-19, etc.)

  * Percentage of Players
  
  * Total Count 




```python
# Establish bins for ages
age_bins = [0, 9.90, 14.90, 19.90, 24.90, 29.90, 34.90, 39.90, 99999]
group_names = ["<10", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40+"]

# Segment and sort age values into bins established above
purchase_data["Age Group"] = pd.cut(purchase_data["Age"],age_bins, labels=group_names)
purchase_data

# Create new data frame with the added "Age Group" and group it
age_grouped = purchase_data.groupby("Age Group")

# Count total players by age category
total_count_age = age_grouped["SN"].nunique()

# Calculate percentages by age category 
percentage_by_age = (total_count_age/total_players) * 100

# Create data frame with obtained values
age_demographics = pd.DataFrame({"Percentage of Players": percentage_by_age, "Total Count": total_count_age})

# Format the data frame with no index name in the corner
age_demographics.index.name = None

# Format percentage with two decimal places 
age_demographics.style.format({"Percentage of Players":"{:,.2f}"})

```




 
<table id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Percentage of Players</th> 
        <th class="col_heading level0 col1" >Total Count</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row0" class="row_heading level0 row0" ><10</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow0_col0" class="data row0 col0" >2.95</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow0_col1" class="data row0 col1" >17</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row1" class="row_heading level0 row1" >10-14</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow1_col0" class="data row1 col0" >3.82</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow1_col1" class="data row1 col1" >22</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row2" class="row_heading level0 row2" >15-19</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow2_col0" class="data row2 col0" >18.58</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow2_col1" class="data row2 col1" >107</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row3" class="row_heading level0 row3" >20-24</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow3_col0" class="data row3 col0" >44.79</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow3_col1" class="data row3 col1" >258</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row4" class="row_heading level0 row4" >25-29</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow4_col0" class="data row4 col0" >13.37</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow4_col1" class="data row4 col1" >77</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row5" class="row_heading level0 row5" >30-34</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow5_col0" class="data row5 col0" >9.03</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow5_col1" class="data row5 col1" >52</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row6" class="row_heading level0 row6" >35-39</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow6_col0" class="data row6 col0" >5.38</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow6_col1" class="data row6 col1" >31</td> 
    </tr>    <tr> 
        <th id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630flevel0_row7" class="row_heading level0 row7" >40+</th> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow7_col0" class="data row7 col0" >2.08</td> 
        <td id="T_8ec9961e_9c53_11e8_9e37_d49a20d1630frow7_col1" class="data row7 col1" >12</td> 
    </tr></tbody> 
</table> 



## Purchasing Analysis (Age)

* The below each broken into bins of 4 years (i.e. &lt;10, 10-14, 15-19, etc.)

  * Purchase Count
  
  * Average Purchase Price
  
  * Total Purchase Value
  
  * Average Purchase Total per Person by Age Group



```python
# Count purchases by age group
purchase_count_age = age_grouped["Purchase ID"].count()

# Obtain average purchase price by age group 
avg_purchase_price_age = age_grouped["Price"].mean()

# Calculate total purchase value by age group 
total_purchase_value = age_grouped["Price"].sum()

# Calculate the average purchase per person in the age group 
avg_purchase_per_person_age = total_purchase_value/total_count_age

# Create data frame with obtained values
age_demographics = pd.DataFrame({"Purchase Count": purchase_count_age,
                                 "Average Purchase Price": avg_purchase_price_age,
                                 "Total Purchase Value":total_purchase_value,
                                 "Average Purchase Total per Person": avg_purchase_per_person_age})

# Format the data frame with no index name in the corner
age_demographics.index.name = None

# Format with currency style
age_demographics.style.format({"Average Purchase Price":"${:,.2f}",
                               "Total Purchase Value":"${:,.2f}",
                               "Average Purchase Total per Person":"${:,.2f}"})


```





<table id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Purchase Count</th> 
        <th class="col_heading level0 col1" >Average Purchase Price</th> 
        <th class="col_heading level0 col2" >Total Purchase Value</th> 
        <th class="col_heading level0 col3" >Average Purchase Total per Person</th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row0" class="row_heading level0 row0" ><10</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow0_col0" class="data row0 col0" >23</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow0_col1" class="data row0 col1" >$3.35</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow0_col2" class="data row0 col2" >$77.13</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow0_col3" class="data row0 col3" >$4.54</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row1" class="row_heading level0 row1" >10-14</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow1_col0" class="data row1 col0" >28</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow1_col1" class="data row1 col1" >$2.96</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow1_col2" class="data row1 col2" >$82.78</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow1_col3" class="data row1 col3" >$3.76</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row2" class="row_heading level0 row2" >15-19</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow2_col0" class="data row2 col0" >136</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow2_col1" class="data row2 col1" >$3.04</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow2_col2" class="data row2 col2" >$412.89</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow2_col3" class="data row2 col3" >$3.86</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row3" class="row_heading level0 row3" >20-24</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow3_col0" class="data row3 col0" >365</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow3_col1" class="data row3 col1" >$3.05</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow3_col2" class="data row3 col2" >$1,114.06</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow3_col3" class="data row3 col3" >$4.32</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row4" class="row_heading level0 row4" >25-29</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow4_col0" class="data row4 col0" >101</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow4_col1" class="data row4 col1" >$2.90</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow4_col2" class="data row4 col2" >$293.00</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow4_col3" class="data row4 col3" >$3.81</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row5" class="row_heading level0 row5" >30-34</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow5_col0" class="data row5 col0" >73</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow5_col1" class="data row5 col1" >$2.93</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow5_col2" class="data row5 col2" >$214.00</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow5_col3" class="data row5 col3" >$4.12</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row6" class="row_heading level0 row6" >35-39</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow6_col0" class="data row6 col0" >41</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow6_col1" class="data row6 col1" >$3.60</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow6_col2" class="data row6 col2" >$147.67</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow6_col3" class="data row6 col3" >$4.76</td> 
    </tr>    <tr> 
        <th id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630flevel0_row7" class="row_heading level0 row7" >40+</th> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow7_col0" class="data row7 col0" >13</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow7_col1" class="data row7 col1" >$2.94</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow7_col2" class="data row7 col2" >$38.24</td> 
        <td id="T_8ecc59ba_9c53_11e8_8417_d49a20d1630frow7_col3" class="data row7 col3" >$3.19</td> 
    </tr></tbody> 
</table> 



## Top Spenders

* Identify the the top 5 spenders in the game by total purchase value, then list (in a table):

  * SN(screen name)
  
  * Purchase Count
  
  * Average Purchase Price
  
  * Total Purchase Value



```python
# Group purchase data by screen names
spender_stats = purchase_data.groupby("SN")

# Count the total purchases by name
purchase_count_spender = spender_stats["Purchase ID"].count()

# Calculate the average purchase by name 
avg_purchase_price_spender = spender_stats["Price"].mean()

# Calculate purchase total 
purchase_total_spender = spender_stats["Price"].sum()

# Create data frame with obtained values
top_spenders = pd.DataFrame({"Purchase Count": purchase_count_spender,
                             "Average Purchase Price": avg_purchase_price_spender,
                             "Total Purchase Value":purchase_total_spender})

# Sort in descending order to obtain top 5 spender names 
formatted_spenders = top_spenders.sort_values(["Total Purchase Value"], ascending=False).head()

# Format with currency style
formatted_spenders.style.format({"Average Purchase Total":"${:,.2f}",
                                 "Average Purchase Price":"${:,.2f}", 
                                 "Total Purchase Value":"${:,.2f}"})

```





<table id="T_8ecfe534_9c53_11e8_9489_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Purchase Count</th> 
        <th class="col_heading level0 col1" >Average Purchase Price</th> 
        <th class="col_heading level0 col2" >Total Purchase Value</th> 
    </tr>    <tr> 
        <th class="index_name level0" >SN</th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ecfe534_9c53_11e8_9489_d49a20d1630flevel0_row0" class="row_heading level0 row0" >Lisosia93</th> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow0_col0" class="data row0 col0" >5</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow0_col1" class="data row0 col1" >$3.79</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow0_col2" class="data row0 col2" >$18.96</td> 
    </tr>    <tr> 
        <th id="T_8ecfe534_9c53_11e8_9489_d49a20d1630flevel0_row1" class="row_heading level0 row1" >Idastidru52</th> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow1_col0" class="data row1 col0" >4</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow1_col1" class="data row1 col1" >$3.86</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow1_col2" class="data row1 col2" >$15.45</td> 
    </tr>    <tr> 
        <th id="T_8ecfe534_9c53_11e8_9489_d49a20d1630flevel0_row2" class="row_heading level0 row2" >Chamjask73</th> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow2_col0" class="data row2 col0" >3</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow2_col1" class="data row2 col1" >$4.61</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow2_col2" class="data row2 col2" >$13.83</td> 
    </tr>    <tr> 
        <th id="T_8ecfe534_9c53_11e8_9489_d49a20d1630flevel0_row3" class="row_heading level0 row3" >Iral74</th> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow3_col0" class="data row3 col0" >4</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow3_col1" class="data row3 col1" >$3.40</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow3_col2" class="data row3 col2" >$13.62</td> 
    </tr>    <tr> 
        <th id="T_8ecfe534_9c53_11e8_9489_d49a20d1630flevel0_row4" class="row_heading level0 row4" >Iskadarya95</th> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow4_col0" class="data row4 col0" >3</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow4_col1" class="data row4 col1" >$4.37</td> 
        <td id="T_8ecfe534_9c53_11e8_9489_d49a20d1630frow4_col2" class="data row4 col2" >$13.10</td> 
    </tr></tbody> 
</table> 



## Most Popular Items

* Top 5 most popular items by purchase count:

  * Item ID
  
  * Item Name
  
  * Purchase Count
  
  * Item Price
  
  * Total Purchase Value


```python
# Create new data frame with items related information 
items = purchase_data[["Item ID", "Item Name", "Price"]]

# Group the item data by item id and item name 
item_stats = items.groupby(["Item ID","Item Name"])

# Count the number of times an item has been purchased 
purchase_count_item = item_stats["Price"].count()

# Calcualte the purchase value per item 
purchase_value = (item_stats["Price"].sum()) 

# Find individual item price
item_price = purchase_value/purchase_count_item

# Create data frame with obtained values
most_popular_items = pd.DataFrame({"Purchase Count": purchase_count_item, 
                                   "Item Price": item_price,
                                   "Total Purchase Value":purchase_value})

# Sort in descending order to obtain top spender names and provide top 5 item names
popular_formatted = most_popular_items.sort_values(["Purchase Count"], ascending=False).head()

# Format with currency style
popular_formatted.style.format({"Item Price":"${:,.2f}",
                                "Total Purchase Value":"${:,.2f}"})
```





<table id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank" ></th> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Purchase Count</th> 
        <th class="col_heading level0 col1" >Item Price</th> 
        <th class="col_heading level0 col2" >Total Purchase Value</th> 
    </tr>    <tr> 
        <th class="index_name level0" >Item ID</th> 
        <th class="index_name level1" >Item Name</th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel0_row0" class="row_heading level0 row0" >178</th> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel1_row0" class="row_heading level1 row0" >Oathbreaker, Last Hope of the Breaking Storm</th> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow0_col0" class="data row0 col0" >12</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow0_col1" class="data row0 col1" >$4.23</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow0_col2" class="data row0 col2" >$50.76</td> 
    </tr>    <tr> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel0_row1" class="row_heading level0 row1" >145</th> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel1_row1" class="row_heading level1 row1" >Fiery Glass Crusader</th> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow1_col0" class="data row1 col0" >9</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow1_col1" class="data row1 col1" >$4.58</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow1_col2" class="data row1 col2" >$41.22</td> 
    </tr>    <tr> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel0_row2" class="row_heading level0 row2" >108</th> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel1_row2" class="row_heading level1 row2" >Extraction, Quickblade Of Trembling Hands</th> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow2_col0" class="data row2 col0" >9</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow2_col1" class="data row2 col1" >$3.53</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow2_col2" class="data row2 col2" >$31.77</td> 
    </tr>    <tr> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel0_row3" class="row_heading level0 row3" >82</th> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel1_row3" class="row_heading level1 row3" >Nirvana</th> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow3_col0" class="data row3 col0" >9</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow3_col1" class="data row3 col1" >$4.90</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow3_col2" class="data row3 col2" >$44.10</td> 
    </tr>    <tr> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel0_row4" class="row_heading level0 row4" >19</th> 
        <th id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630flevel1_row4" class="row_heading level1 row4" >Pursuit, Cudgel of Necromancy</th> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow4_col0" class="data row4 col0" >8</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow4_col1" class="data row4 col1" >$1.02</td> 
        <td id="T_8ed36afe_9c53_11e8_8b74_d49a20d1630frow4_col2" class="data row4 col2" >$8.16</td> 
    </tr></tbody> 
</table> 



## Most Profitable Items

* Top 5 most profitable items by total purchase value:

  * Item ID
  
  * Item Name
  
  * Purchase Count
  
  * Item Price
  
  * Total Purchase Value


```python
# Take the most_popular items data frame and change the sorting to find highest total purchase value
popular_formatted = most_popular_items.sort_values(["Total Purchase Value"],
                                                   ascending=False).head()
# Format with currency style
popular_formatted.style.format({"Item Price":"${:,.2f}",
                                "Total Purchase Value":"${:,.2f}"})
```





<table id="T_8ed59b08_9c53_11e8_842e_d49a20d1630f" > 
<thead>    <tr> 
        <th class="blank" ></th> 
        <th class="blank level0" ></th> 
        <th class="col_heading level0 col0" >Purchase Count</th> 
        <th class="col_heading level0 col1" >Item Price</th> 
        <th class="col_heading level0 col2" >Total Purchase Value</th> 
    </tr>    <tr> 
        <th class="index_name level0" >Item ID</th> 
        <th class="index_name level1" >Item Name</th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
        <th class="blank" ></th> 
    </tr></thead> 
<tbody>    <tr> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel0_row0" class="row_heading level0 row0" >178</th> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel1_row0" class="row_heading level1 row0" >Oathbreaker, Last Hope of the Breaking Storm</th> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow0_col0" class="data row0 col0" >12</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow0_col1" class="data row0 col1" >$4.23</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow0_col2" class="data row0 col2" >$50.76</td> 
    </tr>    <tr> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel0_row1" class="row_heading level0 row1" >82</th> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel1_row1" class="row_heading level1 row1" >Nirvana</th> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow1_col0" class="data row1 col0" >9</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow1_col1" class="data row1 col1" >$4.90</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow1_col2" class="data row1 col2" >$44.10</td> 
    </tr>    <tr> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel0_row2" class="row_heading level0 row2" >145</th> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel1_row2" class="row_heading level1 row2" >Fiery Glass Crusader</th> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow2_col0" class="data row2 col0" >9</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow2_col1" class="data row2 col1" >$4.58</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow2_col2" class="data row2 col2" >$41.22</td> 
    </tr>    <tr> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel0_row3" class="row_heading level0 row3" >92</th> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel1_row3" class="row_heading level1 row3" >Final Critic</th> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow3_col0" class="data row3 col0" >8</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow3_col1" class="data row3 col1" >$4.88</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow3_col2" class="data row3 col2" >$39.04</td> 
    </tr>    <tr> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel0_row4" class="row_heading level0 row4" >103</th> 
        <th id="T_8ed59b08_9c53_11e8_842e_d49a20d1630flevel1_row4" class="row_heading level1 row4" >Singed Scalpel</th> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow4_col0" class="data row4 col0" >8</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow4_col1" class="data row4 col1" >$4.35</td> 
        <td id="T_8ed59b08_9c53_11e8_842e_d49a20d1630frow4_col2" class="data row4 col2" >$34.80</td> 
    </tr></tbody> 
</table> 
