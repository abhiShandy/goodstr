import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "../lib/molecules/AddProductForm";
import axios from "axios";
import { Navbar } from "../lib/molecules/Navbar";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { nsecToNpub } from "./utils/nostr";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const mutation = useMutation(
    ({ data, base64str }: { data: AddProduct; base64str: string }) => {
      const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products";
      return axios.post(PRODUCTS_URL, {
        title: data.title,
        description: data.description,
        images: [
          {
            type: data.image[0].type,
            data: base64str,
          },
        ],
        npub: nsecToNpub(data.nsec),
      });
    },
    {
      onSuccess: () => {
        navigate("/discover");
      },
    }
  );

  const onSubmit: SubmitHandler<AddProduct> = async (event) => {
    try {
      const reader = new FileReader();
      reader.onload = async function (fileReaderEvent) {
        const result = fileReaderEvent.target?.result as string;
        const base64str = result.replace(/^data:image\/(png|jpeg);base64,/, "");
        mutation.mutate({ data: event, base64str });
      };
      reader.readAsDataURL(event.image[0]);
    } catch (e) {
      console.error("post-error", e);
    }
  };

  return (
    <>
      <Navbar currentPage="sell" />
      <div className="max-w-lg mx-auto mt-8 px-4">
        <AddProductForm onSubmit={onSubmit} isLoading={mutation.isLoading} />
      </div>
      {mutation.isError && (
        <div className="text-red-500 text-center">error creating product</div>
      )}
    </>
  );
};
