import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { addRequest, deleteRequest, editRequest, getRequests } from "./src/custRequests.js";
import { addBroker, getBrokers } from "./src/brokers.js";

const app = express();

app.use(cors());
app.use(express.json());

// Add APIs - CRUD

app.post('/requests', addRequest);
app.get('/requests', getRequests);
app.patch('/requests/:docId', editRequest);
app.delete('/requests/:docId', deleteRequest);

app.post('/brokers', addBroker);
app.get('/brokers', getBrokers);








export const api = functions.https.onRequest(app);


