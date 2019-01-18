<script>
  const axios = require('axios');
  module.exports = {
    data(){
      return {
        title: '',
        description: ''
      }
    },
    methods:{
      addTodo(){
        const title = this.title;
        const description = this.description;
        if(title !== ''){
          axios
            .put('/todo', {title: title, description: description})
            .then(()=>{
              this.$emit('update');
              this.title = '';
              this.description = '';
            })
            .catch(err=>{
              console.error(err);
            })
        }
      }
    }
  }
</script>

<template lang="pug">
  div.pt-1.pb-1
    div.input-group
      input(type="text" v-model="title" placeholder="タイトル" aria-describedby="newTodo").form-control
      input(type="text" v-model="description" placeholder="説明" aria-describedby="newTodo").form-control
      div.input-group-append
        button(type="button" id="newTodo" @click="addTodo").btn.btn-outline-secondary 追加
</template>

<style scoped>
</style>
