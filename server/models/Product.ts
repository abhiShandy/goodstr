import nanoid from "./utils/nanoid";
import MongoClient from "./utils/mongo";
import Image from "./Image";

export type ProductFields = {
  id: string;
  title: string;
  description: string;
  images: Image[];
  seller: {
    npub: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

class Product {
  id: string;
  title: string;
  description: string;
  images: Image[];
  seller: {
    npub: string;
  };
  createdAt: Date;
  updatedAt: Date;

  constructor({
    title,
    description,
    images,
    npub,
  }: {
    title: string;
    description: string;
    images: Image[];
    npub: string;
  }) {
    this.id = "prod_" + nanoid();
    this.title = title;
    this.description = description;
    this.images = images;
    this.seller = { npub };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async create() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<ProductFields>("products")
        .insertOne({
          id: this.id,
          title: this.title,
          description: this.description,
          images: this.images,
          seller: this.seller,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        });
      console.log("Inserted product: ", res.insertedId);
    } catch (err) {
      console.error("Error inserting product: ", err);
    }
  }

  static async list() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<ProductFields>("products")
        .find({}, { limit: 12, sort: { createdAt: -1 } })
        .toArray();
      console.log("Found products: ", res.length);
      return res;
    } catch (err) {
      console.error("Error finding products: ", err);
      return [];
    }
  }

  static async retrieve(id: string) {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection<ProductFields>("products")
        .findOne({ id });
      console.log("Found product: ", res);
      return res;
    } catch (err) {
      console.error("Error finding product: ", err);
      return null;
    }
  }
}

export default Product;
