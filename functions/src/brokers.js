import { db } from "./dbConnect.js"

const coll = db.collection('brokers');


export const addBroker = async (req, res) => {
  
  try {
    const { name, email, phone, companyName, 
      title, license, about, image} = req.body;
    
    const brokerObj = {
      name, email, phone, companyName, title, license, 
      about, image
    }
    await coll.insertOne(brokerObj);
  
    res.status(201).send({message: "broker added"});
    
  } catch (error) {
      console.log(error);
  }

}

export const getBrokers = async (req, res) => {
  
  try {
    const brokerCollection = await coll.find().toArray();
  
    res.status(201).send(brokerCollection);
    
  } catch (error) {
      console.log(error);
  }

}

export const getBrokerByCity = async (req, res) => {
  try {

    const cityName = req.params.city;
  
    const brokerColl = await coll.find({city: { $in: [cityName]}}).toArray();
    //const brokers = await coll.find({ city: city }).toArray();

    res.status(201).send(brokerColl);
  } catch (error) {
      console.log(error);
    
  }
}