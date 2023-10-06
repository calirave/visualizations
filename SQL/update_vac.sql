-- Step 1: Add the new column
ALTER TABLE vaccinations
ADD COLUMN row_num serial;

-- Step 2: Update the new column with row numbers
UPDATE vaccinations
SET row_num = subquery.row_number
FROM (
  SELECT ctid, ROW_NUMBER() OVER (ORDER BY location_key) AS row_number
  FROM vaccinations
) AS subquery
WHERE vaccinations.ctid = subquery.ctid;
