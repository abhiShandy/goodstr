import nanoid from "./utils/nanoid";
import MongoClient from "./utils/mongo";
import Image from "./Image";

export type GoodFields = {
  id: string;
  title: string;
  description: string;
  images: Image[];
  publisher: {
    npub: string;
  };
  asset: {
    s3Key: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

class Good {
  id: string;
  title: string;
  description: string;
  images: Image[];
  publisher: {
    npub: string;
  };
  asset: {
    s3Key: string;
  };
  createdAt: Date;
  updatedAt: Date;

  constructor({
    title,
    description,
    images,
    npub,
    assetKey,
  }: {
    title: string;
    description: string;
    images: Image[];
    npub: string;
    assetKey: string;
  }) {
    this.id = nanoid();
    this.title = title;
    this.description = description;
    this.images = images;
    this.publisher = { npub };
    this.asset = { s3Key: assetKey };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async create() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<GoodFields>("goods")
        .insertOne({
          id: this.id,
          title: this.title,
          description: this.description,
          images: this.images,
          publisher: this.publisher,
          asset: this.asset,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        });
      console.log("Inserted good: ", res.insertedId);
    } catch (err) {
      console.error("Error inserting good: ", err);
    }
  }

  static async list() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<GoodFields>("goods")
        .find({}, { limit: 12, sort: { createdAt: -1 } })
        .toArray();
      console.log("Found goods: ", res.length);
      return res;
    } catch (err) {
      console.error("Error finding goods: ", err);
      return [];
    }
  }

  static async retrieve(id: string) {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<GoodFields>("goods")
        .findOne({ id });
      console.log("Found good: ", res);
      return res;
    } catch (err) {
      console.error("Error finding good: ", err);
      return null;
    }
  }

  static async incrementDownloads(id: string): Promise<void> {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<{ id: string; downloads: number }>("good-downloads")
        .findOneAndUpdate({ id }, { $inc: { downloads: 1 } }, { upsert: true });
    } catch (err) {
      console.error("Error incrementing downloads: ", err);
    }
  }

  static async getDownloads(id: string): Promise<number> {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<{ id: string; downloads: number }>("good-downloads")
        .findOne({ id });
      return res?.downloads || 0;
    } catch (err) {
      console.error("Error getting downloads: ", err);
      return 0;
    }
  }
}

export default Good;
