<template>
  <el-container class="all-tools-example-container">
    <el-header class="header-container">
      <ToolsBar element-id="dicomImage" />
    </el-header>
    <el-container class="body-container">
      <el-aside class="left-aside">
        <left-aside> </left-aside>
      </el-aside>
      <el-main class="main-content">
        <div class="dicom-image-container">
          <div id="dicomImage"></div>
          <div id="mrbottomright" style="position: absolute;bottom:3px; right:3px;color: #fff;">Zoom:</div>
          <div id="mrbottomleft" style="position: absolute;bottom:3px; left:3px;color: #fff;">WW/WC:</div>
        </div>
        <sequence-bar></sequence-bar>
      </el-main>
      <el-aside class="right-aside">right Aside</el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ToolsBar from './ToolsBar'
import LeftAside from './LeftAside'
import SequenceBar from './SequenceBar'
import { storage } from '@/utils'
export default {
  name: 'AllToolsExample',
  components: {
    ToolsBar,
    LeftAside,
    SequenceBar
  },
  data() {
    return {
      cachDrawDataList: []
    }
  },
  computed: {
    ...mapGetters({
      nidusDataList: 'common/nidusDataList'
    })
  },
  mounted() {
    console.log('nidusDataList......', this.nidusDataList)

    const element = document.getElementById('dicomImage')
    cornerstone.enable(element)
    let url = 'example://1'
    // url = 'myImageLoader:http://proximatest.cn-sh2.ufileos.com/dr/1.2.826.0.1.3680043.2.461.10017634.3205212670/1.3.12.2.1107.5.1.4.73757.30000018052307572844700041984/JPG/000001.jpg?UCloudPublicKey=TOKEN_a239136a-222a-471d-9eaa-e57b4df6f4ca&Expires=&Signature=nZbywL0VsYeHeHWiscC4WUXSYaY%3D'
    this.loadAndViewImage(url)
  },
  methods: {
    //当点击加载图像时 调用 loadAndViewImage 加载 Dicom 图像
    loadAndViewImage(imageId) {
      const element = document.getElementById('dicomImage')
      const axialStack1 = {
        currentImageIdIndex: 0,
        imageIds: ['example://2', 'example://3'],
        preventCache: true
      }

      cornerstone.loadAndCacheImage(imageId).then(image => {
        const viewport = cornerstone.getDefaultViewportForImage(element, image)
        cornerstone.displayImage(element, image, viewport)

        cornerstoneTools.addStackStateManager(element, ['stack'])
        cornerstoneTools.addToolState(element, 'stack', axialStack1)

        cornerstoneTools.mouseInput.enable(element) //鼠标按下事件
        cornerstoneTools.mouseWheelInput.enable(element) //鼠标滚轮事件
        cornerstoneTools.touchInput.enable(element) //手势事件
        // Enable all tools we want to use with this element
        cornerstoneTools.wwwc.activate(element, 1) // ww/wc is the default tool for left mouse button
        cornerstoneTools.pan.activate(element, 2) // pan is the default tool for middle mouse button
        cornerstoneTools.zoom.activate(element, 4) // zoom is the default tool for right mouse button
        cornerstoneTools.zoomWheel.activate(element) // zoom is the default tool for middle mouse wheel
        cornerstoneTools.probe.enable(element)
        cornerstoneTools.length.enable(element)
        cornerstoneTools.ellipticalRoi.enable(element)
        cornerstoneTools.rectangleRoi.enable(element)
        cornerstoneTools.angle.enable(element)
        cornerstoneTools.highlight.enable(element)

        this.initData(element)
      })

      element.addEventListener('cornerstoneimagerendered', this.cornerstoneimagerendered)
      element.addEventListener('cornerstonetoolsmeasurementmodified', this.cornerstonetoolsmeasurementmodified)
      element.addEventListener('cornerstonetoolsmouseup', this.cornerstonetoolsmouseup)
    },
    initData(element) {
      const nidusList = this.nidusDataList

      nidusList &&
        nidusList.forEach(v => {
          const { type, data } = v
          data &&
            data.forEach(o => {
              console.log('rectangleRoi...', o)
              cornerstoneTools.addToolState(element, type, o.handleData)
            })
          // switch (type) {
          //   case 'rectangleRoi':
          //     data.forEach(o => {
          //       console.log('rectangleRoi...', o)
          //       cornerstoneTools.addToolState(element, 'rectangleRoi', o.handleData)
          //     })
          //     break
          //   default:
          //     break
          // }
        })
    },
    // 图片渲染
    cornerstoneimagerendered(e) {
      console.log('cornerstoneimagerendered.....', e)
      var viewport = cornerstone.getViewport(e.target)
      document.getElementById('mrbottomleft').textContent = 'WW/WC: ' + Math.round(viewport.voi.windowWidth) + '/' + Math.round(viewport.voi.windowCenter)
      document.getElementById('mrbottomright').textContent = 'Zoom: ' + viewport.scale.toFixed(2)
    },
    // 画病灶时
    cornerstonetoolsmeasurementmodified(e) {
      console.log('cornerstonetoolsmeasurementmodified...1', e)
      const data = {
        type: e.detail.toolType,
        id: '',
        handleData: e.detail.measurementData
      }
      this.cachDrawDataList.push(data)
    },
    // 鼠标离开时
    cornerstonetoolsmouseup(e) {
      console.log('cornerstonetoolsmouseup...1', e)
      const list = this.cachDrawDataList
      console.log('this.cachDrawDataList...', this.cachDrawDataList)
      if (!list.length) return
      const type = list[0].type // 类型
      this.$store.dispatch('common/addNidus', list[list.length - 1]) // 添加数据

      this.cachDrawDataList = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.all-tools-example-container {
  display: flex;
  height: 100%;
  background-color: #051d2e;
  .header-container {
    height: 61px !important;
    padding: 0;
    border-bottom: 1px solid #53646d;
  }

  .body-container {
    height: 100%;
    flex: 1;
    height: '~(cala(100% - 60px))';
  }

  .main-content {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    .dicom-image-container {
      flex: 1;
    }
  }
  #dicomImage {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    // line-height: 200px;
  }
  .left-aside {
    width: 200px !important;
  }
  .right-aside {
    width: 200px !important;
    background-color: #051d2e;
  }
  .body-container {
    flex: 1;
    width: '~(cala(100% - 400px))';
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 0px;
  }
}
</style>
