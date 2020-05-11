import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);//Vue에 Vuex연결하기  이걸해야 this.$store가 생긴거다

export const SET_WINNER = 'SET_WINNER'; // import {SET_WINNER, CLICK_CELL} from './store';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({ //import storeABC from './store';
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
        draw: false,
    },//Vue의 data 속성과 비슷
    getters: {
        turnMessage(state) {
            return state.turn + '님의 턴입니다.';
        }
    },
    //Vue의 computed와 비슷
    mutations: { //mutations안에 함수들은 대문자로 약속
        //함수를 변수로 설정할수있음
        [SET_WINNER](state, winner) {
            state.winner = winner
            state.draw = false;

        },
        [CLICK_CELL](state, {row, cell}){
            Vue.set(state.tableData[row], cell, state.turn);// Vuex에는 this.$set못함
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData =[
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]
        },
        [NO_WINNER](state){
            state.winner = '';
            state.draw = true;
        },
        /*SET_WINNER(state, winner) {
            state.winner = winner
        },
        CLICK_CELL(state, {row, cell}){
            state.tableData[row][cell] = state.turn;
        },
        CHANGE_TURN(state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        RESET_GAME(state){
            state.turn = 'O';
            state.tableData =[
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ]
        },
        NO_WINNER(state){
            state.winner = '';
            state.draw = true;
        },*/
    },// state를 수정할 때 사용. 동기적으로
    actions: {

    },// 비동기를 사용할 때, 여러 mutations를 연달아 실행할 때

});