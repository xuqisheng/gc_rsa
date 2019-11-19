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
  let transformHeader = "";
  let transformHeaderKeys = "";
  let first = true;

  const sortObj = _.chain(obj)
    .keys(obj)
    .map(value => {
      return (
        !_.includes(excludes, value) && {
          value: obj[value],
          // value: { [value]: obj[value] },
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
