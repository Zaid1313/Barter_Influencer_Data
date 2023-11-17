# Barter_Influencer_Data
Bulk ingestion of influencers data in Bartergram's database.

Instructions for Setting Up the Code
Step 1: Create a .env File
Add a .env file in the root directory with the following format:

env
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_PORT=

Step 2: Run the Server
Run the index.js file by executing the following command from the root directory:

bash
node index.js
or if you have nodemon installed:

bash
nodemon index.js

Step 3: Sync the Database
Send a GET request to the following route to synchronize the database:

http://localhost:3000/syncDB

Step 4: Ingest Data from Spreadsheet to Database
Finally, ingest the data from the spreadsheet to the database by sending a GET request to the following route, providing the sheetId as a query parameter:

Route: http://localhost:3000/influence_data_upload

Example: http://localhost:3000/influence_data_upload?sheetId=1Yr0VZJx5JdbRtaX-h2yPlVlzfW2HpMPnw4w-fnguTaE
