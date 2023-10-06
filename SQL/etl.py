import psycopg2
import json
from credentials import db_params

# Open connection to database
conn = psycopg2.connect(**db_params)
print("connected")
cursor = conn.cursor()
# cursor.execute("SELECT * FROM demographics")
# cursor.execute("SELECT * FROM geography")
# cursor.execute("SELECT * FROM geography")
cursor.execute("SELECT * FROM filtered_vac")
rows = cursor.fetchall()
# column_name = [desc[0] for desc in cursor.description]
# conn.close

# # convert the rows into list of dictionaries
# mydata = []
# for row in rows:
#     data_dict = {}
#     for i in range(len(column_name)):
#         data_dict[column_name[i]] = row[i]
#     mydata.append(data_dict)

# # # convert the list into JSON object
# myjson = json.dumps(mydata)

# # # export file path
# # # jsonexportpath = "demographics.json"
# # #jsonexportpath = "geography.json"
# jsonexportpath = "vaccinations.json"

# # # write to file
# with open(jsonexportpath, "w") as json_file:
#     json.dump(myjson, json_file, indent=4)

########################
# new code to try dumping to a json array
result = []
for row in rows:
    row_dict = dict(zip([desc[0] for desc in cursor.description], row))
    result.append(row_dict)

# Save the list of dictionaries as a JSON array
with open("filtered_vac.json", "w") as json_file:
    json.dump(result, json_file)

# Close the cursor and connection
cursor.close()
conn.close()
