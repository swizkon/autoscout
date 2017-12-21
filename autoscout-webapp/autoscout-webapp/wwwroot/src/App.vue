<template>
  <div>
    <app-nav></app-nav>
    <div id="app">
    </div>
      <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>

import Nav from './components/Nav'
import Footer from './components/Footer'

  export default {
    name: 'app',
    data() {
      return {
      }
    },
    components: {
      'app-nav': Nav,
      'app-footer': Footer
    }
  } 
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>