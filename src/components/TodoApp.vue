<template>
    <div>
        <todo-item 
            v-for="todo in todos"
            :key = "todo.id"
            :todo="todo"
        />
        <todo-creator @creat-todo="createTodo" />
    </div>
</template>
<script>
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import TodoCreator from './TodoCreator.vue';
import TodoItem from './TodoItem.vue'
export default{
    name:"TodoApp",
    components:{
        TodoCreator,
        TodoItem
    },
    data(){
        return{
            db:null
        }
    },
    created(){
        this.initDB()
    },
    methods:{
        initDB(){
            const adapter = new LocalStorage('todo-app');
            this.db = lowdb(adapter);
            //Local DB 초기화
            this.db
            .defaults({
                todos:[],                
            })
            .write()
        },
        //emit으로 받은 데이터
        createTodo(title){
            const newTodo ={
                id:cryptoRandomString({length:10}),
                title,
                createdAt:new Date(),
                updatedAt:new Date(),
                done:false,
            }

            this.db.get('todos').push(newTodo).write()
        }

    }
}
</script>