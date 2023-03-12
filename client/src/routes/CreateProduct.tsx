import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "../lib/AddProductForm";
import axios from "axios";
import { Navbar } from "../lib/Navbar";

export const CreateProduct = () => {
  const onSubmit: SubmitHandler<AddProduct> = async (event) => {
    try {
      const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products";

      const reader = new FileReader();
      reader.onload = async function (fileReaderEvent) {
        const result = fileReaderEvent.target?.result as string;
        const base64str = result.replace(/^data:image\/(png|jpeg);base64,/, "");
        await axios.post(PRODUCTS_URL, {
          name: event.name,
          description: event.description,
          images: [
            {
              type: event.image[0].type,
              data: base64str,
            },
          ],
          price: Number(event.price),
        });
      };
      reader.readAsDataURL(event.image[0]);
    } catch (e) {
      console.error("post-error", e);
    }
  };

  return (
    <>
      <Navbar currentPage="add-product" />
      <div className="max-w-lg mx-auto mt-8 px-4">
        <AddProductForm onSubmit={onSubmit} />
      </div>
    </>
  );
};
