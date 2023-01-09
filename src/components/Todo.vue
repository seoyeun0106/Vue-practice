<template>
    <div>
        <div v-if="!isModifying">
        <div class="todoWrapper">
    <input type="checkbox" @click="updateCheck" :checked="todo.checked">
    <div :class="{'checked':todo.checked}" >{{ todo.text }}</div>
    <button @click="modifyText">수정하기</button>
    <button class="delBtn" @click="onDelete">X</button>
    <div @click="js">{{ getDate  }}</div>
    </div>
    </div>
    <div v-show="isModifying">
        <input type="text" @keydown.enter="updateTodos" @blur="updateTodos" :value="todo.text" ref="input"/>
    </div>
    </div>
    
</template>
<script>
import dayjs from 'dayjs'
export default{
    name:'To-do',
    props:{
       todo:Object
    }, 
    data(){
        return{
            isChecked:this.todo.checked,
            isModifying:false,
            date:this.todo.date
        }
    },
    methods:{
        onDelete(){
            this.$emit('deleteFunc',this.todo.id)
        },
        modifyText(){
            this.isModifying = true;
            this.$nextTick(function(){
                this.$refs.input.focus()
            })    
        },
        updateTodos(e){
            this.$emit('updateFunc',this.todo.id,e.target.value)
            this.isModifying = false;

        },
        updateCheck(){
            this.$emit('updateChecks',this.todo.id,!this.isChecked)
            this.isChecked = ! this.isChecked
            
        },js(e){
            console.log(e.target)
        }
       
    }  ,
    computed:{
        getDate(){
            return dayjs(this.todo.date).format("YYYY년 MM월 DD일")
        }
    } 
}
</script>
<style>
.delBtn{
    background-color: unset;
    border: unset;
    color: red;
    font-weight: bolder;
}
.todoWrapper{
    display: flex;
    gap: 0.3rem;
    }
.checked{
    color: rgb(99, 83, 116);
}
</style>