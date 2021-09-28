<template>
    <fragment>
        <el-dialog
            :visible.sync="isShowModal"
            width="35%"
            :before-close="handleClose">
            <div class="text-center p-2 mt-2">
                <h1 class="main-title">You need an connect to a wallet <br/> to use Creator Smart Contract</h1>
                <div class="mt-2 mb-2">
                    <img src="@/assets/images/metamask_lager.png">
                </div>
                <el-button type="primary" 
                    class="radius-10 bg-violet-overlay mt-2 connect-metamask-btn" 
                    @click="getMetaMask">
                    Get MetaMask
                </el-button>
            </div>
        </el-dialog>
        <loading-modal :isShow="showLoadingModal" @onClose="handleLoadingClose"></loading-modal>
        <error-modal 
            :isShow="showErorrModal" 
            @onClose="showErorrModal = false"
            @onSubmit="tryMetaMask"></error-modal>
    </fragment>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ErrorModal from './ErrorModal.vue';
import LoadingModal from './LoadingModal.vue';

export default {
    components: { LoadingModal, ErrorModal },

    data() {
        return {
            showLoadingModal: false,        
            showErorrModal: false   
        }
    },

    computed: {
        ...mapGetters('chain', ['wallet', 'isConnection', 'isShowModal', 'isConnectFail']),
    },

    methods: {
        ...mapActions('chain', [
            'switchTypeFactory',
            'showMetaMaskModal',
            'connectMetaMask',
        ]),

        getMetaMask() {
            this.showMetaMaskModal()
            this.connectMetaMask()
            this.showLoadingModal = true
        },

        tryMetaMask() {
            this.connectMetaMask()
            this.showLoadingModal = true
            this.showErorrModal = false
        },

        handleClose() {
            this.showMetaMaskModal()
        },

        handleLoadingClose() {
            this.showLoadingModal = false
        }
    },

    watch: {
        isConnection(val) {
            if (val) {
                this.switchTypeFactory()
                setTimeout(() => {
                    this.showLoadingModal = false
                }, 1500)
            }
        },
        isConnectFail(val) {
            if (val) {
                this.showLoadingModal = false
                this.showErorrModal = true
            }
        }
    }
}
</script>

<style lang="scss">

.connect-metamask-btn {
    width: 230px !important;
    font-weight: 600 !important;
}

</style>