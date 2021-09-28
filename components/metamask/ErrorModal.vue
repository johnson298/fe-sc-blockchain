<template>
    <el-dialog
        :visible.sync="isShow"
        centered
        width="30%"
        custom-class="modal-dark"
        :before-close="handleClose">
        <div  class="text-center">
            <div class="mb-1">
                <h1  class="title-head">Error Connecting</h1>
                <p class="text-16 mt-1">Connection to a wallet failed!</p>
            </div>
            <div class="mb-2">
                <img src="@/assets/images/icon/erorr-status.svg" width="50" />
            </div>
            <el-button type="primary" class="radius-10 fw-600" size="medium" icon="el-icon-refresh-right" @click="getMetaMask">
                Try again
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        isShow: Boolean
    },

    data() {
        return {

        }
    },

    methods: {
        ...mapActions('chain', ['connectMetaMask']),

        getMetaMask() {
            this.$emit('onSubmit')
            this.connectMetaMask()
        },

        handleClose() {
            this.$emit('onClose')
        }
    },
}
</script>

<style>

</style>
