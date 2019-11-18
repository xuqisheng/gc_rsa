import _ from "lodash";
export default obj => {
  //不加入签名 需要排除的数组
  const excludes = [
    "x-gw-signature",
    "x-gw-signature-headers",
    "accept",
    "content-md5",
    "content-type",
    "date"
  ];
  let transformHeader = "";
  let transformHeaderKeys = "";
  let first = true;
  //转化生成签名headers
  _.map(_.sortBy(_.keys(obj)), key => {
    let lowerKey = _.toLower(key);
    if (_.indexOf(excludes, lowerKey) == -1) {
      transformHeader += `${lowerKey}:${obj[key]}\n`;
      if (first) {
        transformHeaderKeys += lowerKey;
      } else {
        transformHeaderKeys += "," + lowerKey;
      }
      first = false;
    }
  });
  return { transformHeader, transformHeaderKeys };
};
