export default (req, responseCallback) => {
  fetch(req.url, req)
    .then(response => response.json())
    .then(res => {
      responseCallback(res);
    });
};
