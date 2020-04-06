<template>
  <!-- <ul class="tools-bar">
    <i class="iconfont icon-juxing"></i>
  </ul>-->
  <ul class="tools-bar">
    <a v-for="item in barList" :key="item.id" :id="item.id" class="bar-item" @click="activate(item)">{{ item.icon }}</a>
    <el-button @click="clearAll" style>清空</el-button>
  </ul>
</template>

<script>
export default {
  props: {
    elementId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      element: null,
      // activeMouse: left: 1, middle: 2, right: 4, left and right: 5
      barList: [
        {
          id: 'enableWindowLevelTool',
          type: 'wwwc',
          icon: 'WW/WC',
          activeMouse: 1
        },
        {
          id: 'pan',
          type: 'pan',
          icon: 'Pan',
          activeMouse: 3
        },
        {
          id: 'zoom',
          type: 'zoom',
          icon: 'Zoom',
          activeMouse: 5
        },
        {
          id: 'enableLength',
          type: 'length',
          icon: 'Length',
          activeMouse: 1
        },
        {
          id: 'Probe',
          type: 'probe',
          icon: 'Probe',
          activeMouse: 1
        },
        {
          id: 'ellipticalRoi',
          type: 'ellipticalRoi',
          icon: 'EllipticalRoi',
          activeMouse: 1
        },
        {
          id: 'rectangleRoi',
          type: 'rectangleRoi',
          icon: 'RectangleRoi',
          activeMouse: 1
        },
        {
          id: 'angle',
          type: 'angle',
          icon: 'angle',
          activeMouse: 1
        },
        {
          id: 'highlight',
          type: 'highlight',
          icon: 'Highlight',
          activeMouse: 1
        },
        {
          id: 'freehand',
          type: 'freehand',
          icon: 'Freehand',
          activeMouse: 1
        }
      ]
    }
  },
  mounted() {
    this.element = document.getElementById(`#${this.elementId}`)
  },
  methods: {
    activate({ id, type, activeMouse }) {
      $('.bar-item').removeClass('active')
      $(`#${id}`).addClass('active')
      this.disableAllTools()
      cornerstoneTools[type].activate(this.element, activeMouse)
    },
    disableAllTools() {
      this.barList.forEach(({ type, activeMouse = 1 }) => {
        cornerstoneTools[type] && cornerstoneTools[type].deactivate(this.element, activeMouse)
      })
    },
    clearAll() {
      this.$store.dispatch('common/clearAllData')
      location.reload()
    }
  }
}
</script>

<style lang="less">
.tools-bar {
  display: flex;
  justify-content: left;
  width: 100%;
  height: 60px;
  line-height: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  background-color: #051d2e;
  .bar-item {
    color: #fff;
    line-height: 30px;
    padding: 0 15px;
    margin: 15px 0;
    border-right: 1px solid #eee;
    cursor: pointer;
    &:first-child {
      padding-left: 0;
    }
    &.active {
      color: orange;
    }
  }
}
</style>
