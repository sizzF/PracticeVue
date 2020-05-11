<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import EvnetBus from "./EvnetBus";
    let win = false;
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                if(this.cellData) return;

                EvnetBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            }
        },



    }
</script>
