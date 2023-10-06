# Project 3 - Covid-19 Data Analysis

This repo contains code for Data Analytics project 3.

Topic:
The team chose COVID-19 data sources to explore with the objective of determining COVID-19 vaccination rates across the US. 

Data Source: https://health.google.com/covid-19/open-data/raw-data
The team utilized three tables for the project: demographics, vaccinations, and geography.

Data wrangling process:
1. Download CSVs
2. Create tables in PostgreSQL using covid_db_query.sql query in SQL folder.
3. Add row counter column to vaccinations table using update_vac.sql. This table had a lot of extraneous columns which were not needed for our analysis so we had to drop them.
4. Create a new table from vaccinations table filtered by group and extracting only needed columns using filtered_vac.sql.
5. Once the needed tables were in appropriate form, a Python job was run for each table to extract from the table and convert the data into JSON format.
6. Two files were used from local source - filtered_vac.json and geography.json.

Webpage/Flask development:
1. Python Flask app was created to run and host the web application (project3flask.py).
2. Various routes to local script and json endpoints had to be added to the application.

Javascript:
1. app.js in Static/js folder is the primary script utilized to render the visualizations.
2. Script calls both local and remote (Google hosted) JSON files/endpoints.
3. Plotly, D3, and Leaflet libraries/scripts are utilized to build the plots and charts. 
