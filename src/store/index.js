import { createStore } from "vuex";
import todoApp from "./todoApp";

const store = createStore({
    // state(){
    //     return{
    //         count:0
    //     }
    // },
    // //computed(계산된 값으로 return만)
    // getters:{

    // },
    // //실제 값 변경
    // //비동기 X
    // mutations:{
    //     increment(state){
    //         state.count++
    //     }
    // },
    // //실제 값을 변경할 수가 없음
    // //비동기 포함한 일반 로직 함수
    // actions:{

    // }
    strict: process.env.NODE_ENV !=='production',
    //모둘로 만들음
    modules:{
        todoApp
    }

})
export default store