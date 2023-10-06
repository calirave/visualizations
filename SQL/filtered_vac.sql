CREATE TABLE filtered_vac AS

WITH RankedRows AS (
  SELECT
    location_key, cumulative_persons_vaccinated, cumulative_persons_fully_vaccinated,
    ROW_NUMBER() OVER (PARTITION BY location_key ORDER BY my_row_num DESC) AS row_num
  FROM
    vaccinations
)

SELECT
  *
FROM
  RankedRows
WHERE
  row_num = 1;







