<!-- template lang="pug">
    nav.navbar.navbar-inverse.navbar-fixed-top
        .container
            .navbar-header
                button.navbar-toggle(type='button' data-toggle='collapse' data-target='.navbar-collapse')
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                a.navbar-brand(href='/index.html') Home
            .navbar-collapse.collapse
                ul.nav.navbar-nav
                    li
                        a(href='/accounts.html') Entity history
</template -->

<template>

<v-toolbar dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Autoscout</v-toolbar-title>
    </v-toolbar>
</template>


<script>
  module.exports = {
    name: 'app-nav',
    data() {
      return {
        copyright: '2017 - swizkon'
      }
    }
  }
</script>