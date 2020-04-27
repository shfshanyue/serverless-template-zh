# Tencent Simple Http

不积跬步，无以至千里。

在学习如何在 serverless 上部署 `express`，`koa` 或者 `egg` 等框架之前，首先需要熟悉下如何部署一个简单的无依赖的(除 serverless 相关) http server。

## 快速使用

使用本模板快速创建应用，本模板依赖简单，仅仅只有一个 `tencent-simple-http`。

``` bash
$ serverless install --url https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-simple-http --name simple-http
```

### 文件结构

``` bash
.
├── node_modules/
├── index.js
├── package.json
├── package-lock.json
├── Readme.md
└── serverless.yaml
```

## index.js

在该 serverless component，即 [sls-component-http](https://github.com/shfshanyue/serverless-http) 下，它会默认读取 index.js 做为 Application 的入口文件。

``` js
const http = require('http')

const app = (req, res) => {
  res.end('hello, shanyue')
}

http.createServer(app).listen(3000)

module.exports = app
```

假设 Application 位于 `./dist/index.js`，则需要修改 `package.json`

``` json
{
  "main": "dist/index.js"
}
```

### serverless component

`serverless component` 可以认为是把 faas 及 baas 资源集合的进一步抽象，该项目采用了 [sls-component-http](https://github.com/shfshanyue/serverless-http)

``` yaml
simple-http:
  component: sls-component-http
  inputs:
    region: ap-guangzhou
    functionName: simple-http
    runtime: Nodejs10.15
    functionConf:
      timeout: 60
      memorySize: 128
      environment:
        variables:
          TOKEN: token
    apigatewayConf:
      protocols:
        - https
      environment: release
```

## 部署

``` bash
# 装包
$ npm install

# 部署到腾讯云
$ sls
  simple-http: 
    functionName:        simple-http
    functionOutputs: 
      Name:        simple-http
      Runtime:     Nodejs10.15
      Handler:     http-handler.handler
      MemorySize:  128
      Timeout:     60
      Region:      ap-guangzhou
      Namespace:   default
      Description: This is a function created by serverless component
      layers:      (empty array)
    region:              ap-guangzhou
    apiGatewayServiceId: service-jg4cxr1o
    url:                 https://service-jg4cxr1o-1257314149.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  12s › simple-http › done
```

从日志可以看出，部署到腾讯云只需 12s，还是很快速

## Http 调用

``` bash
$ curl https://service-jg4cxr1o-1257314149.gz.apigw.tencentcs.com/release/
hello, shanyue
```
