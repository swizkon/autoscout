<!-- template lang="pug">
 .footer
    hr
    footer
        p &copy; {{copyright}}

</template -->

<template>
<v-footer dark app>
    <v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
      <v-btn flat color="teal" value="recent">
        <span>In store</span>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="favorites">
        <span>Add stuff</span>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby">
        <span>Settings</span>
        <v-icon>settings_applications</v-icon>
      </v-btn>
    </v-bottom-nav>
    </v-footer>
</template>

<script>
/*
  module.exports = {
    name: 'app-footer',
    data() {
      return {
        copyright: '2017 - swizkon'
      }
    }
  } 
  */
  export default {
    data () {
      return {
        e1: 'recent'
      }
    }
  }
</script>