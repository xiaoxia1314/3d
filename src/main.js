import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化css
import './assets/css/reset.css'
// 引入字体图标库
// import 'font-awesome/css/font-awesome.css'

// element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
// // 引入calendar
// import VCalendar from 'v-calendar'
// import 'v-calendar/lib/v-calendar.min.css'
// // 引入animate.css 动画
// import animated from 'animate.css'
// // 引入富文本框
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// // 引入验证
// import reg from './utils/reg'
// // 引入bable-polyfill
// import 'babel-polyfill'
// // 公用组件
// import "./components"; 
// // html导出pdf
// import htmlToPdf from './utils/htmlToPdf'
// Vue.use(htmlToPdf)
// router.beforeEach((to, from, next) => {
//   let username = sessionStorage.getItem('username')
//   if(username){
//     next();
//   } else {
//     if(to.path=='/login'){ //如果是登录页面路径，就直接next()
//         next();
//     } else { //不然就跳转到登录；
//         next('/login');
//     }
//   }
// })
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(animated)
// Vue.use(VCalendar)
// Vue.use(VueQuillEditor)
// Vue.use(reg)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
