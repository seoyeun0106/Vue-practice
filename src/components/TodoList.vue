<template>
<div class="todo-container">
  <ul class="todo-li">
    <li v-for="todo in todos" :key="todo.id" class="todo-item">
    <Todo :todo="todo" @delete-func="onDel" @update-func="updateTodo" @update-checks="updateCheck"/>
    </li>
  </ul>
  <form class="form" @submit.prevent="onSubmit">
    <input type="text" class="input" :value="text" @input="text= $event.target.value">
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
      todos:[{id:0,text:"UI 구현 완료하기",checked:true},{id:1,text:"API post후 res받아오기",checked:false}],
      text:'',
      checked:false
    }
  },
  methods: {
    onSubmit(e){
      this.id++;
      console.log(e.target[0].value)
      const todoItem = {
        id: this.id,
        text: e.target[0].value,
        checked: this.checked
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
           todo.text = text
        } return todo
      })
    },
    updateCheck(data,isChecked){
      this.todos = this.todos.map((todo)=>{
        if(todo.id === data){
          console.log(todo.checked,isChecked,"와앙")
          todo.checked = isChecked
        }
        return todo
      })
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
