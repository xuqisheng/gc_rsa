import qs from "qs";
import _ from "lodash";
import urlTool from "url";
import crypto from "./crypto";
import sort from "./sort";
import transformHeaders from "./transformHeaders";

const FormHeader = "application/x-www-form-urlencoded";
const signature = (request, { appkey, appsecret, engineType }) => {
  try {
    if (appkey && appsecret) {
      const { method, headers, url } = request;
      const { Accept } = headers;
      const urlParsed = urlTool.parse(url, true),
        queryObject = urlParsed.query;
    
      let contentMD5 = "",
        query = qs.stringify(sort(queryObject), { strictNullHandling: true });
      console.log("=============query=======================");
      console.log(query);
      console.log('====================================');
      //如果没有content-type 默认加上application/json
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
      //如果不是Form提交 对content签名
      if (request.body && headers["Content-Type"].indexOf(FormHeader) === -1) {
        contentMD5 = crypto.md5Content(request.body);
        headers["Content-MD5"] = contentMD5;
      } else {
        //如果是Form表单提交
        const formObject = request.body;
        if (_.isObject(formObject)) {
          _.map(formObject, (value, key) => {
            queryObject[key] = value;
          });
        }
        if (_.isString(formObject)) {
          query += "&" + formObject;
        }
      }
      const urlPath = _.isEmpty(query)
        ? urlParsed.pathname
        : urlParsed.pathname + "?" + query;
      const ContentType = headers["Content-Type"]
        ? headers["Content-Type"]
        : "";
      headers["X-Gw-Key"] = appkey;
      headers["X-Gw-Timestamp"] = _.now();
      headers["X-Gw-Nonce"] = _.random(1000000000000, 9999999999999);
      const stringToSign = `${method}\n${
        Accept ? Accept : "*/*"
      }\n${contentMD5}\n${ContentType}\n\n${
        transformHeaders(headers).transformHeader
        }${decodeURIComponent(urlPath)}`;
      console.log("==============", urlPath, "======================");
      console.log(stringToSign);
      console.log("==============", urlPath, "======================");
      headers["X-Gw-Signature"] = crypto.sign(stringToSign, appsecret);
      headers["X-Gw-Signature-Headers"] = transformHeaders(
        headers
      ).transformHeaderKeys;

      return request;
    } else {
      console.warn("检查appkey和appsecret");
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default signature;
