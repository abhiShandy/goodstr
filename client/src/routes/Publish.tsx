import { SubmitHandler } from "react-hook-form";
import PublishGoodForm, { PublishGood } from "../lib/molecules/PublishGoodForm";
import { Navbar } from "../lib/molecules/Navbar";
import { useNavigate } from "react-router-dom";
import { createGood } from "./api/goods";
import { getAssetUploadURL, uploadAsset } from "./api/assets";
import { useState } from "react";
import { encodeBytes, publishEvent } from "./utils/nostr";

const Publish = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<PublishGood> = async (event) => {
    try {
      setIsLoading(true);

      const { url, key } = await getAssetUploadURL();

      await uploadAsset(url, event.asset[0]);

      const thumbnailReader = new FileReader();
      thumbnailReader.onload = async function (fileReaderEvent) {
        const result = fileReaderEvent.target?.result as string;

        const base64str = result.replace(/^data:image\/(png|jpeg);base64,/, "");

        try {
          // @ts-ignore
          if (!window.nostr) {
            alert("Nostr not initialized");
            return;
          }

          // @ts-ignore
          const pubkey = await window.nostr.getPublicKey();

          const npub = encodeBytes("npub", pubkey);

          const goodId = await createGood({
            good: {
              title: event.title,
              description: event.description,
              assetKey: key,
              npub,
            },
            images: [
              {
                type: event.image[0].type,
                base64str,
              },
            ],
          });

          const unsignedEvent = {
            created_at: Math.trunc(Date.now() / 1000),
            kind: 1,
            tags: [],
            content:
              `Checkout my new good on GoodStr: https://${
                import.meta.env.VITE_STAGE
              }.thegoodstr.com/g/` + goodId,
          };

          // @ts-ignore
          const signedEvent = await window.nostr.signEvent(unsignedEvent);
          await publishEvent(signedEvent);
          navigate("/discover");
        } catch (e) {
          console.error("sign-error", e);
        }
      };
      thumbnailReader.readAsDataURL(event.image[0]);
    } catch (e) {
      console.error("post-error", e);
      alert("Error creating good");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar currentPage="publish" />
      <div className="max-w-lg mx-auto mt-8 p-4">
        <PublishGoodForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Publish;
