import * as secp from "@noble/secp256k1";

export const publishTextMessage = async (
  pubkey: string,
  privkey: string,
  content: string
) => {
  const created_at = parseFloat((Date.now() / 1000).toFixed(0));
  const kind = 1; // text note
  const tags = [
    ["e", ""],
    ["p", ""],
  ];

  const event = [0, pubkey, created_at, kind, tags, content];
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(JSON.stringify(event))
  );
  const id = secp.utils.bytesToHex(new Uint8Array(digest));
  const rawsig = await secp.schnorr.sign(id, privkey);
  const sig = secp.utils.bytesToHex(rawsig);

  const ws = new WebSocket("wss://nostr.thegoodstr.com");
  ws.onopen = () => {
    ws.send(
      JSON.stringify([
        "EVENT",
        {
          id,
          pubkey,
          created_at,
          kind,
          content,
          tags,
          sig,
        },
      ])
    );
    console.log("sent!");
  };
  ws.onmessage = (event) => {
    console.log(event.data);
  };
  ws.onclose = () => {
    console.log("closed");
  };
  ws.onerror = () => {
    console.log("error");
  };
};

export const requestMessages = async (pubkey: string) => {
  const ws = new WebSocket("wss://nostr.thegoodstr.com");
  const subid = crypto.randomUUID();
  ws.onopen = () => {
    ws.send(
      JSON.stringify([
        "REQ",
        subid,
        {
          authors: [pubkey],
          kinds: [1],
          limit: 10,
        },
      ])
    );
    console.log("sent!");
  };
  ws.onmessage = (event) => {
    console.log(event.data);
  };
  ws.onclose = () => {
    console.log("closed");
  };
  ws.onerror = () => {
    console.log("error");
  };
};
