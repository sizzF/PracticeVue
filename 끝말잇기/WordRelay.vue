<template>
    <div>
        <h1>끝말잇기</h1>
        <div>{{word}} 다음은?</div>
        <form v-on:submit="onSubmitForm">
            <input type="text" ref="answer" v-model="value">
            <button type="submit">입력</button>
        </form>
        <div id="result">{{result}}</div>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        name: "word-relay",
        props: ['startWord'],
        data() {
            return {
                word: this.startWord ,
                value: "",
                result: "",
            }
        },
        methods: {
            onSubmitForm(e) {
                e.preventDefault();

                if (this.word[this.word.length - 1] === this.value[0]) {
                    this.word = this.value;
                    this.value = "";
                    this.result = "정답";
                    this.$refs.answer.focus();
                } else {
                    this.value = "";
                    this.result = "땡";
                    this.$refs.answer.focus();
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