import { generateImageByIpfs } from '@/utils/helpers';
import { mapGetters } from 'vuex'
import { NETWORKS } from '@/const/chain'
import _ from 'lodash'

const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default {
    computed: {
        ...mapGetters(['getSymbolCoin']),
        
        ...mapGetters('chain', [
            'wallet',
        ])
    },

    methods: {
        scrollToNetwork() {
            document.getElementById('selectNetwork').scrollIntoView({ block: 'end',  behavior: 'smooth' });
        },

        toExponential (value) {
            if (parseInt(value) > 10000000)
                return parseInt(value).toExponential()
            return value
        },

        handleAwait () {
            var promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('Inside test await');
                }, 1000);
            });
            return promise;
        },

        isAudioType(name) {
            return /\.(mp3)$/i.test(name)
        },

        isVideoType(name) {
            return /\.(mp4)$/i.test(name)
        },

        hasWhiteSpace(str) {
            return /\s/g.test(str);
        },

        isValidNetwork(value, isShowNetworkFail = true) {
            const index = _.findIndex(NETWORKS, item => item.value == value)

            let isValid = false
            if (index > -1) {
                isValid = NETWORKS[index].chainId.includes(this.wallet.chainId)
            }
            if (!isValid && isShowNetworkFail) {
                this.$store.commit('chain/SHOW_NETWORK_FAIL')
            }
            return isValid
        },

        uploadImageByIpfs(bufferMedia) {
            return generateImageByIpfs(bufferMedia)
        },

        notifyMessage(message = '', title="Notification", type="warning") {
            this.$notify({
                title: 'Warning',
                message: message,
                type: type
            });
        },
        addressNumFilter(wallet) {
            let str =
                wallet.substr(0, 6) + '...' + wallet.substr(wallet.length - 6);
            return str;
        },

        formatMoney(number) {
            if (number) {
                return formatNumber(number.toString());
            }
            return '';
        },

        parseNumber(value) {
            if (!value) return 0
            if (typeof value == 'string') {
                return parseInt(value.replace(/,/g, ''))
            }
            return value
        }
    }
}
