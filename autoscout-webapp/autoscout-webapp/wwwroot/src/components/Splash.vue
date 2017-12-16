<template>
  <div class="container body-content">
    <app-nav></app-nav>

      <div class="hello">
        <h1>{{ msg }}</h1>
      </div>

<vue-markdown>:)
## Welcome ##
i am a ~~tast~~ **test**.
```Some test```
- FFSFSFSF
- Othe 
</vue-markdown>

    <app-footer></app-footer>
  </div>
</template>

<script>

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import VueMarkdown from 'vue-markdown'

  export default {
    name: 'splash',
    data() {
      return {
        msg: 'Test of the vue markdown component' 
      }
    },
    components: {
      'app-nav': Nav,
      'app-footer': Footer,
      VueMarkdown
    },
    created () {
    }
  } 
</script>