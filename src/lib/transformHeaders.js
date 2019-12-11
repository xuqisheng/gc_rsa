import _ from "lodash";
export default obj => {
  //不加入签名 需要排除的数组
  const excludes = [
    "X-Gw-Signature",
    "X-Gw-Signature-headers",
    "Accept",
    "Content-MD5",
    "Content-Type",
    "Date"
  ];
  let transformHeader = "",
    transformHeaderKeys = "",
    first = true;

  _.chain(obj)
    .keys(obj)
    .map(value => {
      return (
        //排除上面的已经存在的各种header
        !_.includes(excludes, value) && {
          value: obj[value],
          key: _.toLower(value)
        }
      );
    })
    .compact()
    .sortBy(value => {
      return value.key;
    })
    .forEach(item => {
      transformHeader += `${item["key"]}:${item["value"]}\n`;
      if (first) {
        transformHeaderKeys += item["key"];
      } else {
        transformHeaderKeys += "," + item["key"];
      }
      first = false;
    })
    .value();
  return { transformHeader, transformHeaderKeys };
};
