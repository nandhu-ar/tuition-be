import { MongoClient } from "mongodb";

// Connection URI
let dbName = process.env.DB_NAME;
let collectionName = process.env.COLLECTION;

// Create a new MongoClient
let client;

async function createClient() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_BASEPATH}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
  console.log(uri);
  dbName = process.env.DB_NAME;
  collectionName = process.env.COLLECTION;
  client = new MongoClient(uri);
}

async function connectToDatabase() {
  try {
    if (!client) await createClient();
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function disconnectDB() {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
}

export async function insertToDB(data) {
  try {
    await connectToDatabase();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(data);
    console.log("Inserted document:", result.insertedId);
  } catch (error) {
    console.log("Unable to insert data to db", data, error);
  } finally {
    await disconnectDB();
  }
}

export async function getAllStudents() {
  try {
    await connectToDatabase();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const cursor = collection.find();
    const result = [];
    for await (const doc of cursor) {
      result.push(doc);
    }
    return result;
  } catch (error) {
    console.log("Unable to read data from db", error);
  } finally {
    await disconnectDB();
  }
}
