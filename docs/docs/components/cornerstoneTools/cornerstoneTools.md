# Cornerstone Tools 介绍

---

### Cornerstone Tools 介绍

Cornerstone Tools 是一个 JavaScript 库，它帮助对医学图像进行注释、分段和测量。这个库还提供了一个框架，用于创建新的工具，以一致的、内聚的方式管理所有工具，以及导入/导出工具度量数据。

这个库不是独立的。它建立在 Cornerstone 之上;一个标准兼容、快速和可扩展的 JavaScript 库，用于显示交互式医疗图像。

依赖关系

| 依赖 | 目标 | 选择 |
| --- | --- | --- |
| Hammer.js | 增加了对触摸事件和手势的跨浏览器支持 | N/A |
| Cornerstone Math | 一些工具用于辅助向量数学或其他复杂操作的依赖项 | N/A |
| Cornerstone (Core) | 渲染我们的图像，并提供有用的事件和方法，以使工具响应视口变化成为可能 | N/A |
| Cornerstone Web Image Loader | 增加从 http 或 https url“获取”PNG / JPEG 图像的能力。存在其他图像加载器，用于将 NIFTI 或 DICOM 图像加载到 Cornerstone 中 | CornerstoneWADOImageLoader (DICOM) / CornerstoneNIFTIImageLoader (NIFTI) |
| debug | 一个小型的 JavaScript 调试工具，模仿 Node.js 核心的调试技术。工作在 Node.js 和 web 浏览器。 | N/A |

::: demo

```html
<template>
  <div>
    <Breadcrumb></Breadcrumb>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
```

:::
