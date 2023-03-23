import * as secp from "@noble/secp256k1";
import { bech32 } from "@scure/base";

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

export const nsecToNpub = (nsec: string) => {
  const { data: privkey } = decode(nsec);
  const pubkey = secp.utils.bytesToHex(secp.schnorr.getPublicKey(privkey));
  return encodeBytes("npub", pubkey);
};

export const decode = (nip19: string) => {
  const { prefix, words } = bech32.decode(nip19);
  let data = new Uint8Array(bech32.fromWords(words));
  switch (prefix) {
    case "nsec":
    case "npub":
      return { type: prefix, data: secp.utils.bytesToHex(data) };
    default:
      throw new Error(`unknown prefix: ${prefix}`);
  }
};

export const encodeBytes = (prefix: string, hex: string): string => {
  let data = secp.utils.hexToBytes(hex);
  let words = bech32.toWords(data);
  return bech32.encode(prefix, words, 5000);
};

export const publishEvent = async (event: any) => {
  const ws = new WebSocket("wss://nostr.thegoodstr.com");
  ws.onopen = () => {
    ws.send(JSON.stringify(["EVENT", event]));
    console.log("NOSTR event sent!");
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
