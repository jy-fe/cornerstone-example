<template>
  <div class="container all-imageTools-container">
    <div class="page-header">
      <h1>
        All Image Tools Example
      </h1>
      <p>
        This page contains an example of all image tools
      </p>
      <a href="../index.html">Go back to the Examples page</a>
    </div>

    <br />

    <div class="row">
      <div class="col-xs-2">
        <ul class="list-group">
          <a id="enableWindowLevelTool" class="list-group-item">WW/WC</a>
          <a id="pan" class="list-group-item">Pan</a>
          <a id="zoom" class="list-group-item">Zoom</a>
          <a id="enableLength" class="list-group-item">Length</a>
          <a id="probe" class="list-group-item">Probe</a>
          <a id="circleroi" class="list-group-item">Elliptical ROI</a>
          <a id="rectangleroi" class="list-group-item">Rectangle ROI</a>
          <a id="angle" class="list-group-item">Angle</a>
          <a id="highlight" class="list-group-item">Highlight</a>
          <a id="freehand" class="list-group-item">Freeform ROI</a>
        </ul>
        <div class="checkbox">
          <label><input type="checkbox" id="chkshadow" />Apply shadow</label>
        </div>
        <br />
      </div>
      <div class="col-xs-10">
        <div
          style="width:512px;height:512px;position:relative;display:inline-block;color:white;"
          oncontextmenu="return false"
          class="cornerstone-enabled-image"
          unselectable="on"
          onselectstart="return false;"
          onmousedown="return false;"
        >
          <div id="dicomImage" style="width:512px;height:512px;top:0px;left:0px; position:absolute;"></div>
          <div id="mrtopleft" style="position: absolute;top:3px; left:3px">
            Patient Name
          </div>
          <div id="mrtopright" style="position: absolute;top:3px; right:3px">
            Hospital
          </div>
          <div id="mrbottomright" style="position: absolute;bottom:3px; right:3px">
            Zoom:
          </div>
          <div id="mrbottomleft" style="position: absolute;bottom:3px; left:3px">
            WW/WC:
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      element: null,
      imageId: 'example://1'
    }
  },
  mounted() {
    const element = (this.element = $('#dicomImage').get(0))
    $(element).on('CornerstoneImageRendered', this.onViewportUpdated)
    this.init()
  },
  methods: {
    onViewportUpdated(e) {
      const viewport = cornerstone.getViewport(e.target)
      $('#mrbottomleft').text('WW/WC: ' + Math.round(viewport.voi.windowWidth) + '/' + Math.round(viewport.voi.windowCenter))
      $('#mrbottomright').text('Zoom: ' + viewport.scale.toFixed(2))
    },
    init() {
      const element = this.element
      const imageId = this.imageId

      const config = {
        // invert: true,
        minScale: 0.25,
        maxScale: 20.0,
        preventZoomOutsideImage: true
      }

      // cornerstoneTools.zoom.setConfiguration(config);

      $('#chkshadow').on('change', function() {
        cornerstoneTools.length.setConfiguration({ shadow: this.checked })
        cornerstoneTools.angle.setConfiguration({ shadow: this.checked })
        cornerstone.updateImage(element)
      })

      // image enable the dicomImage element
      cornerstone.enable(element)
      cornerstone.loadImage(imageId).then(function(image) {
        cornerstone.displayImage(element, image)
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

        activate('#enableWindowLevelTool')

        function activate(id) {
          $('a').removeClass('active')
          $(id).addClass('active')
        }
        // helper function used by the tool button handlers to disable the active tool
        // before making a new tool active
        function disableAllTools() {
          cornerstoneTools.wwwc.disable(element)
          cornerstoneTools.pan.activate(element, 2) // 2 is middle mouse button
          cornerstoneTools.zoom.activate(element, 4) // 4 is right mouse button
          cornerstoneTools.probe.deactivate(element, 1)
          cornerstoneTools.length.deactivate(element, 1)
          cornerstoneTools.ellipticalRoi.deactivate(element, 1)
          cornerstoneTools.rectangleRoi.deactivate(element, 1)
          cornerstoneTools.angle.deactivate(element, 1)
          cornerstoneTools.highlight.deactivate(element, 1)
          cornerstoneTools.freehand.deactivate(element, 1)
        }

        // Tool button event handlers that set the new active tool
        $('#enableWindowLevelTool').click(function() {
          activate('#enableWindowLevelTool')
          disableAllTools()
          cornerstoneTools.wwwc.activate(element, 1)
        })
        $('#pan').click(function() {
          activate('#pan')
          disableAllTools()
          cornerstoneTools.pan.activate(element, 3) // 3 means left mouse button and middle mouse button
        })
        $('#zoom').click(function() {
          activate('#zoom')
          disableAllTools()
          cornerstoneTools.zoom.activate(element, 5) // 5 means left mouse button and right mouse button
        })
        $('#enableLength').click(function() {
          activate('#enableLength')
          disableAllTools()
          cornerstoneTools.length.activate(element, 1)
        })
        $('#probe').click(function() {
          activate('#probe')
          disableAllTools()
          cornerstoneTools.probe.activate(element, 1)
        })
        $('#circleroi').click(function() {
          activate('#circleroi')
          disableAllTools()
          cornerstoneTools.ellipticalRoi.activate(element, 1)
        })
        $('#rectangleroi').click(function() {
          activate('#rectangleroi')
          disableAllTools()
          cornerstoneTools.rectangleRoi.activate(element, 1)
        })
        $('#angle').click(function() {
          activate('#angle')
          disableAllTools()
          cornerstoneTools.angle.activate(element, 1)
        })
        $('#highlight').click(function() {
          activate('#highlight')
          disableAllTools()
          cornerstoneTools.highlight.activate(element, 1)
        })
        $('#freehand').click(function() {
          activate('#freehand')
          disableAllTools()
          cornerstoneTools.freehand.activate(element, 1)
        })
      })
    }
  }
}
</script>

<style lang="less">
.all-imageTools-container {
}
</style>
