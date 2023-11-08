// transactionController.js
import { connectToMongoDB } from "../db/mydb.js";
import { ObjectId } from "mongodb";

const getAllTransection = async (req, res) => {
  try {
    var db = await connectToMongoDB();
    const qury = {
      userId: req.query["userId"],
    };
    console.log(qury)
    db = db.collection("transections");
    const transections = await db.find(qury).toArray();
    res.status(201).json(transections);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const deleteTransection = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const objectIdToDelete = new ObjectId(req.body.transectionId);
    console.log(objectIdToDelete);
    if (!ObjectId.isValid(req.body.transectionId)) {
      return res.status(400).send("Invalid transactionId");
    }
    const r = await db
      .collection("transections")
      .findOne({ '_id': objectIdToDelete });
    console.log(r);

    await db
      .collection("transections")
      .findOneAndDelete({ '_id': objectIdToDelete });
    res.status(201).send("Transaction Deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const editTransection = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const trans = {
      userid: req.body.userid,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category,
      description:req.body.description,
    };
    
    for (const key in trans) {
      if (trans[key] === undefined || null) {
        delete trans[key];
      }
    }
    console.log(trans)
    const transectionId = req.body.transectionId;
    console.log(req.body);
    await db
      .collection("transections")
      .findOneAndUpdate({ _id: new ObjectId(transectionId) }, { $set: trans });
    res.status(201).send("Edit Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    console.log(req.body)
    const db = await connectToMongoDB();
    await db.collection("transections").insertOne(req.body);
    res.status(201).send("Transection Created");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};
