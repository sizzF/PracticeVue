<template>
    <div>
        <span>세로 : </span>
        <input type="number" placeholder="세로" :value="row" @change="onChangeRow" />
        <span>가로 : </span>
        <input type="number" placeholder="가로" :value="cell" @change="onChangeCell" />
        <span>지뢰 : </span>
        <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine" />
        <button @click="onClickStart">게임시작</button>
    </div>
</template>

<script>
    import {START_GAME} from "./store";

    export default {
        name: "MineForm",

        data(){
            return {
                row: 10,
                cell: 10,
                mine: 20,
            };
        },

        methods: {
            onChangeRow(e) {
                this.row = e.target.value;
            },
            onChangeCell(e) {
                this.cell = e.target.value;
            },
            onChangeMine(e) {
                this.mine = e.target.value;
            },
            onClickStart() {
                this.$store.commit(START_GAME, {row: this.row, cell: this.cell, mine: this.mine});
            }
        }
    }
</script>

<style scoped>

</style>