<template>
  <div class="index">
    <div class="index-header flex">
      <h1>index</h1>
    </div>
  </div>
</template>
<script>

export default {
  name: 'index',
  created () {
  },
  data () {
    return {}
  },
  methods: {
    goPath (name) {
      this.$router.push({name})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';

.flex {
  display: flex;
  align-items: center;
}

.index {
  &-header {
    padding: 1rem 0;
    border-top: 0.05rem solid #000;
    width: 100%;
    background-color: @header-dark;
    justify-content: space-around;
    &-box {
      flex: 1;
      color: white;
      img {
        width: 50%;
      }
      p {
        font-size: 1.4rem;
      }
    }
  }

  &-func {
    flex-wrap: wrap;
    border-top: 1px solid #F1F1F1;
    &-box {
      padding-top: 1rem;
      min-width: 25%;
      width: 25%;
      box-sizing: border-box;
      background: #fff;
      border-right: 1px solid #F1F1F1;
      &:after {
        padding-top: 1rem;
        display: block;
        content: '';
        border-bottom: 1px solid #F1F1F1;
      }
      img {
        width: 36%;
      }
    }
  }
}

</style>
