# Serveless Framawork Template

毋庸置疑，对 `serverless` 支持最好的云服务厂商是 `aws`，但是为了在国内更快的网络，更快的访问速度，选择国内的云服务上是一个很好的选择。

这里使用国内云服务提供商函数计算作为 serverless framework 示例及模板，你可以当做简单的脚手架，使你更好地使用 `serverless` 在国内快速搭建项目。

## Tencent Koa Typescript

结合 `ts` 及 `koa` 快速部署到腾讯云函数计算中。

### 缺点

部署麻烦，需要先编译 ts 至 js，并且仅上传生产环境需要的 node_modules (全部上传速度过慢)

### 快速使用

``` bash
$ serverless install --url https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-koa-ts --name koa-server
```

## Tencent Next App (ga + sso)

结合 `next` 及 `ga`/`sso` 快速部署到腾讯云函数计算中。

### 缺点

部署慢，因为需要上传整个 node_modules

### 快速使用

``` bash
$ serverless install --url https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-next-helmet-ga --name next-app
```
