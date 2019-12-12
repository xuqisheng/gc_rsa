import fly from "flyio";

export default (request, responseCallback) => {
  fly
    .request(request.url, request.data, request)
    .then(function(d) {
      responseCallback({
        statusCode: d.engine.status,
        responseText: d.engine.responseText,
        statusMessage: d.engine.statusText
      });
    })
    .catch(function(err) {
      responseCallback({
        statusCode: err.status,
        statusMessage: err.message
      });
    });
};
