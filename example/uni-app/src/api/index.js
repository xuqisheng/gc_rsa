import fly from "flyio";

const getIndex = () => {
  return fly.get("http://gw.ihotel.cn/guardian/s/weather?city=呼伦贝尔&b=ddd");
};

export default {
  getIndex
};
