import Vue from 'vue'
import Splash from './components/Splash'
import Vuetify from 'vuetify'
 

import "vueify/lib/insert-css"

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#splash',
    render: h => h(Splash),
    components: {
        Splash
    }
})