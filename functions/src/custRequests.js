import { db } from "./dbConnect.js";
import { ObjectId } from "mongodb";


const coll = db.collection("customer-requests");

// Create Request


export const getRequestCount = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId)
    const u_id = userId + ""; 
    const requestColl = await coll.find({userId: { $in: [u_id]}}).toArray();
    const reqLength = requestColl.length;

    res.status(201).send({reqLength});
      
    } catch (error) {
        console.log(error);
      
    }
}


export const addRequest = async (req, res) => {

  try {
    const { firstName, lastName, email, phone, location, 
    propType, propValue, downPayment, credit, employment, scenario, userId} = req.body;
  
    const reqObj = {
      firstName, lastName, email, phone, location, propType, propValue,
      downPayment, credit, employment, scenario, userId,
      createdAt: new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
    }

    
    await coll.insertOne(reqObj);
    getRequests(req, res);
  
    
  } catch (error) {
      console.log(error);
    
  }

}

export const getRequests = async (req, res) => {

  try {
    const userId = new ObjectId(req.params.userId)
    const u_id = userId + ""; 
    const requestColl = await coll.find({userId: { $in: [u_id]}}).toArray();
   

    res.status(201).send(requestColl);
      
    } catch (error) {
        console.log(error);
      
    }
}

export const editRequest = async (req, res) => {

  
  try {
    const id = {"_id": new ObjectId(req.params.docId)}
    const updatedValue = req.body;
    await coll.updateOne(id, {$set: updatedValue});

    getRequests(req, res);

    
  } catch (error) {
      console.log(error);
  }
}

export const deleteRequest = async (req, res) => {

  
  try {
    const id = {"_id": new ObjectId(req.params.docId)}
    
    await coll.deleteOne(id);
    getRequests(req, res);
  
    
  } catch (error) {
      console.log(error);
  }

}


