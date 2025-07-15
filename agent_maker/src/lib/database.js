import { MongoClient, ServerApiVersion } from 'mongodb';

// Use environment variable (Next.js automatically loads .env.local)
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
console.log('Database URI loaded:', uri ? 'Yes' : 'No');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function add_user(first_name, last_name, email, password) {
  try {
    await client.connect();
    const database = client.db("whatsapp_agent_maker");
    const users = database.collection("users");
    const result = await users.insertOne({first_name, last_name, email, password});
    console.log(`New user created with the following id: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function get_user(email, password) {
    try {
        await client.connect();
        const database = client.db("whatsapp_agent_maker");
        const users = database.collection("users");
        const user = await users.findOne({ email, password });
        if (user) {
            console.log(`User found: ${user.email}`);
            return {
                id: user._id.toString(),
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                name: `${user.first_name} ${user.last_name}`
            };
        } else {
            console.log("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    } finally {
        await client.close();
    }
}

async function delete_user(username) {
    try {
        await client.connect();
        const database = client.db("whatsapp_agent_maker");
        const users = database.collection("users");
        const user = await users.findOne({ username });
        if (user) {
            const result = await users.deleteOne({ username });
            console.log(`User deleted: ${result.deletedCount}`);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    } finally {
        await client.close();
    }
}

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export { add_user, get_user, delete_user, run };import NextAuth from 'next-auth'
