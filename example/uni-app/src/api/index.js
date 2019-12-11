import fly from "flyio";

const getIndex = () => {
  const url = "http://gw.ihotel.cn/guardian";
  // const url = "http://192.168.2.176:2222";
  return fly.get(url + "/s/weather?city=呼伦贝尔&b=ddd");
};

export default {
  getIndex
};
