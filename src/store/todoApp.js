export default{
    //안하면 getter mutation 와 같은 상에서 돌아가게 됨
    nameSpaced: true,
    state:()=>({
        todos:[]
    }),
    getters:{
        total(state){
            return state.todos.length
        },
        activeCount(state){
            return state.todos.filter(todo => !todo.done).length
        },
        completedCount(state,getters){
            return getters.total - getters.activeCount
        }
    },
    mutations:{
        assignTodos(state,todos){
            state.todos = todos
        }

    },
    actions:{
    
    }

}