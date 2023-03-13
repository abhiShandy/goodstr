import nanoid from "./utils/nanoid";
import MongoClient from "./utils/mongo";
import Image from "./Image";

export type ProductFields = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  seller: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  seller: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;

  constructor({
    name,
    description,
    price,
    images,
    seller,
  }: {
    name: string;
    description: string;
    price: number;
    images: Image[];
    seller: {
      id: string;
      name: string;
    };
  }) {
    this.id = "prod_" + nanoid();
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.seller = seller;
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
          name: this.name,
          description: this.description,
          price: this.price,
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
        .find({}, { limit: 12 })
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
