<template>
    <div>
        <div>{{turn}} 님의 턴입니다.</div>
        <!--<table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData,cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
        </table>-->
        <table-component>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData,cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
        </table-component>
        <div v-if="winner">{{winner}} 님의 승리.</div>
        <div v-else-if="draw">무승부</div>
    </div>


</template>

<script>
    import {mapState} from 'vuex';
    import store, {CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER} from './store';
    import TableComponent from "./TableComponent";
    export default {
        store,
        name: "TicTacToe",
         components: {
            TableComponent,
         },

        computed: {
            ...mapState(['tableData','winner', 'turn', 'draw']), //mapState사용해서 한방에 가져오자
            /*...mapState({
                winner(state) {
                   return state.winner;
                },
                turnState: 'turn',
            })*/
            /*winner() {
                return this.$store.state.winner;
            },
            turn() {
                return this.$store.state.turn;
            },
            draw() {
                return this.$store.state.draw;
            }*/
        },
        methods:{
            onClickTd(rowIndex, cellIndex ) {
                if(this.tableData[rowIndex][cellIndex]) return;

                this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex});
                let win = false;
                //this.$set(this.$root.$data.tableData[this.rowIndex], this.cellIndex,this.$root.$data.turn);
                if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn)//가로 한줄
                {
                    win = true;
                } else if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn)//세로 한줄
                {
                    win = true;
                } else if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn)//대각선 오른쪽아래
                {
                    win = true;
                } else if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn)//대각선 왼쪽아래
                {
                    win = true;
                }
                let draw = true;
                this.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if (!cell){
                            draw = false
                        }
                    })
                })
                if (win) {
                    console.log(this.turn, '이 승리했습니다.!');
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
                }else if(draw){
                    console.log('무승부');
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                }
                else{
                    this.$store.commit(CHANGE_TURN);
                }
            },
        },

    }
</script>

<style>
    table {
         border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>