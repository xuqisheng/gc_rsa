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

| 参数名     | 参数说明     | 默认值         |
| ---------- | ------------ | -------------- |
| appkey     | app 唯一标识 | 25396816       |
| appsecret  | app 秘钥     | 联系管理员     |
| engineType | 底层请求库   | XMLHttpRequest |
| adapter    | 请求适配器   | fetch          |

### engineType

| 可选值         | 参数说明        | 是否默认 |
| -------------- | --------------- | -------- |
| XMLHttpRequest | 默认            | 是       |
| fly            | 如果使用了fly库 | 否       |

### adapter

| 参数名 | 参数说明                                                          | 默认值 |
| ------ | ----------------------------------------------------------------- | ------ |
| jquery | 使用jquery发送网络请求，主要用于兼容老浏览器                      | 否     |
| wx     | 使用wx底层发送请求，小程序里面需要配合 { engineType:fly} 进行设置 | 否     |

## 相关文档

[rsa 加密文档](https://cf.ihotel.cn/pages/viewpage.action?pageId=24840611)
