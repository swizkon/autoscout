import Vue from 'vue'
import Splash from './components/Splash'

import "vueify/lib/insert-css"

import VueMarkdown from 'vue-markdown'

Vue.use(VueMarkdown);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#splash',
    render: h => h(Splash),
    components: {
        Splash,
        VueMarkdown
    }
})