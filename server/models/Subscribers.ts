import { MongoClient } from "./utils";

export type SubscribersFields = {
  contact: string;
};

class Subscribers {
  contact: string;
  constructor(contact: string) {
    this.contact = contact;
  }

  async create() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<SubscribersFields>("subscribers")
        .insertOne({
          contact: this.contact,
        });
      console.log("Inserted a subscriber.", res.insertedId);
    } catch (err) {
      console.error(err);
    }
  }
}

export default Subscribers;
