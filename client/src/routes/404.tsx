import { Navbar } from "../lib/molecules/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="text-center mt-8">
        <h1 className="text-4xl">Page not found!</h1>
        <a href="/" className="underline">
          Go back to home
        </a>
      </div>
    </>
  );
};

export default NotFound;
