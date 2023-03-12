import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "./AddProductForm";
import axios from "axios";

function App() {
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
          price: event.price,
        });
      };
      reader.readAsDataURL(event.image[0]);
    } catch (e) {
      console.error("post-error", e);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <AddProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default App;
