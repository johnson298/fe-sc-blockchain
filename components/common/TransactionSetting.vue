<template>
    <el-dialog
        :visible.sync="isShow"
        center
        width="370px"
        top="24vh"
        custom-class="modal-light-blue radius-10"
        :before-close="handleClose">
        <div class="text-center">
            <div class="mb-1">
                <h1 class="title-head d-flex items-center justify-center">Transaction Settings
                  <el-tooltip class="item" popper-class="blue-light tooltip-setup-trans1" effect="dark" placement="top-end">
                    <template #content>
                      <p>Your transaction will revert if it is pending for more than this period of time.</p>
                    </template>
                    <div class="icon-header">
                      <div class="img">
                          <img src="@/assets/images/icon/info.svg" class="ml-1" />
                      </div>
                    </div>
                  </el-tooltip>
                </h1>
            </div>
            <el-row class="transaction-setting-form mt-2">
                <el-col :span="6">
                    <el-input v-model="time" v-valid-regex="/^[0-9.]*$/" class="text-16"></el-input>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4"><span class="text-16">Minutes</span></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <p class="text-danger text-center mt-1">{{ message }}</p>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            dialogVisible: false,
            time: 30,
            message: '',
            timer: 0
        };
    },

    mounted() {

    },

    watch: {
        time(val) {
            this.message = ''
            if (!val || val > 180) {
                this.message = 'Transaction time is required and must be a positive decimal. Max time is 180 minutes.	'
            }

            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if (parseInt(val) === 0 || this.countDecimals(val) > 1) {
                    this.time = 30
                }
            }, 800);

            // localStorage.setItem('time-setting', this.time)
        }
    },

    methods: {
        handleClose() {
            if (this.time) this.$emit('onClose')
        },

        countDecimals() {
            if(Math.floor(this.time) == this.time) return 0;
            return this.time.toString().split(".")[1].length || 0;
        }
    }
}
</script>

<style lang="scss" scoped>

.transaction-setting-form {
    .el-input {
        .el-input__inner {
            line-height: 20px;
        }
    }

    span {
        line-height: 20px;
    }
}
.icon-header {
  height: 100px;
  position: absolute;
  right: 28px;
  display: flex;
  align-items: center;
}
.title-head{
  position: relative;
}
</style>
