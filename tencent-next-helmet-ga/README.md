# Tencent Next for SEO

本示例结合 `next` 及 `ga`/`sso` 及 `typescript` 快速部署到腾讯云函数计算中。

可以直接点击以下链接查看效果：

+ now: <https://serverless-template-zh.now.sh/>
+ tencent: <https://service-r8i140rq-1257314149.gz.apigw.tencentcs.com/>

## 缺点

1. 部署过慢，node_modules 过大导致
1. 对于 SSR 项目，所有的静态资源相关的依赖可视为 devDep，对于这类库可以不上传，目前是全部上传
1. 在本地不支持 `log` 及 `metrics`，需要转至腾讯云控制台查看

## 快速使用

使用本模板快速创建应用

``` bash
$ serverless install --url https://github.com/shfshanyue/serverless-template-zh/tree/master/tencent-next-helmet-ga --name next-app
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
├── node_modules/
├── pages/                  # 所有的 pages
├── utils/
├── package.json
├── package-lock.json
├── README.md
└── serverless.yaml
```

### serverless component

`serverless component` 可以认为是把 faas 及 baas 资源集合的进一步抽象，该项目采用了 `@serverless/tencent-next`

``` yaml
next-app:
  component: '@serverless/tencent-nextjs'
  inputs:
    functionName: nextjs-function
    region: ap-guangzhou
    runtime: Nodejs10.15
    code: ./
    functionConf:
      timeout: 60
      memorySize: 128
    environment:
      variables:
        ENV: true
    apigatewayConf:
      protocols:
        - http
        - https
      environment: release
```

## 部署

部署之前需要准备好生产环境所需的 `node_modules` 以及编译完成的 js 资源。

``` bash
# 编译静态文件
$ npm run build

# 部署到腾讯云
$ sls
 next-app:
    functionName:        nextjs-function
    functionOutputs:
      ap-guangzhou:
        Name:        nextjs-function
        Runtime:     Nodejs10.15
        Handler:     serverless-handler.handler
        MemorySize:  128
        Timeout:     60
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a function created by serverless component
    region:              ap-guangzhou
    apiGatewayServiceId: service-r8i140rq
    url:                 https://service-r8i140rq-1257314149.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  240s › next-app › done
```

此时网站部署在了 `https://service-r8i140rq-1257314149.gz.apigw.tencentcs.com/release/`，可通过访问连接直接查看效果

从日志可以看出，部署到腾讯云需要使用 4 分钟，而且仅是一个 `hello, world`，如果对于部署速度有所追求的话，可以使用 `now`，仅需要 3s 就可以部署成功，我也坚信各大厂商的 serverless 对 next.js 的部署可以做到相同数量级的部署速度。`now` 以及 `next` 均处于一家公司旗下，对于 `next` 的部署有很大程度的优化
