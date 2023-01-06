<template>
    <div class="todoWrapper">
    <input type="checkbox" name="" id="" @click="onCheck">
    <div :class="{'checked':bool}">{{ text }}</div>
    <button class="delBtn" @click="onDelete">X</button>
    </div>
</template>
<script>
export default{
    name:'To-do',
    props:{
        text:{
            type: String,
            required: true
        },
        id:{
            type:Number
        },
        getData:{
            type:Function
        }}, 
    data(){
        return{
            bool:false
        }
            },
    methods:{
        onDelete(){
            this.$emit('deleteFunc',this.id)
        },
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