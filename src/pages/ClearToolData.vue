<template>
  <div>
    <div class="page-header">
      <h1>
        Tool Management
      </h1>
      <p>
        This page demonstrates how to clear single or multiple tool states
      </p>
      <a href="../index.html">Go back to the Examples page</a>
    </div>

    <br />

    <div class="row">
      <div class="col-xs-2">
        <ul class="list-group">
          <a href="#" id="enableLength" class="list-group-item">Length</a>
          <a href="#" id="probe" class="list-group-item">Probe</a>
        </ul>
        <br />
        <ul class="list-group">
          <a href="#" id="clearLengthData" class="list-group-item">Clear length data</a>
          <a href="#" id="clearToolData" class="list-group-item">Clear all tool data</a>
        </ul>
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
    this.init()
  },
  methods: {
    init() {
      const element = this.element

      const imageId = this.imageId

      // image enable the dicomImage element
      cornerstone.enable(element)
      cornerstone.loadImage(imageId).then(function(image) {
        cornerstone.displayImage(element, image)
        cornerstoneTools.mouseInput.enable(element)

        // Enable all tools we want to use with this element
        cornerstoneTools.length.activate(element, 1)
        cornerstoneTools.probe.enable(element)

        activate('#enableLength')

        function activate(id) {
          $('a').removeClass('active')
          $(id).addClass('active')
        }
        // helper function used by the tool button handlers to disable the active tool
        // before making a new tool active
        function disableAllTools() {
          cornerstoneTools.probe.deactivate(element, 1)
          cornerstoneTools.length.deactivate(element, 1)
        }

        // Tool button event handlers that set the new active tool
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

        $('#clearLengthData').click(function() {
          cornerstoneTools.clearToolState(element, 'length')
          cornerstone.updateImage(element)
        })

        $('#clearToolData').click(function() {
          const toolStateManager = cornerstoneTools.getElementToolStateManager(element)
          // Note that this only works on ImageId-specific tool state managers (for now)
          toolStateManager.clear(element)
          cornerstone.updateImage(element)
        })
      })
    }
  }
}
</script>

<style></style>
