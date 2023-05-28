import { MongoClient } from "mongodb";

const mongodbURI = "mongodb+srv://admin:test@ecommerce.yvyofkp.mongodb.net/?retryWrites=true&w=majority";

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
          const collection = db.collection("orders");
          const products = req.body; // Assuming req.body is an array of products

          const result = await collection.insertMany(products);

          if (result.insertedCount > 0) {
            return res.status(200).send({ msg: "success" });
          } else {
            return res.status(404).send({ msg: "error" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ msg: "error" });
        }
        break;

        case "GET":
            try {
              const collection = db.collection("orders");
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
    

      // Other cases...

      default:
        return res.status(404).send({ msg: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "error" });
  } finally {
    // await client.close();
  }
}
