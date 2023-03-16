import MongoClient from "./utils/mongo";
import nanoid from "./utils/nanoid";

class User {
  id: string;
  store: { id: string };
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = "user_" + nanoid();
    this.store.id = nanoid(6);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async create() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection("users")
        .insertOne({
          id: this.id,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        });
      console.log("Inserted user: ", res.insertedId);
    } catch (err) {
      console.error("Error inserting user: ", err);
    }
  }
}

export default User;
