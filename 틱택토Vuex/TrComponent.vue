<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :key="index" :cell-index="index" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
    import {mapState} from 'vuex';
    import TdComponent from './TdComponent';
    export default {
        computed: {
            ...mapState({
                rowData(state) {
                    return state.tableData[this.rowIndex];
                }
            }),
            /*rowData() {
                return this.$store.state.tableData[this.rowIndex];
            }*/
        },
        props: {
            rowIndex: Number,
        },
        components: {
            TdComponent,
        },
    }
</script>
