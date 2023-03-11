import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "./AddProductForm";
import axios from "axios";

function App() {
  const ADD_PRODUCT_FORM_URL = import.meta.env.BASE_URL + "/products";

  const onSubmit: SubmitHandler<AddProduct> = async (event) => {
    console.log("submit", event);

    try {
      await axios.post(ADD_PRODUCT_FORM_URL, {
        name: event.name,
        description: event.description,
        coverImage: event.coverImage, // TODO: handle file upload
        price: event.price,
      });
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
