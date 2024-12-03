import express, { Router } from "express";
import serverless from "serverless-http";

import Airtable from "airtable";
import path from "path";

const api = express();

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base('app8tUhUsRsNkFPhm');

// Get 5 upcoming events
api.get('/api/data', (req, res) => {
    base('Events').select({
        maxRecords: 5, 
    }).eachPage((records, fetchNextPage) => {
        const data = records.map(record => record.fields);
        res.json(data);
        fetchNextPage();
    }, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
        }
    });
});

// Serve static files (HTML, CSS, JS) from the 'public' folder
api.use(express.static(path.join(__dirname, 'public')));

// // Start the server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const router = Router();
// router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);
