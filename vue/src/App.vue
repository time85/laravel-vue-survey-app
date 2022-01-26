<script>

import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['user'])
  }
}

</script>
<template>
  <html class="h-full bg-gray-50">
    <body class="h-full">
      <router-view></router-view>
    </body>
  </html>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
