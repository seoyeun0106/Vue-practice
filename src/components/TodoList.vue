<template>
<div class="todo-container">
  <div class="todo-app_actions">
    <div class="filters">
      <button @click="changeFilter('all')">모든 항목 ( {{ total }} )</button>
      <button @click="changeFilter('active')">해야 할 항목( {{ activeCount }} )</button>
      <button @click="changeFilter('completed')">완료된 항목( {{ completedCount }} )</button>
    </div>
  </div>
  <ul class="todo-li todo-app__list">
    <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
    <Todo :todo="todo" @delete-func="onDel" @update-func="updateTodo" @update-checks="updateCheck"/>
    </li>
  </ul>
  <form class="form" @submit.prevent="onSubmit">
    <input type="text" class="input" :value="text" @input="text= $event.target.value">
    <button class="btn">꾹</button>
  </form>
</div>
<div class="actions">
  <input type="checkbox" v-model="allDone">
  <button @click="clearCompleted">
    완료된 항목 삭제
  </button>
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
        return this.total === this.completedCount && this.total > 0
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
    updateCheck(data,isChecked){
      this.todos = this.todos.map((todo)=>{
        if(todo.id === data){
          todo.checked = isChecked
        }
        return todo
      })
    },
    changeFilter(filter){
      this.filter = filter
    },
   completeAll(checked){
    this.todos.forEach((todo)=>{
        todo.checked = checked
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
<style scoped>
.todo-container{
  width:fit-content
}
.todo-li{
  padding: 0;
}
.todo-item{
  list-style-type: none;
}
.form{
  display: flex;
  align-items: center;
  height: 25px;
  gap:0.3rem
}
.input{
  border-radius: 6px;
  height: 100%;
  max-width: 70%;
}
.btn{
  height: 100%;
  width: 20px;
  cursor: pointer;
  text-align: center;
  padding: 0
}
</style>
