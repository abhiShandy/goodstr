import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { SubmitHandler, useForm } from "react-hook-form";

export type AddProduct = {
  title: string;
  description: string;
  image: FileList;
  asset: FileList;
  /**
   * Nostr private key
   * - should start with nsec
   */
  nsec: string;
};

export default function AddProductForm({
  onSubmit,
  isLoading = false,
}: {
  onSubmit: SubmitHandler<AddProduct>;
  isLoading: boolean;
}) {
  const { register, handleSubmit } = useForm<AddProduct>();

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Add a product to sell
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <input
                  {...register("title", {
                    required: true,
                    disabled: isLoading,
                  })}
                  type="text"
                  id="title"
                  autoComplete="title"
                  className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Give a catchy name to your product.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  {...register("description", {
                    required: true,
                    disabled: isLoading,
                  })}
                  id="description"
                  rows={3}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about the product.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center ">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 hover:text-gray-500"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image"
                        {...register("image", {
                          required: true,
                          disabled: isLoading,
                        })}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        size={1024 * 1024}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPEG up to 1 MB</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Make your product stand out with a great thumbnail.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="asset"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Downloadable assets
              </label>
              <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <ArrowUpTrayIcon className="h-10 w-10 p-1 mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="asset"
                      className="cursor-pointer rounded-md bg-white font-medium text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 hover:text-gray-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="asset"
                        {...register("asset", {
                          required: true,
                          disabled: isLoading,
                        })}
                        type="file"
                        accept="image/*, application/pdf, application/zip"
                        className="sr-only"
                        size={1024 * 1024 * 10}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPEG, PDF or ZIP up to 10 MB
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Combine multiple files into a ZIP file.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="nsec"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                NOSTR private key
              </label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <input
                  type="text"
                  {...register("nsec", {
                    required: true,
                    disabled: isLoading,
                  })}
                  id="nsec"
                  autoComplete="nsec"
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  placeholder="nsec..."
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Prove that you are the seller of this product.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <input
            value={isLoading ? "Uploading ..." : "Add"}
            disabled={isLoading}
            type="submit"
            className={
              "ml-3 inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" +
              (isLoading ? " bg-gray-400" : " bg-gray-600 hover:bg-gray-500")
            }
          />
        </div>
      </div>
    </form>
  );
}
