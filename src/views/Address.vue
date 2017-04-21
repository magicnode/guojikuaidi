<template>
  <div class="address">
    <mj-header title="地址管理"></mj-header>
    <div class="address-container">
      <div class="address-container-add flex" @click="goPath('/address/add')">
        <div>
          <img src="../assets/images/add_ico_add.png" class="">
          <span>添加地址</span>
        </div>
        <div>
          <img src="../assets/images/add_ico_arr.png" class="">
        </div>
      </div>

      <div class="address-container-list">
        <p class="address-container-list__intro">寄件地址:</p>
        <div class="address-container-list__item">
          <div class="flex address-container-list__item--info">
            <div>
              <p>张子锐 15751158939</p>
              <p class="location">上海市上海市长宁区绥宁路998</p>
            </div>
           <img src="../assets/images/add_ico_del.png" alt="">
          </div>
          <div class="flex address-container-list__item--func flex">
            <span class="is-default">
              <img src="../assets/images/sen_btn_che.png" alt="">
              <span>默认地址</span>
            </span>
            <span class="edit">
              <img src="../assets/images/add_ico_cha.png" alt="">
              <span>编辑</span>
            </span>
          </div>
        </div>

        <p class="address-container-list__intro">收件地址:</p>
        <div class="address-container-list__item">
          <div class="flex address-container-list__item--info">
            <div>
              <p>吴聪 1561565156</p>
              <p class="location">上海市上海市长宁区绥宁路156</p>
            </div>
           <img src="../assets/images/add_ico_del.png" alt="">
          </div>
          <div class="flex address-container-list__item--func flex">
            <span class="not-default">
              <img src="../assets/images/add_ico_nor.png" alt="">
              <span>默认地址</span>
            </span>
            <span class="edit">
              <img src="../assets/images/add_ico_cha.png" alt="">
              <span>编辑</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'address',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    goPath (path) {
      this.$router.push({path})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.address {
  min-height: 100vh;
  background-color: @bg-grey;
  &-container {
    &-add {
      justify-content: space-between;
      background: white;
      padding: 1rem;
      div {
        flex: 1;
        img {
          vertical-align: middle;
        }
        &:first-child {
          text-align: left;
          span {
            padding-left: .6rem;
            font-size: 1.6rem;
          }
          img {
            width: 3rem;
          }
        }
        &:last-child {
          text-align: right;
          img {
            width: 1rem;
          }
        }
      }
    }

    &-list {
      margin-top: 2rem;
      &__intro {
        padding: 1rem;
        padding-top: 0;
        font-size:1.4rem;
        text-align: left;
      }
      &__item {
        margin-bottom: 2rem;
        background: white;
        .padding {
          padding: 1rem;
        }
        &--info {
          justify-content: space-between;
          border-bottom: 1px solid #f1f1f1;
          .padding;
          .location {
            color: #999;
          }
          p {
            text-align: left;
            font-size: 1.6rem;
          }
          img {
            width: 2rem;
          }
        }

        &--func {
          font-size: 1.2rem;
          justify-content: space-between;
          .padding;
          .edit {
            img {
              width: 1.2rem;
              vertical-align: middle;
            }
          }
          .is-default {
            color: #ff6d40;
            img {
              width: 1.2rem;
              vertical-align: text-top;
              *vertical-align: middle;
              font-size: 0;
            }
          }
          .not-default {
            color: #999;
            img {
              width: 1.2rem;
              vertical-align: text-top;
              *vertical-align: middle;
              font-size: 0;
            }
          }
        }
      }
    }
  }
}
</style>
