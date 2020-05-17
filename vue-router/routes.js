import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseball from '../숫자야구/NumberBaseball';
//import ResponseCheck from '../반응속도체크/ResponseCheck';
import RockPaperScissors from '../가위바위보/RockPaperScissors';
//import TicTacToe from '../틱택토Vuex/TicTacToe';
//import MineSweeper from '../지뢰찾기/MineSweeper';
import LottoGenerator from '../로또추첨기/LottoGenerator';
import GameMatcher from './GameMatcher';
Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/number-baseball', component: NumberBaseball},
        //{ path: '/respnse-check', component: ResponseCheck},
        { path: '/rock-paper-Scissors', component: RockPaperScissors},
        //{ path: '/tic-tac-toe', component: TicTacToe},
        //{ path: '/mine-sweeper', component: MineSweeper},
        { path: '/lotto', component: LottoGenerator},
        { path: '/game/:name', component: GameMatcher},//
    ],
});