<template>
  <div class="sequence-bar-container">
    <ul class="series-list-wrapper">
      <li v-for="series in seriesList" :key="series.seriesNumber">
        <a href="javascript:void(0)">
          <div class="series-item"></div>
        </a>
        <span class="series-info">{{series.seriesDescription}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      seriesList: 'common/seriesList'
    })
  },
  watch: {
    seriesList(val) {
      console.log('seriesList..', val);

      this.$nextTick(v => {
        const seriesItems = document.querySelectorAll('.series-list-wrapper .series-item')
        console.log('seriesItems...', seriesItems, seriesItems.length);

        seriesItems && seriesItems.forEach((itemElement, i) => {
          cornerstone.enable(itemElement)
          // Have cornerstone load the thumbnail image
          cornerstone.loadAndCacheImage(this.seriesList[i].imageIds[0]).then(image => {
            // if (stack.seriesIndex === 0) {
            //   $(seriesElement).addClass('active')
            // }
            // Display the image
            cornerstone.displayImage(itemElement, image)
            // $(seriesElement).draggable({
            //   helper: 'clone'
            // })
          })
        })
      })
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.sequence-bar-container {
  background: #333;
  height: 100px;
  .series-list-wrapper {
    display: flex;
    align-content: center;
    li {
      padding: 5px;
    }
    .series-item {
      width: 80px;
      height: 80px;
    }
    .series-info {
      font-size: 12px;
    }
  }
}
</style>
