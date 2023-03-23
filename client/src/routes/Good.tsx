import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/molecules/LoadingGrid";
import { Navbar } from "../lib/molecules/Navbar";
import GoodOverview from "../lib/molecules/GoodOverview";
import { getAssetDownloadURL } from "./api/assets";
import { fetchGood, fetchGoodDownloads } from "./api/goods";

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

  if (error) return <div>Something went wrong</div>;

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

  return <div>Something went wrong</div>;
};

export default Good;
