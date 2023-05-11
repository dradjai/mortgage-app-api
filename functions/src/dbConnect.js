import { MongoClient } from "mongodb";
import { mongotUri } from "../secrets.js";


const client = new MongoClient(mongotUri);

export const db = client.db("mortgage-app");

