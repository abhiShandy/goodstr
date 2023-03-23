import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navbar } from "../molecules/Navbar";

function SubscribeForm() {
  type FormValues = {
    contact: string;
  };
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const URL = import.meta.env.VITE_BASE_URL + "/subscribe";
      await axios.post(URL, data);
      alert("Subscribed!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">
            Want good news and updates?
          </h2>{" "}
          <p className="inline sm:block lg:inline xl:block">
            Sign up for latest updates.
          </p>
        </div>
        <form
          className="w-full max-w-md lg:col-span-5 lg:pt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-x-4">
            <label htmlFor="contact" className="sr-only">
              npub or email address
            </label>
            <input
              {...register("contact", { required: true })}
              id="contact"
              type="text"
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="Enter your npub or email address"
            />
            <input
              type="submit"
              className="flex-none rounded-md bg-gray-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              value="Subscribe"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl text-center py-24 sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          GoodStr
        </h1>
        <h2 className="mt-6 text-lg leading-8 text-gray-600">
          A place to discover and publish great digital goods
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 px-8">
          <a
            href="/discover"
            className="rounded-md bg-gray-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Discover goods
          </a>
          <a
            href="/publish"
            className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Publish a good
          </a>
        </div>
      </div>
      <SubscribeForm />
    </>
  );
};

export default Home;
