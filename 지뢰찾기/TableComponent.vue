<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td 
            v-for="(cellData, cellIndex) in rowData" 
            :key="cellIndex" 
            :style="cellDataStyle(rowIndex, cellIndex)"
            @click="onClickTd(rowIndex, cellIndex)"
            @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
            >
            {{cellDataText(rowIndex, cellIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
    import {mapState} from 'Vuex';
    import store, {CODE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICK_MINE} from "./store";
    export default {
        computed: {
            ...mapState(['tableData', 'halted']),
            cellDataStyle(state) { //this쓸때는 제일위는 일반함수 그밑은 화살표함수로 써야한다
                return (row, cell) => {//this관계때문에 여긴또 화살표써야된다는데 뭔소리야 화살표함수, 고차함수 좀 잘알아보자
                    switch (this.tableData[row][cell]) {//화살표함수에서는 this못씀
                        case CODE.NORMAL:
                        case CODE.MINE:
                            return {
                                background: '#aaaaaa',
                            };
                        case CODE.FLAG:
                        case CODE.FLAG_MINE:
                            return {
                                background: 'red',
                            };
                        case CODE.QUESTION:
                        case CODE.QUESTION_MINE:
                            return {
                                background: 'yellow',
                            };
                        case CODE.OPENED:
                        case CODE.CLICKED_MINE:
                            return {
                                background: 'white',
                            };
                        default:
                            return {};
                    }
                }
            },

            cellDataText(){
                return (row, cell) => {
                    switch (this.tableData[row][cell]) {
                        case CODE.OPENED:
                        case CODE.NORMAL:
                            return '';
                        case CODE.MINE:
                            return 'X';
                        case CODE.FLAG:
                        case CODE.FLAG_MINE:
                            return '!';

                        case CODE.QUESTION:
                        case CODE.QUESTION_MINE:
                            return '?';

                        case CODE.CLICKED_MINE:
                            return '펑';

                        default:
                            return this.tableData[row][cell] || '';
                    }
                }
            },

        },
    methods: {
        onClickTd(row, cell) {
            if(this.halted){
                return ;
            }
            switch (this.tableData[row][cell]){
                case CODE.NORMAL:
                case CODE.FLAG:
                case CODE.QUESTION:
                    this.$store.commit(OPEN_CELL, {row, cell});
                    return ;
                case CODE.MINE:
                case CODE.FLAG_MINE:
                case CODE.QUESTION_MINE:
                    this.$store.commit(CLICK_MINE, {row, cell});
                        return ;
                default:
                    return ;
            }

        },
        
        onRightClickTd(row, cell) {
            if(this.halted){
                return ;
            }
            switch(this.tableData[row][cell]){
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, {row, cell});
                    return ;
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    this.$store.commit(QUESTION_CELL, {row, cell});
                    return ;
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    this.$store.commit(NORMALIZE_CELL, {row, cell});
                    return ;
            }
        }
    }


    }
</script>
