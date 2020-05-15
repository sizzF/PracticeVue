<template>
    <div>
        <mine-form />
        <div>{{timer}}초</div>
        <table-component />
        <div>{{result}}</div>

    </div>


</template>

<script>
    import {mapState} from 'vuex';
    import store, {START_GAME, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, ORMALIZE_CELL, INCREMENT_TIMER} from './store';
    import MineForm from "./MineForm";
    import TableComponent from "./TableComponent";

    let timerInterval;
    export default {
        store,
        name: "MineSweeper",
         components: {
            MineForm,
            TableComponent
         },

        computed: {
            ...mapState([ "timer", "result", "halted"]),
        },
        methods: {

        },
        watch: {
            halted(value, oldValue){
                if(value === false){
                    timerInterval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                        },1000);//자바스크립트 타이머는 정확하지않음
                }
                else if(value === true){
                    clearInterval(timerInterval);
                }

            }
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