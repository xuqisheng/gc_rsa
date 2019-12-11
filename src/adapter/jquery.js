export default (req, responseCallback) => {
  jQuery(req.url, req)
    .then(response => response.json())
    .then(res => {
      responseCallback({ statusCode: 200, responseText: res });
    });
};
