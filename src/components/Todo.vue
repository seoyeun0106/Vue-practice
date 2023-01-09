<template>
    <div>
        <div v-if="!isModifying">
        <div class="todoWrapper">
    <input type="checkbox">
    <div :class="{'checked':todo.checked}">{{ todo.text }}</div>
    <button @click="modifyText">수정하기</button>
    <button class="delBtn" @click="onDelete">X</button>
    </div>
    </div>
    <div v-show="isModifying">
        <input type="text" @keydown.enter="updateTodos" :value="todo.text" ref="input"/>
    </div>
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
            bool:false,
            isModifying:false
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
            console.dir(this.$refs.input.focus)
          
        },
        updateTodos(e){
            this.$emit('updateFunc',this.todo.id,e.target.value)
            this.isModifying = false
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