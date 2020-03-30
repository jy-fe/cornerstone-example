<template>
  <div class="left-aside-container">
    <ul class="nidus-list">
      <li v-for="item in allNidusList" :key="item.id" class="nidus-item">{{ `${item.type}-${item.id}` }}</li>
    </ul>
    {{ allNidusList }}
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
      allNidusList: 'common/allNidusList'
    })
  },
  methods: {}
}
</script>

<style lang="less">
.left-aside-container {
  height: 100%;
  overflow: hidden;
  background-color: #051d2e;
  .nidus-list {
    height: 100%;
    overflow-y: auto;
    .nidus-item {
      color: #fff;
      white-space: nowrap;
      padding: 5px 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>
