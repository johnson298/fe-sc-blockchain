<template>
  <div>
      <h1 style="color: #fff">Test Metamask</h1>
      <p>&nbsp;</p>
      <div>
          <input type="file" @change="uploadFile">
      </div>
      <button @click="connect">Connect</button>
      <button @click="makeIpfs">Make Ipfs</button>
      <button @click="connectContract">Connect Contract</button>
  </div>
</template>

<script>
import Web3 from 'web3'
import _ from 'lodash'

import {mapActions} from 'vuex';

export default {
    // mixins: [Web3],

    data() {
        return {
            buffer: ''
        }
    },

    computed: {
        account () {
            return this.$store.state.chain.account
        },
    },

    mounted() {

    },

    methods: {
      ...mapActions({
        createToken: 'chain/createToken'
      }),
        connect () {
            this.$store.dispatch('chain/connectMetaMask')
        },

        uploadFile(event) {
            event.preventDefault();
            const file = event.target.files[0]
            // console.log('file', file);
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                this.buffer = Buffer(reader.result)
                console.log('buffer', this.buffer);
            }
        },



        async makeIpfs() {

            const { create, urlSource } = require('ipfs-http-client')
            // const ipfs = create()
            const ipfs = create('/ip4/127.0.0.1/tcp/3000', { protocol: 'http'})

            //Upload file
            const result = await ipfs.add(this.buffer)
            console.log(result)


            //Upload metadata json
            // const metadata = {
            //     name: 'Name',
            //     description: '',
            //     image: 'https://ipfs.io/ipfs/QmahgtquDJmFKYiHD2P5xCYzsu7wTcbxpb4wM3H5kg5mBL',
            //     attibutes: {

            //     }
            // }

            // const { cid: metadataCid } = await  ipfs.add({
            //     path: '/nft/metadata.json',
            //     content: JSON.stringify(metadata)
            // })

            // console.log('cid', metadataCid);




        },

        connectContract() {

            const web3 = new Web3(window.ethereum);

            let contract = new web3.eth.Contract(require('@/assets/abi/erc721/mint.json'), '0x129920B8a65dBEdA8b830a4763BbA51Cf9f85305')

            contract.methods.mintToken('0x5BD5536A9101036338fc1DE96633143c15430346', 'https://ipfs...')
                .send({ from: '0x5BD5536A9101036338fc1DE96633143c15430346' })

                .on('transactionHash', function(transactionHash){
                })
                .on('receipt', function(receipt) {
                    console.log('receipt', receipt);
                })
                .on('error', function(error, receipt) {
                    console.log('errorrrr')
                });
        },

    },
}
</script>

<style>

</style>
