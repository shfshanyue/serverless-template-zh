# Tencent Koa Typescript

对于稍微大型的 Node 应用，`typescript` 已经是标配，它为 `javascript` 提供了强类型的铠甲，有效提高了代码质量。

这里是一个结合 `ts` 及 `koa` 快速部署到腾讯云函数计算中的模板。

## 快速使用

使用本模板快速创建应用

``` bash
$ serverless install --url https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-koa-ts --name koa-server
```

在项目创建早期尽可能对 package 进行升级，这里使用了 `npm-check-updates`

``` bash
$ npm run ncu
```

在测试环境中进行开发

``` bash
$ npm run dev
```

### 文件结构

``` bash
.
├── dist/               # 编译文件，及最终需要上传的目录
├── node_modules/
├── app.ts              # 入口文件，必须采用 app 的命名
├── package.json
├── package-lock.json
├── Readme.md
├── serverless.yaml     # serverless 配置文件
└── tsconfig.json
```

### serverless component

`serverless component` 可以认为是把 faas 及 baas 资源集合的进一步抽象，该项目采用了 `@serverless/tencent-koa`

``` yaml
koa-app:
  component: sls-component-http
  inputs:
    region: ap-guangzhou
    functionName: koa-function
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
$ npm install typescript

# 编译成 js
$ npm run build

$ npm ci --production

# 部署到腾讯云
$ sls
koa-function [████████████████████████████████████████] 100% | ETA: 0s | Speed: 314.98k/

  koa-app:
    functionName:        koa-function
    functionOutputs:
      ap-guangzhou:
        Name:        koa-function
        Runtime:     Nodejs10.15
        Handler:     serverless-handler.handler
        MemorySize:  128
        Timeout:     60
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a function created by serverless component
    region:              ap-guangzhou
    apiGatewayServiceId: service-dture22u
    url:                 https://service-dture22u-1257314149.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  11s › koa-app › done
```

从日志可以看出，部署到腾讯云只需 11s，还是很快速

## Http 调用

``` bash
$ curl https://service-dture22u-1257314149.gz.apigw.tencentcs.com/release/
hello, path: '/'# 
```
