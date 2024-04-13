import { MongoClient } from "mongodb";

// Connection URI
const uri =
  "mongodb+srv://dbuser:7sR4GPP4DM4ANAwY@clusterm0.cavquww.mongodb.net/?retryWrites=true&w=majority&appName=ClusterM0";
const dbName = "ClusterM0";
const collectionName = "student";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
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
      console.log(result);
    return result;
  } catch (error) {
    console.log("Unable to insert data to db", data, error);
  } finally {
    await disconnectDB();
  }
}
