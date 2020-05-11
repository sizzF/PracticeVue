<template>
    <div>
        <h1>로또추첨기</h1>
        <div>
            <h2>1등번호</h2>
            <div>로또번호 : {{winnerNumbers}}</div>
        </div>
        <div>
            <h2>나의번호</h2>
            <div>로또번호 : {{myLottoNumbers}}</div>
            <div>보너스 : {{myBonusNumber}}</div>
        </div>
        <div>
            <h2>나는 몇등?</h2>
            <div>{{rank}}</div>
            <div>{{correctNumbers}}</div>
        </div>
        <template>
        <div>반복횟수 : {{count}}</div>
        <button @click="resetButton">다시받기</button>
        </template>
    </div>
</template>

<script>
    const getLottoNumbers = (repeatCount) => {
        let numbers = [];
        for (let i = 0; i<repeatCount; i++){
            let number = Math.floor(Math.random() * 45  + 1);
            if (!numbers.includes(number)){
                numbers.push(number);
            }
            else{
                i--;
            }
        }
        return numbers;

    };
     export default {
        name: "LottoGenerator2",
        data() {
            return {
                winnerNumbers: getLottoNumbers(6),
                myNumbers: getLottoNumbers(7),
                count: 0,
                rank: '',
                correctNumbers: '',
            }
        },
        computed: { //computed는 캐싱이됨 이부분말고 다른게 바뀔때는 캐싱되어있기때문에 다시 계산을 안해도됨
            myLottoNumbers(){
                return this.myNumbers.slice(0,6);
            },
            myBonusNumber(){
                return this.myNumbers.slice(6,7);
            },
        },
        methods:{
            resetButton(){
                this.myNumbers=getLottoNumbers(7);
                this.getRank();
                this.count++;
            },

            getRank(){
                let count = 0;
                let newNumbers = [];
                for( let number in this.winnerNumbers){
                    if(this.myNumbers.slice(0,6).includes(parseInt(number))){
                        count++;
                        newNumbers.push(number);
                    }
                }
                if (count === 6){
                    this.rank = '1등';
                }else if (count === 5){
                    if (this.winnerNumbers.includes(this.myNumbers.slice(6,7))){
                        this.rank ='2등'
                    }
                    this.rank = '3등';
                }else if (count === 4){
                    this.rank = '4등';
                }else if (count === 3){
                    this.rank = '5등';
                }else if (count === 2){
                    this.rank = '꽝';
                }else if (count === 1){
                    this.rank = '꽝';
                }else{
                    this.rank = '꽝';
                }

                this.correctNumbers = newNumbers;

            }

        },
        mounted() { //화면 관련된건 화면이 다만들어지고 난후 바꾸자 mounted에서
        },

        beforeDestroy() {
        },
        watch() {

        }
    }
</script>

<style scoped>

</style>