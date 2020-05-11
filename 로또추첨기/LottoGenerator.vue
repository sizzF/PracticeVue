<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :number="ball" :key="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>

<script>
    import LottoBall from "./LottoBall";
    const timeouts = [];
    function getWinNumbers(){
        console.log('getWinNumbers');
        const candidate = Array(45).fill().map((v,i) => i + 1);
        const shuffle = [];
        while(candidate.length>0){
            shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length-1];
        const winNumber = shuffle.slice(0,6).sort((p, c) => p - c);
        return [...winNumber, bonusNumber];

    }
     export default {
        name: "LottoGenerator",
         components: {
            'lotto-ball':LottoBall, //LottoBall -> lotto-ball로 자동으로됨 {LottoBall,}이렇게만 해도됨
         },
         data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false,
            };
        },
        computed: {

        },
        methods:{
            onClickRedo(){
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;
                this.showBalls();//watch에서 할수도있음 원래는 여기서 하는게 정답인거지 여기서 되도록쓰자 watch는 최후의 수단으로쓰자
            },
            showBalls(){
                for ( let i=0; i<this.winNumbers.length-1; i++){
                    timeouts[i]=setTimeout(() => {
                        this.winBalls.push(this.winNumbers[i]);
                    },(i+1) * 1000);
                }
                timeouts[6]=setTimeout(() => {
                    this.bonus=this.winNumbers[this.winNumbers.length-1];
                    this.redo=true;
                }, 7000)
            }
        },
        mounted() {
            this.showBalls();
        },
        beforeDestroy() {
            timeouts.forEach((t) => {
                clearTimeout(t);
            });
        },
        watch: {//어떤값이 바뀌는지 감시해서 그게 바뀌면 특정일을 실행
            //watch는 데이터바뀔때마다 실행되어서 문제되는경우가 생기니 조심해서쓰자 되도록 쓰지말자
            /*
            winBalls(val, oldval) {

                if(val.length === 0){
                    this.showBalls();
                }
            },

            bonus(val, oldval) {
                console.log(val, oldval);
                if(val === null){
                    this.showBalls();
                }
            },

            redo(val, oldval) {
                console.log(val, oldval);
                if(val === false){
                    this.showBalls();
                }
            },

             */
        },
    }
</script>

<style scoped>

</style>