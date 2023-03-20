import { SubmitHandler, useForm } from "react-hook-form";

export type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormValues>;
};

export type LoginFormValues = {
  nostrkey: string;
};

export default function LoginForm(props: LoginFormProps) {
  const { handleSubmit, register } = useForm<LoginFormValues>();
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-md"> */}
        {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=600"
            alt="Your Company"
          /> */}
        {/* <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2> */}
        {/* </div> */}

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(props.onSubmit)}>
              <div>
                <label
                  htmlFor="nostrkey"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nostr key
                </label>
                <div className="mt-2">
                  <input
                    {...(register("nostrkey"), { required: true })}
                    id="nostrkey"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-xs text-gray-500 mt-1 ml-2">
                    private key for full access
                    <br />
                    public key for read-only access
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            {/* <p className="text-center mt-4 text-sm">OR</p>
            <div className="mt-4">
              <button className="flex w-full justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                Generate
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
