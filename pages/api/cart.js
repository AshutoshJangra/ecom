import { MongoClient ,ObjectId } from "mongodb";

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
          const collection = db.collection("cart");
          const product = await collection.insertOne({ quantity:1,...JSON.parse(req.body) });

          if (product) {
            return res.status(200).send({ msg: "success" });
          } else {
            return res.status(404).send({ msg: "error" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).send({ msg: "error" });
        }
      break

      case "GET":
        try {
          const collection = db.collection("cart");
          const products = await collection.find({ "email": req.query.email }).toArray();

          if (products) {
            return res.status(200).send({ msg: "success", data: products });
          } else {
            return res.status(404).send({ msg: "error" });
          }z
        } catch (error) {
          console.log(error);
          return res.status(500).send({ msg: "error" });
        }
      break

      case "PUT":
      try {
        const { itemId,quantity } = req.body;
        const collection = db.collection("cart");
        const objectId = new ObjectId(itemId);
    
        // Increase the quantity of the item in the database by 1
        const updatedItem = await collection.findOneAndUpdate(
          { _id: objectId },
          { $inc: { quantity: quantity } },
          { returnOriginal: false }
        );
    
        if (updatedItem) {
          return res.status(200).send( updatedItem.value );
        } else {
          return res.status(404).send({ msg: "error", data: null });
        }
      } catch (error) {
        console.error("Failed to update cart item", error);
        res.status(500).json({ error: "Failed to update cart item" });
      }
      break;

      case "DELETE":
        try {
          const { itemId} = req.body;
          console.log("if", req.body)
          const collection = db.collection("cart");
          const objectId = new ObjectId(itemId);
      
          const deletedItem = await collection.deleteOne({ _id: objectId });

          if (deletedItem.deletedCount === 0) {
            return res.status(404).json({ msg: "Item not found" });
          }
      
          return res.status(200).json({ msg: "success", data: deletedItem });
        } catch (error) {
          console.error("Failed to DELETE cart item", error);
          res.status(500).send({ error: "Failed to DELETE cart item" });
        }
        break;
  

      
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
