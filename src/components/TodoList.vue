<template>
<div class="todo-container todo-app">
  <div class="todo-app_actions">
    <div class="filters">
      <router-link to="all" class="link-btn">모든 항목({{total}})</router-link>
      <router-link to="active" class="link-btn">해야 할 항목({{activeCount}})</router-link>
      <router-link to="completed" class="link-btn">완료된 항목({{completedCount}})</router-link>
      </div>
  </div>
  <ul class="todo-li todo-app__list">
    <div class="actions clearfix todo-included">
    <div class="float--left">
     <label>
        <input type="checkbox" v-model="allDone">
        <span class="material-symbols-outlined icon">
            check
        </span>
      </label>
    </div>
  <div class="float--right">
    <button @click="clearCompleted">
    완료된 항목 삭제
  </button>
  </div>
</div>
    <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
    <Todo :todo="todo"/>
    </li>
  </ul>
  <form class="form" @submit.prevent="onSubmit">
    <input type="text" placeholder="할 일을 추가하세요!" class="input todo-included" :value="text" @input="text= $event.target.value">
    <button class="btn">꾹</button>
  </form>
</div>

</template>
<script>
import Todo from './Todo.vue';
import {mapState, mapGetters,mapMutations,mapActions} from "vuex"
export default {
  name: 'Todo-List',
  components:{
    Todo,
  },
  data(){
    return{
      id:1,
      text:'',
      storedTodo : this.$store.state.todos,
      getters: this.$store.getters,
      filter:"all",
      checked:false,
    }
  },
  computed: {
    ...mapState('todoApp',[
      'todos'
    ]),
    ...mapGetters('todoApp',[
      'total', 'activeCount', 'completedCount','filteredTodos'
    ]),
    allDone:{
      get(){
        return (this.total === this.completedCount )&& this.total > 0
      },
      set(checked){
        this.completeAll(checked)
        }
      },      
},
watch: {
    $route () {
      this.updateFilter(this.$route.params.id)
    }
  },
  methods: {
    ...mapMutations('todoApp',[
      'updateCheck',
      'updateFilter'
    ]),
    ...mapActions('todoApp',[
      'updateCheck',
      'completeAll',
      'clearCompleted'
    ]),
    onSubmit(e){
      this.id++;
      const todoItem = {
        id: this.id,
        text: e.target[0].value,
        checked: this.checked,
        date: new Date()
      }
      this.$store.dispatch("todoApp/createTodo",todoItem)
      this.text='' 
       }    
  ,
   completeAll(checked){
      this.$store.dispatch("todoApp/completeAll",checked);
   },
   clearCompleted(){
      this.$store.dispatch("todoApp/clearCompleted");
      }   
  },
mounted(){
    this.$store.dispatch("todoApp/getLocalStorage");
  },

}
</script>
<style lang="scss">
@import "../scss/style";
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.todo-container{
  flex-grow: 1;
  min-width: 700px;
}
.todo-li{
  padding: 0;
  max-height: 700px;
}
.todo-item{
  list-style-type: none;
}
.todo-included{
  padding: 24px 28px
}
.form{
  display: flex;
  align-items: stretch;
}
.input{
  flex-grow: 1;
  border: unset;  
}
.btn{
  border-radius: unset;
  width: 60px;
  cursor: pointer;
  text-align: center;
}
.filters{
  gap: 1rem;
    display: flex;
    padding: 1rem;
    background-color: #44544e;
    align-items: center;
    justify-content: center;
    .link-btn{
      text-decoration:unset;
      color:#1c332b
    }
    .router-link-active{
      color: white;
    }
}

</style>
