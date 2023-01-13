import dayjs from 'dayjs'
const KEY ='todos'
export default{
    //안하면 getter mutation 와 같은 상에서 돌아가게 됨
    namespaced:true,
    state:()=>({
        todos:[{id:0,text:"UI 구현 완료하기",checked:true,date: new Date()},
        {id:1,text:"API post후 res받아오기",checked:false,date: new Date()}],
        filter:'all'
    }),
    getters:{
        filteredTodos (state) {
            switch (state.filter) {
              case 'all':
              default:
                return state.todos
              case 'active':
                return state.todos.filter(todo => !todo.checked)
              case 'completed':
                return state.todos.filter(todo => todo.checked)
            }
          },
        total(state){
            return state.todos.length
        },
        activeCount(state){
            return state.todos.filter(todo => !todo.checked).length
        },
        completedCount(state,getters){
            return getters.total - getters.activeCount
        },
        getDate(state){
            return dayjs(state.todo.date).format("YY년 MM월 DD일")
        }
    },
    mutations:{
        setLocalStorage(state,newTodos){
            state.todos = newTodos;
            window.localStorage.setItem(KEY,JSON.stringify(newTodos));
        }, 
        addTodo(state,newTodo){
            state.todos.push(newTodo);
            window.localStorage.setItem(KEY,JSON.stringify(state.todos));
        },
        getTodos(state,newTodos){
            state.todos = newTodos
        },
        setInput(state,{id,text}){
          state.todos.map((todo)=>{
                if(todo.id === id){
                  todo.text = text;
                  todo.date = new Date()+" (edited)"
               } 
            })
            window.localStorage.setItem(KEY,JSON.stringify(state.todos));
        },
        updateCheck(state,{id}){
            state.todos.map((todo)=>{
                if(todo.id === id){
                  todo.checked = !todo.checked;
               } 
            })
            window.localStorage.setItem(KEY,JSON.stringify(state.todos));
        },
        updateFilter (state, filter) {
            state.filter = filter
          },
        completeAll(state,checked){
            state.todos.map((todo)=>{
                todo.checked = checked
            })
            window.localStorage.setItem(KEY,JSON.stringify(state.todos));
        }
    },
    actions:{
        createTodo({commit},todoItem){
            commit("addTodo",todoItem)
        },
        deleteTodo({commit,state},todoID){
            const newTodo = state.todos.filter(({id})=>{
                return todoID !==id
            })
            commit("setLocalStorage",newTodo);
        },
        updateInput({commit},{id,text}){
            commit("setInput",{id,text})
        }, 
        updateCheck({commit},id){
            commit("updateCheck",{id})
        },
        completeAll({commit},checked){
            commit("completeAll",checked)
        },
        clearCompleted({state,commit}){
           const newTodo = state.todos.filter((todo)=>{return !todo.checked});
           commit("setLocalStorage",newTodo)      
        },
        getLocalStorage({commit}){
            const stringTodo=localStorage.getItem(KEY);
            const parsedTodo = JSON.parse(stringTodo);
            if(stringTodo && parsedTodo.length){
                const newTodo = parsedTodo;
                commit("getTodos",newTodo)
            }
        }, 
   },
        

    }
