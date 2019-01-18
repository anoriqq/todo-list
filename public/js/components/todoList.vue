<script>
  const axios = require('axios');
  module.exports = {
    props: ['title', 'description', 'id'],
    methods: {
      done(){
        axios
          .post('/todo/done', {id: this.id})
          .then(()=>{
            this.$emit('update');
          })
          .catch(err=>console.error(err));
      },
      del(){
        axios
          .post('/todo/delete', {id: this.id})
          .then(()=>{
            this.$emit('update');
          })
          .catch(err=>console.error(err));
      },
      modal(){
        this.$emit('modal');
      }
    }
  }
</script>

<template lang="pug">
  div.container.border-bottom
    div.row
      div.col
        p {{title}}
        p(v-if="description").description {{description}}
      div(role="group").col-md-auto.btn-group.p-0
        button(@click="done").btn-sm.btn-light 完了
        button(@click="modal").btn-sm.btn-light 編集
        button(@click="del").btn-sm.btn-light 削除
</template>

<style scoped>
</style>
