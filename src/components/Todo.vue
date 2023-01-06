<template>
    <div class="todoWrapper">
    <input type="checkbox">
    <div :class="{'checked':todo.checked}">{{ todo.text }}</div>
    <button class="delBtn" @click="onDelete">X</button>
    </div>
</template>
<script>
export default{
    name:'To-do',
    props:{
       todo:Object
    }, 
    data(){
        return{
            bool:false
        }
    },
    methods:{
        onDelete(){
            this.$emit('deleteFunc',this.todo.id)
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