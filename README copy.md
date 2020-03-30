# DicomViewVue

> 一个基于 cornerstone.js 解析 Dicom 图像的程序

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

安装 chromedriver 报错解决方案：

```
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriv
```

知识点：
1、如何加载 dcm，单序列、多序列
2、如何切换 dcm，渲染和缓存机制
3、cornerstoneTools 的各个工具的用法
WW/WC
Pan
Zoom
Length
Probe
Elliptical ROI
Rectangle ROI
Angle
Highlight
Freeform ROI
4、如何保存病灶的数据，如何显示现有病灶
