const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.port || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zfqrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const foodCollection = client
      .db("restaurantDB")
      .collection("foodCollection");
    const orderCollection = client
      .db("restaurantDB")
      .collection("orderCollection");
    const reviewCollection = client
      .db("restaurantDB")
      .collection("reviewCollection");

    app.get("/allFoods", async (req, res) => {
      const limit = parseInt(req.query.limit);
      const from = req.query.from;
      const user = req.query.user;

      let sort;
      if (from) {
        sort = { purchaseCount: -1 };
      }

      let query;
      if (user) {
        query = { "addedBy.email": user };
      }

      const result = await foodCollection
        .find(query)
        .sort(sort)
        .limit(limit)
        .toArray();
      res.send(result);
    });
    app.post("/allFoods", async (req, res) => {
      const food = req.body;

      const result = await foodCollection.insertOne(food);
      res.send(result);
    });

    app.get("/allFood/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await foodCollection.findOne(query);
      res.send(result);
    });
    app.put("/allFood/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          foodName: req.body.foodName,
          foodImage: req.body.foodImage,
          foodOrigin: req.body.foodOrigin,
          foodCategory: req.body.foodCategory,
          price: parseInt(req.body.price),
          foodQuantity: parseInt(req.body.foodQuantity),
          foodQuantityType: req.body.foodQuantityType,
          description: req.body.description,
        },
      };

      const result = await foodCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.patch("/allFood/:id", async (req, res) => {
      const id = req.params.id;
      const { orderQuantity } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $inc: {
          foodQuantity: -orderQuantity,
          purchaseCount: orderQuantity,
        },
      };

      const result = await foodCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    app.get("/order", async (req, res) => {
      const user = req.query.user;
      const result = await orderCollection.find().toArray();
      res.send(result);
    });
    app.post("/order", async (req, res) => {
      const orderDate = Date.now();
      const orderItem = { orderDate, ...req.body };

      const result = await orderCollection.insertOne(orderItem);
      res.send(result);
    });
    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("restaurant is open now");
});

app.listen(port, () => {
  console.log(`restaurant is running: ${port}`);
});
