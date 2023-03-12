import nanoid from "./utils/nanoid";

class Image {
  s3Key: string;
  type: string;
  constructor(type: string) {
    this.s3Key = "img_" + nanoid() + "." + type.split("/")[1];
    this.type = type;
  }
}

export default Image;
