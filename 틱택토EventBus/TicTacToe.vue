<template>
    <div>
        <div>{{turn}} 님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{winner}} 님의 승리.</div>
        <div v-else-if="draw">무승부</div>
    </div>


</template>

<script>
    import TableComponent from './TableComponent';
    import EvnetBus from "./EvnetBus";
    export default {
        name: "TicTacToe",
         components: {
            TableComponent
         },
         data() {
            return {
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                turn: 'O',
                winner: '',
                draw: false,
            };
        },
        computed: {

        },
        methods:{
            onClickTd(rowIndex, cellIndex) {
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);
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
                    this.winner = this.turn;
                    this.draw= false;
                    this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    this.turn = 'O';
                    win = false;
                }else if(draw){
                    console.log('무승부');
                    this.winner = '';
                    this.draw = true;
                    this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    this.turn = 'O';
                    win = false;
                }
                else{
                    this.turn = this.turn === 'O' ? 'X' : 'O';
                }

            },

        },
        created() {
            EvnetBus.$on('clickTd', this.onClickTd);
        }
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