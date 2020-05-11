<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import Vue from 'vue';
    let win = false;
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {

        },


    }
</script>
