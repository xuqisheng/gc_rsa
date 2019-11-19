# 说明

gc_rsa 是用于加密前端请求的库。

## 使用方式

1. 安装

```bash
npm install gc_rsa
```

2. 在入口文件中引入

```javascript
import gc_rsa from "gc_rsa";

gc_rsa({
  appkey: "124",
  appsecret: "345"
});
```

## 参数说明

| 参数名    | 参数说明     | 默认值     |
| --------- | ------------ | ---------- |
| appkey    | app 唯一标识 | 25396816   |
| appsecret | app 秘钥     | 联系管理员 |

## 相关文档

[rsa 加密文档](https://cf.ihotel.cn/pages/viewpage.action?pageId=24840611)
