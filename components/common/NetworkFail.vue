<template>
    <el-dialog
        :visible.sync="visible"
        center
        width="30%"
        custom-class="modal-light-blue"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="text-center">
            <div class="mb-1">
                <h1 class="title-head">Wrong Network</h1>
                <p class="mt-2">Please connect to the appropriate network.</p>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            // isVisible: false
        };
    },
    computed: {
        ...mapState({
            isVisible: state => state.chain.isShowNetworkFail
        }),
        ...mapGetters('chain', [
            'isConnection'
        ]),

        visible() {
            return this.isVisible && this.isConnection
        }
    },

    methods: {
        handleClose(done) {
            this.$store.commit('chain/SHOW_NETWORK_FAIL')
        }
    }
}
</script>

<style>

</style>