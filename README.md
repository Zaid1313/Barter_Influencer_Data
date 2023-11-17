# Barter_Influencer_Data
Bulk ingestion of influencers data in Bartergram's database.

## Instructions for Setting Up the Code

### Step 1: Install Dependencies

First, install all the required dependencies by running the following command in your terminal:

```bash
npm install
```

### Step 2: Create a .env File

Create a `.env` file in the project's root directory and set it up in the following format, replacing the placeholders with your database information:

```env
DB_HOST=<host address>
DB_NAME=<database name>
DB_USERNAME=<db username>
DB_PASSWORD=<db password>
DB_PORT=<db port>
```

## Step 2: Start the Node Server

You can start the Node server by running either of the following commands. The server will run on port 3000.

```bash
node index.js
```

or

```bash
nodemon index.js
```

### Step 3: Sync the Database

Send a GET request to the following route to synchronize the database:

```
http://localhost:3000/syncDB
```

### Step 4: Ingest Data from Spreadsheet to Database

Finally, ingest the data from the spreadsheet to the database by sending a GET request to the following route, providing the sheetId as a query parameter:

Route:
```
http://localhost:3000/influence_data_upload
```

Example: 
```
http://localhost:3000/influence_data_upload?sheetId=1Yr0VZJx5JdbRtaX-h2yPlVlzfW2HpMPnw4w-fnguTaE
```
