<template>
    <div><!--가장 최상위는 template으로 못함 처음껀 div로 해야함 나중에 하는 방법이 있낀하다고함-->
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
        <div>
            <!--v-if는 테그자체가 존재하지않고 v-show는 태그는 있지만 display:none으로 되어있음 이차이 보통은 v-if를 더 많이 쓴다-->
            <template v-if="result.length"> <!--div로 묶어서 굳이 하고싶지않으면 template으로 묶어서 없는걸로 치는것처럼 할수있다.-->
                <div>반응시간 : {{responseTime}}ms</div>
                <div>평균시간 : {{average}}ms</div>
                <button @click="onReset">리셋</button>
                <div>정상 범위 : 200ms ~ 300ms</div>
            </template>


        </div>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        name: "ResponseCheck",
        data() {
            return {
                result: [],
                state: "waiting",
                message: "클릭해서 시작하세요!",
            }
        },
        computed: { //computed는 캐싱이됨 이부분말고 다른게 바뀔때는 캐싱되어있기때문에 다시 계산을 안해도됨
            average(){
                return this.result.reduce((a, c) => a+c, 0) / this.result.length || 0;
            },
            responseTime(){
                return this.result[this.result.length-1] || 0;
            },
        },
        methods:{
            onReset(){
                this.result=[];
                this.message='클릭해서 시작하세요!';
                this.state='waiting';
            },
            onClickScreen(){
                if (this.state === 'waiting'){
                    this.state='ready';
                    this.message='초록색이 되면 클릭하세요!';
                    timeout = setTimeout(() => {
                        this.state='now';
                        this.message='지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random() *1000) + 2000);
                }
                else if (this.state ==='ready'){
                    this.state='waiting';
                    this.message='너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
                    clearTimeout(timeout);
                }
                else if (this.state ==='now'){
                    this.state='waiting';
                    this.message='클릭해서 시작하세요';
                    endTime=new Date();
                    this.result.push(endTime-startTime)
                }
            }
        },
    }
</script>

<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>