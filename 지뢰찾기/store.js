import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);//Vue에 Vuex연결하기  이걸해야 this.$store가 생긴거다

export const START_GAME = 'START_GAME'; // import {SET_WINNER, CLICK_CELL} from './store';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};


export default new Vuex.Store({ //import storeABC from './store';
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, // 중단된
        result: '',
        openedCount: 0,
    },//Vue의 data 속성과 비슷
    getters: {
        turnMessage(state) {
            return state.turn + '님의 턴입니다.';
        }
    },
    //Vue의 computed와 비슷
    mutations: { //mutations안에 함수들은 대문자로 약속
        //함수를 변수로 설정할수있음
        [START_GAME](state, { row, cell, mine }) {
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = '';
            state.openedCount = 0;
        },
        [OPEN_CELL](state, { row, cell }) {
            let openedCount = 0;
            const checked = [];
            
            function checkAround(row, cell){
                const checkRowOrCellIsUndefined = row<0 || cell<0 || row >= state.data.row || cell >= state.data.cell;
                if(checkRowOrCellIsUndefined){
                    return;
                }
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(state.tableData[row[cell]]))
                {
                    return;
                }
                if(checked.includes(row + '/' +cell)){
                    return ;
                }else{
                    checked.push(row + '/' +cell);
                }
                let around = [];
                if(state.tableData[row-1]){
                    around = around.concat([
                        state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
                    ]);
                    console.log(state.tableData[row-1][cell+1])

                }
                around = around.concat([
                    state.tableData[row][cell-1], state.tableData[row][cell+1]
                ]);
                if(state.tableData[row+1]){
                    around = around.concat([
                        state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
                    ]);
                }
                const counted = around.filter(function(v){
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                if(counted.length === 0 && row > -1){
                    const near = [];
                    if(row - 1 > -1){
                        near.push([row-1, cell-1]);
                        near.push([row-1, cell]);
                        near.push([row-1, cell+1])
                    }
                    near.push([row, cell-1]);
                    near.push([row, cell+1]);
                    if(row + 1 < state.data.row){
                        near.push([row+1, cell-1]);
                        near.push([row+1, cell]);
                        near.push([row+1, cell+1])
                    }
                    near.forEach((n)=>{
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
                if (state.tableData[row][cell] === CODE.NORMAL){
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], cell, counted.length);
              
            };
            
            checkAround(row, cell);

            let halted = false;
            let result = '';
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
                halted = true;
                result = state.timer + '초만에 승리했습니다.';
            }
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, { row, cell }) {
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
            state.halted = true;
            state.result = '게임오버!';
        },
        [FLAG_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.MINE) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },// state를 수정할 때 사용. 동기적으로
    actions: {

    },// 비동기를 사용할 때, 여러 mutations를 연달아 실행할 때

});