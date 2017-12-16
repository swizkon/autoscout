<template>
  <div class="hello">
    <h1>{{ label }}</h1>
    <form v-on:submit.prevent="onSubmit">
      <input class="input-lg" name="entityid" type="number" v-model="entityId" placeholder="Enter entity id" />
    </form>
    - or select preview mock -
    <ul v-if="mocks">
      <li v-for="d in mocks">
        <a :href="'/accounts.html#/mocks/' + d">{{ d }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() { 
      return {
        label: `Enter entity id`,
        entityId: '12345',
        mocks: null
      }
    },
    created () {
        var _this = this;
          this.$toasted.info('Loading pre-defined template')
          fetch('/api/accountEvent/mocks').then(function(response) {
            return response.json();
          }).then(function(jsonData) {
            _this.mocks = jsonData
          });
    },
    methods: {
        onSubmit: function (event) {
          this.$toasted.info('Go to history for entity ' + this.entityId)
          this.$router.push({ name: 'AccountHistory', params: { id: this.entityId}})
        }
      }
  }
</script>