<template>
  <div>
    首页
    <div>
      <v-calendar @choseDay='choseDay'></v-calendar>
    </div>
  </div>
</template>

<script>
import calendar from '../../components/calendar/calendar'
  export default {
    components: {
      'v-calendar': calendar
    },
    methods:{
      choseDay (data) {
        let date111 = this.format(new Date(data), 'yyyy-MM-dd')
      },
      // 转换为yyyy-MM-dd HH:mm:ss格式
      format (time, format) {
        var t = new Date(time)
        var tf = function (i) { return (i < 10 ? '0' : '') + i }
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
            case 'yyyy':
              return tf(t.getFullYear())
              break
            case 'MM':
              return tf(t.getMonth() + 1)
              break
            case 'mm':
              return tf(t.getMinutes())
              break
            case 'dd':
              return tf(t.getDate())
              break
            case 'HH':
              return tf(t.getHours())
              break
            case 'ss':
              return tf(t.getSeconds())
              break
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>