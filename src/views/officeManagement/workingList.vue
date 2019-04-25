<template>
  <div class="workingList">
    <transition name="slide" enter-active-class="animated slideInLeft"
                leave-active-class="animated slideOutLeft"
                :duration="1000">
        <div class="leftWrap" v-show='showLeft'>

        </div>
     </transition>
    <transition name="slide" enter-active-class="animated slideInRight"
                leave-active-class="animated slideOutRight"
                :duration="1000">
        <div class="rightWrap" v-show="showRight">
        </div>
    </transition>
    <div class="toggleLeft" :class="{'leftShow': !showLeft}" @click="toggleShowLeft"></div>
    <div class="toggleRight" :class="{'rightShow': !showRight}" @click="toggleShowRight"></div>
  </div>
</template>

<script>
export default {
  name: 'workingList',
  data () {
    return {
      showRight: false,
      showLeft: true
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    toggleShowLeft () {
      this.showLeft = !this.showLeft
    },
    toggleShowRight () {
      this.showRight = !this.showRight
    }
  }
}
</script>
<style lang="scss">
@import '../../style/common.scss';
  .workingList {
    position: relative;
    width: 100%;
    .leftWrap {
      display: inline-block;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 255px;
      height: 956px;
      background: url('../../assets/images/left-background.png') no-repeat;
    }
    .rightWrap {
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 0px;
      width: 255px;
      height: 956px;
      background: url('../../assets/images/right-background.png') no-repeat;
    }
    .toggleLeft {
      display: inline-block;
      position: absolute;
      left: 254px;
      top: 84px;
      width: 50px;
      height: 624px;
      background: url('../../assets/images/toggleLeft.png') no-repeat;
      cursor: pointer;
      transition: all 1s;
      &.leftShow {
        left: 0px;
        transition: all 1s;
      }
    }
    .toggleRight {
      display: inline-block;
      position: absolute;
      right: 254px;
      top: 84px;
      width: 50px;
      height: 624px;
      background: url('../../assets/images/toggleRight.png') no-repeat;
      cursor: pointer;
      transition: all 1s;
      &.rightShow {
        right: 0px;
        transition: all 1s;
      }
    }
  }
</style>
