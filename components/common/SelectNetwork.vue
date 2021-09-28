<template>
    <el-select v-model="network" placeholder="" id="selectNetwork">
        <el-option label="SelectedNetwork" :value="0"></el-option>
        <el-option v-for="(item, index) in NETWORKS" :key="index" :label="item.name" :value="item.value"></el-option>
    </el-select>
</template>

<script>
import { NETWORKS } from '@/const/chain';
import { mapActions } from 'vuex'

export default {
    props: {
        value: Number, String
    },

    data() {
        return {
            NETWORKS,
            network: 1
        }
    },

    mounted() {
        this.setCurrentNetwork(this.network)
    },

    methods: {
        ...mapActions(['setCurrentNetwork'])
    },

    watch: {
        network(val) {
            this.setCurrentNetwork(val)
            this.isValidNetwork(val)
        }
    }
}
</script>

<style>

</style>