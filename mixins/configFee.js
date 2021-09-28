import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
    data () {
        return {
            currentTypeFee: {
                serviceFee: null,
                mintableFee: null,
                burnableFee: null,
            }
        }
    },

    computed: {
        ...mapGetters(['getCurrentNetworkItems'])
    },

    methods: {
        getCurrentTypeFee() {
            const pathName = this.$route.name
            this.currentTypeFee = { ...this.getCurrentNetworkItems.fee[pathName] }
        }
    },
    
    watch: {
        getCurrentNetworkItems(val) {
            this.getCurrentTypeFee()
        }
    }
  }
  