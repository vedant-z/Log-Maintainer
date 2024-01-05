# Log-Maintainer
This project is a log ingestor system paired with a query interface that allows efficient handling of vast volumes of log data. It provides a simple interface for querying this data using full-text search or specific field filters.


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account 
- MongoDB Compass (optional but recommended for database visualization)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/dyte-submissions/november-2023-hiring-vedant-z.git

2. Install dependancies

   ```
   cd november-2023-hiring-vedant-z
   npm install

3. Create a ```.env``` file in the root directory and add your MongoDB Atlas credentials.

### Usage

**Running the Log Ingestor**

```
node index.js
```

Now you can use tool like Postman to ingest logs in json format.

**Using Query Interface**

```
node server.js
```

Now use the web interface by opening ```index.html``` in any browser to retrieve logs based on filters. 

## System Design

The system follows a client-server architecture, with the log ingestor serving as the backend and the query interface as the frontend. MongoDB Atlas is used as the database for storing log data.

## Implemented Features

### Log Ingestor

1. **MongoDB Integration:**
   - Connects to MongoDB Atlas to store log data.

2. **API Endpoint:**
   - Provides a POST endpoint `/logs` for ingesting log data.

3. **Error Handling:**
   - Catches and logs errors during log ingestion.
   - Returns appropriate HTTP status codes and error messages.

4. **Environment Variable Configuration:**
   - Uses environment variables for configuration, including MongoDB URI.

5. **Logging:**
   - Logs the success message when log data is ingested.

### Query Interface

1. **Filtering:**
   - Allows filtering logs based on various parameters such as level, message, resourceId, timestamp, traceId, spanId, commit, and parentResourceId.

2. **Basic Search:**
   - Performs basic search queries using MongoDB's `$regex` for case-insensitive partial matching.

3. **Advanced Filters:**
   - Implements advanced filters for searching within specific date ranges.

4. **UI Layout:**
   - Organizes the user interface with Bootstrap for a clean and responsive design.

5. **Toggleable Advanced Filters:**
   - Hides and shows the advanced filters section with a toggle button.

6. **Real-Time Interaction:**
   - Fetches and displays search results in real-time without requiring a page refresh.

7. **User Feedback:**
   - Provides user-friendly messages for search results and error handling.

## Bonus Features

1. **Toggleable Advanced Filters:**
   - Implements a feature to hide and show the advanced filters section by clicking a button.

2. **Environment Variable for MongoDB URI:**
   - Uses the `MONGO_URI` environment variable for secure configuration.

3. **Console Message on Database Connection:**
   - Logs a message to the console when successfully connected to the MongoDB database.

## Upcoming Features

- Implementation of role-based access to the query interface.

## Known Issues

- No known issues at the moment.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
