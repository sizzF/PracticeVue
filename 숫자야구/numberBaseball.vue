<template>
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmitForm">
            <input type="text" minlength="4" maxlength="4" ref="answer" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>시도 : {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{t.try}}</div>
                <div>{{t.value}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNunmbers = () =>{
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for (let i = 0; i<4; i++){
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    };

    export default {
        data() {
            return {
                answer: getNunmbers(), // [1,2,3,4]
                value: '', // 입력
                tries: [], // 시도 수
                result: '', // 결과

            }
        },
        methods: {
            onSubmitForm(e) {
                if (this.value === this.answer.join('')){
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = '홈런';
                    alert('게임을 다시 실행합니다.');
                    this.restartGame();


                }
                else {
                    if (this.tries.length >= 9){ //10번째 시도
                        this.result=`10번넘게 틀려서 실패 답은 : [${this.answer.join(',')}] 이였습니다.`;
                        alert('게임을 다시 실행합니다.');
                        this.restartGame();

                    }
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v)); //문자열 숫자 배열로 바꿔주는 코드 공부하자
                    for (let i = 0; i<4; i++){
                        if (answerArray[i] === this.answer[i]){
                            strike += 1;
                        }
                        else if (this.answer.includes(answerArray[i])){
                            ball += 1;
                        }
                    }

                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크  ${ball} 볼.`,
                    })
                    this.value = '';
                    this.$refs.answer.focus();
                }

            },
            restartGame(){
                this.answer=getNunmbers();
                this.value = '';
                this.tries = [];
                this.$refs.answer.focus();
            }
        }
    }
</script>

<style>

</style>