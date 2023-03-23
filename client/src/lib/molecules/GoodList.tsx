import Npub from "../atoms/Npub";

export type Good = {
  id: number;
  title: string;
  publisher: { npub: string };
  imageSrc: string;
  imageAlt: string;
};

export default function GoodList({ goods }: { goods: Good[] }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Goods</h2>

        {goods.length === 0 && (
          <div className="text-center text-lg">No Goods found!</div>
        )}

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {goods.length > 0 &&
            goods.map((good) => (
              <a key={good.id} className="group" href={"/g/" + good.id}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={good.imageSrc}
                    alt={good.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-700">
                  {good.title}
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  <Npub npub={good.publisher.npub} />
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
