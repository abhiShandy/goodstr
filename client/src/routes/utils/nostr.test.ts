import { describe, it, expect } from "vitest";
import { nsecToNpub } from "./nostr";

describe("nostr-utils", () => {
  it("should convert nsec to npub", () => {
    expect(
      nsecToNpub(
        "nsec16c3v2ddu2ez3vylyn3s0vvyznnuy84wcyk3d0e3y4z862stgm2yqk9qagm"
      )
    ).toBe("npub1vvzv2dmrvp2n30gmysgyxvkkdj8y7fqncrlpxpzjqc356a0ex7dqwgjmu3");
  });
});
