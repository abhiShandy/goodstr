export const PrimaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      {props.children}
    </button>
  );
};

export const SecondaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      type="button"
      className="inline-flex rounded bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-purple-50"
      {...props}
    >
      {props.children}
    </button>
  );
};
