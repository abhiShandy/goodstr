import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "../lib/molecules/AddProductForm";
import { Navbar } from "../lib/molecules/Navbar";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createProduct } from "./api/products";
import { getAssetUploadURL, uploadAsset } from "./api/assets";
import { useState } from "react";
import { nsecToNpub } from "./utils/nostr";

export const CreateProduct = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const mutateProduct = useMutation(createProduct, {
    onSuccess: () => {
      navigate("/discover");
    },
    onError: () => {
      alert("Error creating product");
    },
  });

  const onSubmit: SubmitHandler<AddProduct> = async (event) => {
    try {
      setIsLoading(true);

      const { url, key } = await getAssetUploadURL();

      await uploadAsset(url, event.asset[0]);

      const thumbnailReader = new FileReader();
      thumbnailReader.onload = async function (fileReaderEvent) {
        const result = fileReaderEvent.target?.result as string;

        const base64str = result.replace(/^data:image\/(png|jpeg);base64,/, "");

        mutateProduct.mutate({
          product: {
            title: event.title,
            description: event.description,
            assetKey: key,
            npub: event.npub,
          },
          images: [
            {
              type: event.image[0].type,
              base64str,
            },
          ],
        });
      };
      thumbnailReader.readAsDataURL(event.image[0]);
    } catch (e) {
      console.error("post-error", e);
      alert("Error creating product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar currentPage="sell" />
      <div className="max-w-lg mx-auto mt-8 p-4">
        <AddProductForm
          onSubmit={onSubmit}
          isLoading={mutateProduct.isLoading || isLoading}
        />
      </div>
    </>
  );
};
