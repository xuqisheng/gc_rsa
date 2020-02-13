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

//普通示例
gc_rsa({
  appkey: "123",
  appsecret: "345",
});

//网站示例
gc_rsa({
  appkey: "123",
  appsecret: "345",
  adapter:"fly"
});

//微信小程序示例
gc_rsa({
  appkey: "123",
  appsecret: "345",
  engineType:"fly", //如果使用了fly作为请求库
  adapter:"wx"
});

//uniapp示例
gc_rsa({
  appkey: "123",
  appsecret: "345",
  engineType:"fly",
  adapter:"uni"
});
```

## 不执行校验

方法1:在请求头里面加入noSign跳过签名用以避免未知错误

```json
  headers: {
    "noSign": true
  }
```

方法2:在配置中注入exclude

```javascript
gc_rsa({
  appkey: "25396816",
  appsecret: "ba09305bef13bf8c17ace9987c66326f",
  exclude: ["unReadNum"] //排除路径
});

```

## 参数说明

| 参数名     | 参数说明                      | 默认值     |
| ---------- | ----------------------------- | ---------- |
| appkey     | app 唯一标识                  | 25396816   |
| appsecret  | app 秘钥                      | 联系管理员 |
| engineType | 是否使用了fly作为底层请求库   | 无         |
| adapter    | 请求适配器,转换成预期的请求库 | fetch      |

### engineType

| 可选值         | 参数说明        | 是否默认 |
| -------------- | --------------- | -------- |
| XMLHttpRequest | 默认            | 是       |
| fly            | 如果使用了fly库 | 否       |

### adapter

| 参数名 | 参数说明                                                           | 默认值 |
| ------ | ------------------------------------------------------------------ | ------ |
| fly    | 使用fly发送请求，在未使用fly的程序中使用,与{ engineType:fly}互斥   | 否     |
| wx     | 使用wx底层发送请求，小程序里面需要配合 { engineType:fly} 进行设置  | 否     |
| uni    | 使用uni底层发送请求，小程序里面需要配合 { engineType:fly} 进行设置 | 否     |

## 相关文档

[rsa 加密文档](https://cf.ihotel.cn/pages/viewpage.action?pageId=24840611)
