<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  width: 1920px;
  height: 1080px;
  min-width: 1920px;
  overflow: hidden;
  -webkit-user-select:auto;
  -moz-user-select:auto;
  -ms-user-select:auto;
  user-select:auto;
}
@font-face {
  font-family: 'Digiface';
  src: url('~@/assets/fonts/Digiface Regular.ttf')
}
</style>
