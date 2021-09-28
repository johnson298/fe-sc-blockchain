<template>
    <el-dialog
        :visible.sync="isShow"
        centered
        width="30%"
        custom-class="modal-light-blue"
        :before-close="handleClose">
        <div class="text-center">
            <div class="mb-1">
                <h1 class="title-head saving">Initializing<span>.</span><span>.</span><span>.</span></h1>
            </div>
            <el-row class="transaction-setting-form mt-2 mb-2">
                <el-col :span="6">
                    <img src="@/assets/images/creator.svg">
                </el-col>
                <el-col :span="4">
                    <span><img src="@/assets/images/arrow.svg"></span>
                    <span><img src="@/assets/images/arrow.svg"></span>
                    <span><img src="@/assets/images/arrow.svg"></span>
                </el-col>
                <el-col :span="4">
                    <img src="@/assets/images/icon/metamask.svg" width="50px">
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        isShow: Boolean
    },

    data() {
        return {
            
        }
    },

    methods: {
        handleClose() {
            this.$emit('onClose')
        }
    },
}
</script>

<style>

</style>