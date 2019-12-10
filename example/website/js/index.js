// // 普遍get
// $.ajax({
//   url: "/guardian/s/weather?city=呼伦贝尔&b=ddd",
//   method: "get",
//   data: { A: "a" },
//   headers: {
//     //请求头
//     Aaa: "bbb",
//     ccc: "dddd"
//   }
// }).then(res => {
//   console.log("================res====================");
//   console.log(res);
//   console.log("====================================");
// });

// $.ajax({
//   type: "POST",
//   dataType: "json",
//   contentType: "application/json",
//   data: { a: "b" },
//   url: "/guardian/s/weather?city=呼伦贝尔",
//   success: function(json, textStatus, xhr) {
//     console.log(json);
//   },
//   error: function(xhr, textStatus, errorThrown) {}
// });

// // 普通json

// axios({
//   url: "/guardian/s/weather?city=呼伦贝尔",
//   method: "post",
//   data: JSON.stringify({ a: "b" }),
//   headers: {
//     //请求头
//     test: "test",
//     "Content-Type": "application/json"
//   }
// });
// axios({
//   url: "/guardian/s/weather?city=呼伦贝尔",
//   method: "post",
//   data: { a: "b" },
//   headers: {
//     //请求头
//     test: "test"
//   }
// });
// form;
// axios({
//   url: "/guardian/s/weather?city=呼伦贝尔&city=22&A=fff&a=2&g=7&z=ddd",
//   method: "post",
//   data: { a: "b" },
//   headers: {
//     //请求头
//     test: "test",
//     Aaa: "bbb",
//     "Content-Type": "application/x-www-form-urlencoded"
//   }
// });
// $.ajax({
//   type: "POST",
//   dataType: "json",
//   contentType: "application/json",
//   data: { a: "b" },
//   url: "/guardian/s/weather?city=呼伦贝尔",
//   success: function(json, textStatus, xhr) {
//     console.log(json);
//   },
//   error: function(xhr, textStatus, errorThrown) {}
// });
