<template>
    <div class="todo-item" ref="todo" @mouseenter="setIsHover" @mouseleave="setIsLeave">
    <div class="item__inner item--edit">
    <div class="todoWrapper item__inner itmer--normal">
        <label>
            <input type="checkbox" @click="updateCheck" :checked="todo.checked">
    <span class="material-symbols-outlined icon">
      check
    </span>
  </label>   
    <div v-if="!isModifying" class="content">
    <div :class="{'checked':todo.checked}" >{{ todo.text }}</div>
    <div class="date">{{ getDate }}</div>
    </div>
    <div v-show="isModifying"  class="content">
        <input class="modify-input" type="text" @keydown.enter="updateTodos" @blur="updateTodos" :value="todo.text" ref="input"/>
    </div>
    <button  @click="modifyText" class="modify-btn" v-show="isHovered">
        <span class="material-symbols-outlined">
        edit
        </span>
    </button>
    <button class="delBtn" @click="onDelete" v-show="isHovered">
        <span class="material-symbols-outlined">
            delete
        </span>
    </button>
    </div>
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
    mounted(){
        this.$refs.todo.scrollIntoView();
        console.log(this.todo)
        },
    data(){
        return{
            isModifying:false,
            isHovered:false,
            date:this.todo.date
        }
    },
    methods:{
        onDelete(){
        this.$store.dispatch("todoApp/deleteTodo",this.todo.id)
        },
        modifyText(){
            this.isModifying = true;
            this.$nextTick(function(){
                this.$refs.input.focus()
            })    
        },
        updateTodos(e){
            this.$store.dispatch('todoApp/updateInput',{id:this.todo.id,text:e.target.value})
            this.isModifying = false;
        },
        updateCheck(){
            this.$store.dispatch('todoApp/updateCheck',this.todo.id)                    
        },
        setIsHover(){
            this.isHovered = true
        },
        setIsLeave(){
            this.isHovered = false
        }     
    }  ,
    computed:{
        getDate(){
            return dayjs(this.todo.date).format("YYYY년 MM월 DD일")
        }
    },

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
    align-items: center;
    width:100%
    }
.modify-btn{
    margin-left: auto;
}
.content{
    display: flex;
    flex-direction: column;
    gap: 10px
}
.checked{
    color: rgb(167, 165, 170);
}

.date{
    font-size: x-small;
}
</style>