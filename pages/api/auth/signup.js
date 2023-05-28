import { MongoClient } from "mongodb";

const mongodbURI =
  "mongodb+srv://admin:test@ecommerce.yvyofkp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongodbURI, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


export default async function handler(req,res){
    if(req.method !== "POST"){
        res.status(405).send({msg: "Only POST request allowed !"})
    } 

    const {name , email , password} = JSON.parse(req.body);
    console.log("name" , JSON.parse(req.body))

    try {
        await client.connect();
        const db = client.db("ecommerce");
         
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
        );

        const collection = db.collection("users");
        const user = await collection.insertOne({ 
            name , email , password 
        });

     
        console.log(name );

        if(user){
            return res.status(200).send({msg : "signup successful"});
        }else{
            return res.status(500).send({msg : "signup not successful"});

        }
        
      } catch (error) {
        console.log(error);
      } finally {
        // await closeDatabaseConnection();
        await client.close();
      }
}