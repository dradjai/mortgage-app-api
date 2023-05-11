import { db } from "./dbConnect.js";
import { ObjectId } from "mongodb";

const coll = db.collection("customer-requests");

// Create Request

export const addRequest = async (req, res) => {

  try {
    const { firstName, lastName, email, phone, location, 
    propType, propValue, downPayment, credit, employment, scenario} = req.body;
  
    const reqObj = {
      firstName, lastName, email, phone, location, propType, propValue,
      downPayment, credit, employment, scenario,
      createdAt: new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
    }
  
    await coll.insertOne(reqObj);
  
    res.status(201).send({message: "Request submitted. Please allow 24hrs for a response"})
    
  } catch (error) {
      console.log(error);
    
  }

}

export const getRequests = async (req, res) => {

  try {
      const reqCollection = await coll.find().toArray();
      
      res.status(201).send(reqCollection);
      
    } catch (error) {
        console.log(error);
      
    }

}

export const editRequest = async (req, res) => {

  
  try {
    const id = {"_id": new ObjectId(req.params.docId)}
    const updatedValue = req.body;
    await coll.updateOne(id, {$set: updatedValue});
  
    res.status(201).send({message: "request has been updated"});
    
  } catch (error) {
      console.log(error);
  }

}

export const deleteRequest = async (req, res) => {

  
  try {
    const id = {"_id": new ObjectId(req.params.docId)}
    
    await coll.deleteOne(id);
  
    res.status(200).send({message: "request deleted"});
    
  } catch (error) {
      console.log(error);
  }

}


