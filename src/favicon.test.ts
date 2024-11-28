import { describe, expect, test } from "vitest";
import { getFavicon } from "./favicon";

describe("favicon", () => {
  test("douban ", async () => {
    const uri: string = await getFavicon("https://www.baidu.com/");
    console.log(uri);
    expect(uri).toBe('https://img1.doubanio.com/favicon.ico');
  });
});
