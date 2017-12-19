<template>
  <div class="container body-content">
    <app-nav></app-nav>

      <div class="hello">
        <h1>{{ msg }}</h1>
      </div>


				<v-text-field
				name="input-1"
				label="Label Text"
				id="testing"
			  ></v-text-field>

    <app-footer></app-footer>
  </div>
</template>

<script>

import Nav from '../components/Nav'
import Footer from '../components/Footer'

  export default {
    name: 'splash',
    data() {
      return {
        msg: 'Test of the vue markdown component' 
      }
    },
    components: {
      'app-nav': Nav,
      'app-footer': Footer
    },
    created () {
    }
  } 
</script>