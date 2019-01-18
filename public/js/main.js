
const Vue = require('vue/dist/vue.js');

const axios = require('axios');
const app = new Vue({
  el: '#app',
  components: {
    add_todo: require('./components/addTodo.vue'),
    todo_list: require('./components/todoList.vue'),
    comp_todo: require('./components/compTodo.vue'),
    todo_hist: require('./components/todoHist.vue'),
    edit_modal: require('./components/editModal.vue')
  },
  data(){
    return{
      todos: null,
      comptodos: null,
      hists: null,
      isActive: '1',
      isModalActive: false
    }
  },
  mounted(){
    this.listUpdate();
  },
  methods: {
    listUpdate(){
      axios
        .get('/todo')
        .then(res=>{
          this.todos = res.data.todos;
          this.comptodos = res.data.comptodos;
          this.hists = res.data.hists;
        })
        .catch(error=>console.error(error));
    },
    modal(){
      this.isModalActive = !this.isModalActive;
    }
  }
});
