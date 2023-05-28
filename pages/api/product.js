import { MongoClient } from "mongodb";

const mongodbURI =
  "mongodb+srv://admin:test@ecommerce.yvyofkp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const data = {
  name: "Fireboltt talkultra",
  category:'Smartwatch',
  new:false,
  price: "20",
  href: "#",
  breadcrumbs: [{ id: 1, name: "SMARTWATCHES", href: "#" }],
  images: [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYq6xE91cr3Juia-Q1O1iChpGCr8Tu2H2vAi2XL2AhVNDNkXg0icFsVOI774s-36Yoe8&usqp=CAU",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0137/0292/2286/products/talk-ultra-black_1.png?v=1674559036",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0137/0292/2286/products/talk-ultra-black_1.png?v=1674559036",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZG-KjmQzfd5pjgDtAXxOg0nv7Ru_hDX280b7fd3TxFOJ-oPANnJnu1ACuBoaNtaiw3-o&usqp=CAU",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  // sizes: [{name:"1.3", inStock:True },{name:"1.4", inStock: true}],
  description:
    "It features an IP68 rating for dust and water resistance. Fire-Boltt Talk Ultra smartwatch features built-in games",
  highlights: [
    "circular",
    "Silicon Strap",
    " 1.39 Inch",
    "240 x 240 pixels",
    "Water proof",
    "Receive call",
  ],
  details: " Sign up for our subscription service and be the first to get new",
};

export default async function handler(req, res) {
  try {
    // const db =await connectToDatabase();
    await client.connect();
    const db = client.db("ecommerce");

    switch (req.method) {
      case "POST":
        try {
          const collection = db.collection("products");
          const product = await collection.insertOne({ ...data });

          if (product) {
            return res.status(200).send({ msg: "success" });
          } else {
            return res.status(404).send({ msg: "error" });
          }
        } catch (error) {
          console.log(error);
        }
        break;

      case "GET":
        try {
          const collection = db.collection("products");

          const { name, product, newp } = req.query;
          console.log("name ", name, "product ", product);
          let products;
          if (name) {
            products = await collection.find({ category: name }).toArray();
          } else if (product) {
            products = await collection.findOne({ name: product });
          } else if (newp) {
            products = await collection.find({ new: true }).toArray();
          } else {
            products = await collection.find({}).toArray();
          }
          console.log("ASdasdasdasd");

          if (products) {
            return res.status(200).send({ msg: "success", data: products });
          } else {
            return res.status(404).send({ msg: "error" });
          }
        } catch (error) {
          console.log(error);
        }
        break;
    }
  } catch (error) {
    console.log(error);
  } finally {
    // await closeDatabaseConnection();
    await client.close()
  }
}
