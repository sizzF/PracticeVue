<template>
    <div>
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
        <div>
            <div>반응시간 : {{result[result.length-1] || 0}}ms</div>
            <div>평균시간 : {{result.reduce((a, c) => a+c, 0) / result.length || 0}}ms</div>
            <button @click="onReset">리셋</button>
            <div>정상 범위 : 200ms ~ 300ms</div>


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