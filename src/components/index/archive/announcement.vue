<template>
  <div class="announcement">
    <div>
      <span :class="{click:clickT==null}" @click="clickType(null)">推荐</span>
      <span :class="{click:clickT==articleType.value}" v-for="(articleType) in articleTypes" @click="clickType(articleType.value)">{{articleType.label}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index-announcement',
    data() {
      return {
        clickT: null,
        articleTypes: this.$store.state.option.articleType
      }
    },
    props: {},
    methods: {
      clickType(data) {
        this.clickT = data
        this.$emit('clicktype', data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/sass/variables';
  @import '../../../assets/sass/mixins';

  .announcement {
    height: 3.2em;
    line-height: 3.2em;
    font-size: 1.1em;
    margin-bottom: 1em;
    overflow: hidden;
    position: relative;
    background-color: $module-bg;
    span {
      cursor: pointer;
      color: #666666;
      font-family: DINRegular, CenturyGothic;
      padding: 1em;
      &:hover {
        color: #0088f5;
      }
      &.click {
        color: #0088f5;
      }
    }
  }
</style>
