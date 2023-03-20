import axios from "axios";
import { useForm } from "react-hook-form";
import { Navbar } from "../molecules/Navbar";

function SubscribeForm() {
  const { register, handleSubmit } = useForm<{ contact: string }>();

  const onSubmit = async (data: { contact: string }) => {
    console.log(data);

    try {
      const URL = import.meta.env.VITE_API_URL + "/subscribe";
      await axios.post(URL, data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className="inline sm:block lg:inline xl:block">
            Want product news and updates?
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
              {...(register("contact"), { required: true })}
              id="contact"
              name="contact"
              type="contact"
              autoComplete="contact"
              required
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="Enter your npub or email address"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-gray-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Subscribe
            </button>
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
          A place to discover and share great products
        </h2>
      </div>
      <SubscribeForm />
    </>
  );
};

export default Home;
