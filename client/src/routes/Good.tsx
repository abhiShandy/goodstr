import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/molecules/LoadingGrid";
import { Navbar } from "../lib/molecules/Navbar";
import GoodOverview from "../lib/molecules/GoodOverview";
import { getAssetDownloadURL } from "./api/assets";
import { fetchGood, fetchGoodDownloads } from "./api/goods";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Error = ({ message }: { message: string }) => {
  return (
    <>
      <Navbar />
      <div className="mt-16 flex justify-center text-red-600">
        <span>
          <ExclamationTriangleIcon className="h-6  mr-2" />
        </span>
        <span>{message}</span>
      </div>
    </>
  );
};

const Good = () => {
  const goodId = window.location.pathname.split("/")[2];

  const downloadAsset = async () => {
    try {
      const url = await getAssetDownloadURL(goodId);
      window.open(url);
    } catch (e) {
      console.error(e);
      alert("Error downloading asset");
    }
  };

  const {
    data: good,
    error,
    isLoading,
  } = useQuery(goodId, () => fetchGood(goodId));

  const { data: downloads } = useQuery(goodId + "downloads", () =>
    fetchGoodDownloads(goodId)
  );

  if (isLoading)
    return (
      <>
        <Navbar />
        <LoadingGrid centered />
      </>
    );

  if (error)
    return <Error message="Error retrieving information about this good." />;

  if (good)
    return (
      <>
        <Navbar />
        <GoodOverview
          good={good}
          onDownload={downloadAsset}
          downloads={downloads}
        />
      </>
    );

  return <Error message="Good not found." />;
};

export default Good;
