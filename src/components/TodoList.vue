<template>
<div class="todo-container">
  <ul class="todo-li">
    <li v-for="{id,text} in todos" :key="id" class="todo-item">
    <Todo :text="text" :id="id" @delete-func="onDel"/>
    </li>
  </ul>
  <form class="form" @submit.prevent="onSubmit">
    <input type="text" class="input" v-model="inputVal">
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
      todos:[{id:0,text:"UI 구현 완료하기"},{id:1,text:"API post후 res받아오기"}],
      inputVal:""
    }
  },
  methods: {
    onSubmit(){
      if(this.inputVal){
      this.id++;
      const todoItem = {
        id: this.id,
        text: this.inputVal
      }
      this.todos.push(todoItem)
      this.inputVal="" }    
    },
    onDel(data){
      this.todos = this.todos.filter(({id})=>{
        return id !==data
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
        const stringTodo=window.localStorage.getItem(this.KEY);
        if(stringTodo){
        const parsedTodo = JSON.parse(stringTodo);
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
