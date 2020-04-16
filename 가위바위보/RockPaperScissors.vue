<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <Button v-on:click="onClickButton('바위')">바위</Button>
            <Button @click="onClickButton('보')">보</Button>
            <Button @click="onClickButton('가위')">가위</Button>
        </div>
        <div>{{result}}</div>
        <div>현재 점수 : {{score}} </div>
    </div>
</template>

<script>
    const rspCords = {
        바위: '0',
        가위: '-142px',
        보: '-284px',
    };
    const scores = {
        바위: 1,
        가위: 0,
        보: -1,
    };
    const computerChoice = (imgCord) =>{
        return Object.entries(rspCords).find(function(v) {
            return v[1] === imgCord;
        })[0];
    };
    let interval = null;
    export default {
        name: "RockPaperScissors",
        data() {
            return {
                result: "버튼을 눌러 승부를 겨뤄보세요",
                score: 0,
                imgCord: rspCords.바위,
            }
        },
        computed: { //computed는 캐싱이됨 이부분말고 다른게 바뀔때는 캐싱되어있기때문에 다시 계산을 안해도됨
            computedStyleObject() {
                return {
                    background: `url('https://en.pimg.jp/023/182/267/1/23182267.jpg') ${this.imgCord} 0 `
                };
            }
        },
        methods:{
            changeHand(){
                interval = setInterval(() => {
                    if (this.imgCord === rspCords.바위){
                        this.imgCord = rspCords.가위;
                    }
                    else if (this.imgCord === rspCords.가위){
                        this.imgCord = rspCords.보;
                    }
                    else if (this.imgCord === rspCords.보){
                        this.imgCord = rspCords.바위;
                    }
                }, 100);
            },
            onClickButton(choice){
                clearInterval(interval);
                const myScore = scores[choice];
                const computerScore = scores[computerChoice(this.imgCord)];
                const diff = myScore-computerScore;
                if (diff === 0){
                    this.result = '비겼습니다';
                } else if([1,-2].includes(diff)){
                    this.result = '이겼습니다. +1';
                    this.score++;
                } else if([-1,2].includes(diff)){
                    this.result = '졌습니다. -1';
                    this.score--;
                }
                setTimeout(() => {
                    this.changeHand();
                }, 1000)
            },
        },
        created() {
            console.log('created');
        },
        mounted() { //화면 관련된건 화면이 다만들어지고 난후 바꾸자 mounted에서
            console.log('mounted');
            this.changeHand();
        },
        updated() {
            console.log('updated');
        },
        beforeDestroy() {
          clearInterval(interval);
        },
        destroyed() {
            console.log('destroyed');

        }
    }
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>