import _ from "lodash";
import fly from "flyio";
import urlTool from "url";
import qs from "querystring";
import EngineWrapper from "flyio/dist/npm/engine-wrapper";
import sort from "../lib/sort";
import crypto from "../lib/crypto";
import transformHeaders from "../lib/transformHeaders";
const FormHeader = "application/x-www-form-urlencoded";
// 切换fly engine为真正的XMLHttpRequest
fly.engine = XMLHttpRequest;
var engine = EngineWrapper(function(request, responseCallback) {
  try {
    const { method, headers, url } = request;
    const { Accept } = headers;

    const urlParsed = urlTool.parse(url, true),
      queryObject = urlParsed.query;
    let contentMD5 = "",
      query = qs.stringify(sort(queryObject));
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
    const ContentType = headers["Content-Type"] ? headers["Content-Type"] : "";

    headers["X-Gw-Key"] = "25396816";
    headers["X-Gw-Timestamp"] = _.now();
    headers["X-Gw-Nonce"] = _.random(1000000000000, 9999999999999);

    const stringToSign = `${method}\n${Accept}\n${contentMD5}\n${ContentType}\n\n${
      transformHeaders(headers).transformHeader
    }${decodeURIComponent(urlPath)}`;
    fly.config.headers = {
      "X-Gw-Signature": crypto.sign(
        stringToSign,
        "ba09305bef13bf8c17ace9987c66326f"
      ),
      "X-Gw-Signature-Headers": transformHeaders(headers).transformHeaderKeys
    };
  } catch (error) {
    console.log("error", error);
  }
  // //发起真正的ajax请求
  fly
    .request(request.url, request.data, request)
    .then(res => {
      responseCallback({
        statusCode: res.engine.status,
        responseText: res.engine.responseText,
        statusMessage: res.engine.statusText
      });
    })
    .catch(err => {
      responseCallback({
        statusCode: err.status,
        statusMessage: err.message
      });
    });
});
//覆盖默认
XMLHttpRequest = engine;
