import { MongoClient } from "mongodb";

const mongodbURI =
  "mongodb+srv://admin:test@ecommerce.yvyofkp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongodbURI, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("ecommerce");

    switch (req.method) {
      case "POST":
        try {
          const collection = db.collection("wishlist");
          const product = await collection.insertOne({ ...JSON.parse(req.body) });

          if (product) {
            return res.status(200).send({ msg: "success" });
          } else {
            return res.status(404).send({ msg: "error" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ msg: "error" });
        }

      case "GET":
        try {
          const collection = db.collection("wishlist");
          const products = await collection.find({ email: req.query.email }).toArray();

          if (products) {
            return res.status(200).send({ msg: "success", data: products });
          } else {
            return res.status(404).send({ msg: "error" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ msg: "error" });
        }

      default:
        return res.status(404).send({ msg: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "error" });
  } finally {
    await client.close();
  }
}
