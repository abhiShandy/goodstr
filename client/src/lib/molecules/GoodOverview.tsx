import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Npub from "../atoms/Npub";

export type Good = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  publisher: { npub: string };
};

export default function GoodOverview({
  good,
  downloads,
  onDownload,
}: {
  good: Good | null;
  downloads?: number;
  onDownload: () => void;
}) {
  if (!good) return <div className="text-center mt-16">No good found</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Good details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {good.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Good information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                <Npub npub={good.publisher.npub} />
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{good.description}</p>
            </div>
          </section>
        </div>

        {/* Good image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img
              src={good.imageSrc}
              alt={good.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <div className="mt-4">
              <button
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                onClick={onDownload}
              >
                Download for free
                <ArrowDownTrayIcon className="h-5 w-5 ml-2" strokeWidth={2} />
              </button>
              {!!downloads && (
                <p className="text-sm text-gray-600 text-right py-1">
                  <span className="font-semibold">{downloads}</span>{" "}
                  <span className="font-thin">downloads</span>
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
