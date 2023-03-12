import nanoid from "./utils/nanoid";
import MongoClient from "./utils/mongo";

export type Image = {
  s3Key: string;
  type: string;
};

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  seller: {
    id: string;
    name: string;
  };

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
  }

  async create() {
    try {
      const mongoClient = await MongoClient();
      const res = await mongoClient
        .db("thegoodstr")
        .collection("products")
        .insertOne({
          id: this.id,
          name: this.name,
          description: this.description,
          price: this.price,
          images: this.images,
          seller: this.seller,
        });
      console.log("Inserted product: ", res.insertedId);
    } catch (err) {
      console.error("Error inserting product: ", err);
    }
  }
}
