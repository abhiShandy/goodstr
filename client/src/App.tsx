import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "./AddProductForm";
import axios from "axios";

function App() {
  const onSubmit: SubmitHandler<AddProduct> = async (event) => {
    try {
      const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products";

      const reader = new FileReader();
      reader.onload = async function (fileReaderEvent) {
        await axios.post(PRODUCTS_URL, {
          name: event.name,
          description: event.description,
          coverImage: fileReaderEvent.target?.result,
          price: event.price,
        });
      };
      reader.readAsBinaryString(event.coverImage[0]);
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
