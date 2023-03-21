import { SubmitHandler } from "react-hook-form";
import AddProductForm, { AddProduct } from "../lib/molecules/AddProductForm";
import axios from "axios";
import { Navbar } from "../lib/molecules/Navbar";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { nsecToNpub } from "./utils/nostr";
import { getS3UploadUrl, uploadAsset } from "./api/products";

export const CreateProduct = () => {
  const navigate = useNavigate();

  type CreateProductInput = {
    product: {
      title: string;
      description: string;
      assetKey: string;
      nsec: string;
    };
    images: [{ type: string; base64str: string }];
  };

  const createProduct = useMutation(
    ({ product, images }: CreateProductInput) => {
      const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products";
      return axios.post(PRODUCTS_URL, {
        title: product.title,
        description: product.description,
        images: [
          {
            type: images[0].type,
            data: images[0].base64str,
          },
        ],
        assetKey: product.assetKey,
        npub: nsecToNpub(product.nsec),
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
      const { url, key } = await getS3UploadUrl();

      await uploadAsset(url, event.asset[0]);

      console.log("Asset uploaded to S3!");

      const thumbnailReader = new FileReader();
      thumbnailReader.onload = async function (fileReaderEvent) {
        const result = fileReaderEvent.target?.result as string;

        const base64str = result.replace(/^data:image\/(png|jpeg);base64,/, "");

        createProduct.mutate({
          product: {
            title: event.title,
            description: event.description,
            assetKey: key,
            nsec: event.nsec,
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
    }
  };

  return (
    <>
      <Navbar currentPage="sell" />
      <div className="max-w-lg mx-auto mt-8 p-4">
        <AddProductForm
          onSubmit={onSubmit}
          isLoading={createProduct.isLoading}
        />
      </div>
      {createProduct.isError && (
        <div className="text-red-500 text-center">error creating product</div>
      )}
    </>
  );
};
