import _ from "lodash";

export default (req, responseCallback) => {
  fetch(req.url, req)
    .then(response => response.json())
    .then(res => {
      responseCallback({ statusCode: 200, responseText: res });
    });
};
