<template>
    <div v-if="currentGame === 'number-baseball'">
        <number-baseball></number-baseball>
    </div>
    <div v-else-if="currentGame === 'rock-paper-scissors'">
        <rock-paper-scissors></rock-paper-scissors>
    </div>
    <div v-else-if="currentGame === 'lotto'">
        <lotto-generator></lotto-generator>
    </div>
    <div v-else>일치하는 게임이 없습니다.</div>
</template>

<script>
import NumberBaseball from '../숫자야구/NumberBaseball';
//import ResponseCheck from '../반응속도체크/ResponseCheck';
import RockPaperScissors from '../가위바위보/RockPaperScissors';
//import TicTacToe from '../틱택토Vuex/TicTacToe';
//import MineSweeper from '../지뢰찾기/MineSweeper';
import LottoGenerator from '../로또추첨기/LottoGenerator';

export default {
    components: {
        NumberBaseball,
        RockPaperScissors,
        LottoGenerator,
    },
    mounted() {
        console.log(this.$router);
        console.log(this.$route);

    },
    computed: {
        currentGame() {
            return this.$route.params.name;
        }
    }
}
</script>