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
  export default {
    name: 'hello',
    data() { 
      return {
        label: `Enter item`,
        entityId: '12345',
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
    },
    methods: {
        onSubmit: function (event) {
          this.$toasted.info('Add item ' + this.entityId)
          
          // this.$router.push({ name: 'AccountHistory', params: { id: this.entityId}})
        this.items.push(this.entityId)

          this.entityId = "";
        }
      }
  }
</script>