import TodoList from "../components/TodoList.vue";
import About from "@/views/About"
import {createRouter, createWebHashHistory} from 'vue-router'
import Main from "@/views/Main"

const routes =[
    {   
        path:"/todo/:id",
        name:"Todo-List",
        component: TodoList,
    },{
        path:"/about",
        name:"About",
        component: About
        
    },{
        path:"/todo/",
        redirect:"/todo/all"
    },{
        path:"/",
        component:Main
    }
];

const router = createRouter({
 history:createWebHashHistory(),
    routes
})

export default router;