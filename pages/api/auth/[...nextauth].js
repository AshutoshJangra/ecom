import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
const mongodbURI =
  "mongodb+srv://admin:test@ecommerce.yvyofkp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const authOptions = {
//   debug: true,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        const { email, password } = credentials;
        try {
          await client.connect();
          const db =client.db("ecommerce");
          console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
          );

          const collection = db.collection("users");
          const user = await collection.findOne({ email });

          if (user && user.password === password) {
            console.log("if use esucces");
            // Return user object if credentials are valid
            return user;
          } else {
            console.log("if use not esucces");

            // Return null if credentials are invalid
            return null;
          }
        } catch (error) {
          console.log(error);
        } finally {
          await client.close();
        }

        // Validate the email and password against your MongoDB collection
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: "hey",
  database: mongodbURI,
  // Providers: [
  //   CredentialsProvider({
  //     name: 'Email',
  //     credentials: {
  //       email: { label: 'Email', type: 'text' },
  //       password: { label: 'Password', type: 'password' },
  //     },
  //     authorize: async (credentials) => {
  //       const { email, password } = credentials;
  //       const { db } = await connectToDatabase();

  //       // Validate the email and password against your MongoDB collection
  //       const user = await db.collection('users').findOne({ email });
  //       if (user && user.password === password) {
  //         // Return user object if credentials are valid
  //         return Promise.resolve(user);
  //       } else {
  //         // Return null if credentials are invalid
  //         return Promise.resolve(null);
  //       }
  //     },
  //   }),
  // ],
};

export default NextAuth(authOptions);
