<template>
  <div class="hello">
    <h1>{{ label }}</h1>
    <form v-on:submit.prevent="onSubmit">
      <input class="input-lg" name="entityid" v-model="entityId" placeholder="Enter entity id" />
    </form>
    - or select preview mock -
    <ul v-if="items">
      <li v-for="item in items">
        <a :href="'/accounts.html#/mocks/' + item">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>

  import { HubConnection } from "@aspnet/signalr-client"

  var connection;

  export default {
    name: 'hello',
    data() { 
      return {
        label: `Enter item`,
        entityId: '',
        items: null
      }
    },
    created () {
        var _this = this;
            _this.items = [];
          /*
          this.$toasted.info('Loading pre-defined template')
          fetch('/api/accountEvent/mocks').then(function(response) {
            return response.json();
          }).then(function(jsonData) {
            _this.items = []
          });
          */

          connection = new HubConnection('/list');

          connection.on('send', data => {
              console.log("send: " + data);
 
              this.$toasted.success('<b>SEND </b>  ' + data); //.goAway(2000);
          });

          connection.on('itemAdded', (title, list) => {
              this.$toasted.info('Added ' + title  + ' to ' + list).goAway(2000)
              this.items.push(title)
          });

          connection.on('itemAccepted', (title, list) => {
              this.$toasted.info('Item accepted: ' + list + ': ' + title).goAway(2000)
          });
          
          connection.start()
              .then(() => {
                connection.invoke('send', 'Hello from HubTest.vue');
              });
    },
    methods: {
        onSubmit: function (event) {
          var itemTitle = this.entityId;
          // this.$toasted.info('Added item ' + itemTitle)
          // connection.invoke('itemAdded', itemTitle, 'defaultList');
          connection.invoke('itemAccepted', itemTitle, 'defaultList');
          this.entityId = "";
        }
      }
  }
</script>