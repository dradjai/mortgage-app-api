import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { addRequest, deleteRequest, editRequest, getRequestCount, getRequests } from "./src/custRequests.js";
import { addBroker, getBrokerByCity, getBrokers } from "./src/brokers.js";
import { addUser, loginUser } from "./src/users.js";

const app = express();

app.use(cors());
app.use(express.json());

// Add APIs - CRUD

app.post('/requests/:userId', addRequest);
app.get('/requests/:userId', getRequests);
app.get('/request-count/:userId', getRequestCount);
app.patch('/requests/:userId/:docId', editRequest);
app.delete('/requests/:userId/:docId', deleteRequest);


app.post('/brokers', addBroker);
app.get('/brokers', getBrokers);
app.get('/brokers-city/:city', getBrokerByCity);

app.post('/register', addUser )
app.post('/login', loginUser)







export const api = functions.https.onRequest(app);


