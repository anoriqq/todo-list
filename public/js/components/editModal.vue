<script>
  module.exports = {
    props: ['title', 'description', 'id'],
    data(){
      return {
        newTitle: '',
        newDescription: ''
      }
    },
    methods:{
      closeModal(){
        this.newTitle = '';
        this.newDescription = '';
        this.$emit('modal');
        console.log('cancel');
      },
      edit(){
        const newTitle = this.newTitle;
        const newDescription = this.newDescription;
        const id = this.id;
        console.log(this);
        // if(title !== ''){
        //   axios
        //     .put('/todo', {title: newTitle, description: newDescription})
        //     .then(()=>{
        //       this.$emit('update');
        //       this.newTitle = '';
        //       this.newDescription = '';
        //       this.$emit('edit');
        //       console.log('edit');
        //     })
        //     .catch(err=>{
        //       console.error(err);
        //     })
        // }
      }
    }
  }
</script>

<template lang="pug">
  div().modal-overlay
    div.edit-modal
      p タスクを編集
      input(type="text" v-model="newTitle" placeholder="タイトル" aria-describedby="editTodo")
      input(type="text" v-model="newDescription" placeholder="説明" aria-describedby="editTodo")
      div(role="group").btn-group
        button(type="button" id="editTodo" @click="edit").btn.btn-outline-secondary 保存
        button(type="button" id="editTodo" @click="closeModal").btn.btn-outline-secondary キャンセル
</template>

<style scoped>
.edit-modal{
  width: 500px;
  height: 400px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  background: white;
}
.modal-overlay{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
</style>
