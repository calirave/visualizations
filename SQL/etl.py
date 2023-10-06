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
