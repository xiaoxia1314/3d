<template>
  <div>
    首页
    <div>
      <v-calendar @choseDay="choseDay"></v-calendar>
    </div>
    <div>进度条的刻度</div>
    <div class="timeSliderWrap">
      <div class="timeSlider">
        <input id="timeSlider" type="text">
      </div>
      <div class="timeSearch">
        <el-input
          type="text"
          placeholder="00"
          :maxlength="2"
          @blur="validateHours"
          v-model="inputHour"
          class="inputHour"
        ></el-input>:
        <el-input
          placeholder="00"
          @blur="validateMin"
          maxlength="2"
          type="text"
          v-model="inputMin"
          class="inputMin"
        ></el-input>:
        <el-input
          placeholder="00"
          @blur="validateSecond"
          maxlength="2"
          type="text"
          v-model="inputSecond"
          class="inputSecond"
        ></el-input>
        <el-button type="primary" class="locationBtn" @click="clickLocation">定位</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "../../components/calendar/calendar";
export default {
  data() {
    return {
      timeSlider: "", // 时间拖动条实例
      timeSliderData: "", // 时间拖动组件实例数据
      sliderFromValue: "", // 滑动模块的时间
      startTime: "", // 开始时间
      inputHour: "00",
      inputMin: "00",
      inputSecond: "00"
    };
  },
  components: {
    "v-calendar": calendar
  },
  mounted() {
    this.initTimeSlider();
  },
  methods: {
    choseDay(data) {
      let date111 = this.format(new Date(data), "yyyy-MM-dd");
    },
    // 时间定位
    clickLocation() {
      var that = this;
      var inputTime =
        this.inputHour + ":" + this.inputMin + ":" + this.inputSecond;
      var sliderFromArray = this.sliderFromValue.split(" ");
      sliderFromArray[1] = inputTime;
      this.sliderFromValue = sliderFromArray.join(" ");

      console.log(this.sliderFromValue);
      this.timeSliderData.update({
        from: +moment(that.sliderFromValue).format("X")
      });

      // // 时间定位到，并开始回放
      // this.startPlayBack()
    },
    // 初始化时间拖动组件
    initTimeSlider() {
      var that = this;
      var nowDate = moment().format("L");
      this.startTime = moment(nowDate).format("YYYY-MM-DD HH:mm:ss");
      this.endTime = moment(nowDate)
        .add(1, "days")
        .subtract(1, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");
      console.log(this.startTime, this.endTime);

      this.timeSlider = $("#timeSlider");
      this.timeSlider.ionRangeSlider({
        type: "single",
        keyboard: true,
        grid: true,
        min: +moment()
          .subtract(1, "days")
          .format("X"),
        max: +moment()
          .subtract(1, "seconds")
          .format("X"),
        from: +moment()
          .subtract(12, "hours")
          .format("X"),
        prettify: function(num) {
          return moment(num, "X").format("YYYY-MM-DD HH:mm:ss");
        },
        onStart: function(data) {
          that.sliderFromValue = data.from_pretty;
        },
        onChange: function(data) {
          //  console.log('change')
          if (that.sliderTimer) {
            // 先清除
            clearInterval(that.sliderTimer);
          }
          that.sliderFromValue = data.from_pretty;
        },
        onFinish: function(data) {
          that.sliderFromValue = data.from_pretty;
          console.log("播放状态：", that.playStatus);
          if (that.playStatus === true) {
            if (moment(that.channelBeginTime) > moment(data.from_pretty)) {
              that.sliderFromValue = that.channelBeginTime;
            }
            that.startPlayBack();
          }
        },
        onUpdate: function(data) {
          that.sliderFromValue = data.from_pretty;
        }
      });

      this.updateNowMessage(); // 保存当前窗口数据

      this.timeSliderData = this.timeSlider.data("ionRangeSlider");
      this.timeSliderData.update({
        min: +moment(that.startTime).format("X"),
        max: +moment(that.endTime).format("X"),
        from: +moment(that.sliderFromValue).format("X")
      });
    },
    // 初始化/保存当前窗口的数据
    updateNowMessage() {
      var playBackOption = {
        startTime: this.startTime,
        endTime: this.endTime,
        nowTime: this.channelBeginTime,
        channelId: this.channelId,
        playStatus: false, // 播放状态
        playSpeed: 0 // 播放速度
      };
      // if(this.playBackArray[this.wndIndex]) {
      //     this.startTime = this.playBackArray[this.wndIndex].startTime
      //     this.endTime = this.playBackArray[this.wndIndex].endTime
      //     this.sliderFromValue = this.playBackArray[this.wndIndex].nowTime
      //     this.playStatus = this.playBackArray[this.wndIndex].playStatus
      //     this.playSpeed = this.playBackArray[this.wndIndex].playSpeed
      // } else {
      //     this.playBackArray[this.wndIndex] = playBackOption
      //     this.startTime = this.playBackArray[this.wndIndex].startTime
      //     this.endTime = this.playBackArray[this.wndIndex].endTime
      //     if(this.channelBeginTime) {
      //         this.sliderFromValue = this.channelBeginTime
      //     } else {
      //         this.sliderFromValue = new Date()
      //     }
      //     this.playStatus = this.playBackArray[this.wndIndex].playStatus
      //     this.playSpeed = this.playBackArray[this.wndIndex].playSpeed
      // }
    },
    // 验证小时
    validateHours() {
      var that = this;
      if (!/^[0-1][0-9]|2[0-3]*$/.test(that.inputHour)) {
        if (/^[0-9]*$/.test(that.inputHour) && that.inputHour < 10) {
          that.inputHour = "0" + that.inputHour;
        } else {
          that.inputHour = "00";
        }
      }
    },
    // 验证分钟
    validateMin() {
      var that = this;
      if (!/^[0-5][0-9]*$/.test(that.inputMin)) {
        if (/^[0-9]*$/.test(that.inputMin) && that.inputMin < 10) {
          that.inputMin = "0" + that.inputMin;
        } else {
          that.inputMin = "00";
        }
      } else {
        if (/^[0-5]*$/.test(that.inputMin) && that.inputMin < 6) {
          that.inputMin = "0" + that.inputMin;
        }
      }
    },
    // 验证秒
    validateSecond() {
      var that = this;
      if (!/^[0-5][0-9]*$/.test(that.inputSecond)) {
        if (/^[0-9]*$/.test(that.inputSecond) && that.inputSecond < 10) {
          that.inputSecond = "0" + that.inputSecond;
        } else {
          that.inputSecond = "00";
        }
      } else {
        if (/^[0-5]*$/.test(that.inputSecond) && that.inputSecond < 6) {
          that.inputSecond = "0" + that.inputSecond;
        }
      }
    },
    // 转换为yyyy-MM-dd HH:mm:ss格式
    format(time, format) {
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;
          case "MM":
            return tf(t.getMonth() + 1);
            break;
          case "mm":
            return tf(t.getMinutes());
            break;
          case "dd":
            return tf(t.getDate());
            break;
          case "HH":
            return tf(t.getHours());
            break;
          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.timeSliderWrap {
  width: 100%;
  height: 84px;
  padding: 12px;
  box-sizing: border-box;
  margin-top: 1%;
  .timeSlider {
    display: inline-block;
    vertical-align: top;
    width: 72%;
    height: 100%;
    margin-right: 2%;
    background-color: #000;
  }
  .timeSearch {
    display: inline-block;
    vertical-align: top;
    width: 26%;
    height: 100%;
    .el-input {
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin: 0 2%;
      .el-input__inner {
        padding: 0 7px;
      }
    }
    .locationBtn {
      width: 96px;
      height: 36px;
      color: #fff;
      background: #005f8f !important;
      border: none;
      margin-top: 12px;
      margin-left: 2%;
    }
  }
  .js-grid-text-0 {
    margin-left: 0 !important;
  }
  .js-grid-text-4 {
    left: auto !important;
    right: 0 !important;
  }
}
</style>