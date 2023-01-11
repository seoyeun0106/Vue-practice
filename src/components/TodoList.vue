<template>
<div class="todo-container todo-app">
  <div class="todo-app_actions">
    <div class="filters">
      <button @click="changeFilter('all')">모든 항목 ( {{ total }} )</button>
      <button @click="changeFilter('active')">해야 할 항목( {{ activeCount }} )</button>
      <button @click="changeFilter('completed')">완료된 항목( {{ completedCount }} )</button>
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
    <Todo :todo="todo" @delete-func="onDel" @update-func="updateTodo" @update-checks="updateCheck"/>
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
export default {
  name: 'TodoList',
  components:{
    Todo,
  },
  data(){
    return{
      id:1,
      KEY:'todos',
      todos:[{id:0,text:"UI 구현 완료하기",checked:true,date: new Date()},
            {id:1,text:"API post후 res받아오기",checked:false,date: new Date()}],
      text:'',
      filter:"all",
      checked:false,
    }
  },
  computed: {
    filteredTodos(){
      switch(this.filter){
        case 'all':
        default:
          return this.todos
        case 'active':
          return this.todos.filter(todo=>!todo.checked)
        case 'completed':
          return this.todos.filter(todo=>todo.checked)
        }
      },
      total(){
        return this.todos.length
      },
      activeCount(){
        return this.todos.filter(todo=>!todo.checked).length
      },
      completedCount(){
        return this.total - this.activeCount
      },
      allDone:{
          get(){
        return (this.total === this.completedCount )&& this.total > 0
        },
          set(checked){
        this.completeAll(checked)
        }
      },      
},
  methods: {
    onSubmit(e){
      this.id++;
      const todoItem = {
        id: this.id,
        text: e.target[0].value,
        checked: this.checked,
        date: new Date()
      }
      this.todos.push(todoItem)
      this.text='' 
       }    
  ,
    onDel(data){
      this.todos = this.todos.filter(({id})=>{
        return id !==data
      })
    },
    updateTodo(data,text){
      this.todos = this.todos.map((todo)=>{
         if(todo.id === data){
           todo.text = text;
           todo.date = new Date()
        } return todo
      })
    },
    updateCheck(data){
      this.todos = this.todos.map((todo)=>{
        if(todo.id === data){
          todo.checked = !todo.checked
        }
        return todo
      })
    },
    changeFilter(filter){
      this.filter = filter
    },
   completeAll(checked){
    this.todos = this.todos.map((todo)=>{
        todo.checked = checked
        return todo
    })
   },
   clearCompleted(){
      this.todos = this.todos.filter((todo)=>{return !todo.checked})      
      }   
  },
  watch:{
      todos:{
        deep:true,
        handler(newTodo){
          window.localStorage.setItem(this.KEY,JSON.stringify(newTodo))
        }   
    },
    getTodo:{
      handler(){
        const stringTodo=localStorage.getItem(this.KEY);
        const parsedTodo = JSON.parse(stringTodo)
        if(stringTodo && parsedTodo.length){
        this.todos = parsedTodo;
        this.id=this.todos[this.todos.length-1].id
        }
      },
      immediate:true
    }
  },  
}
</script>
<style lang="scss">
@import "../scss/style";
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
    button{
      color: white;
    }
}

</style>
