import { createHmac, createHash } from "crypto-browserify";
import _ from "lodash";

const sign = (str, secret) => {
  return createHmac("sha256", secret)
    .update(str, "utf8")
    .digest("base64");
};

const md5Content = data => {
  return !_.isEmpty(data)
    ? createHash("md5")
        .update(data, "utf-8")
        .digest("base64")
    : "";
};

export default { sign, md5Content };
