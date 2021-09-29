export default {
  data () {
    return {
        formValidate: {},
        rules: {
            tokenName: [{
                required: true,
                max: 25,
                message: 'The name of the token. Max length is 25 symbols. Alphanumerical characters, space, and hyphen are accepted.',
                trigger: 'blur'
            },],
            tokenSymbol: [{
                required: true,
                max: 5,
                message: 'Max length is 5 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.',
                trigger: 'blur'
                }, {
                validator: this.isSymboValid,
                message: 'Max length is 5 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.'
            }],
            tokenDecimals: [{
                required: true,
                message: 'Defines the number of decimals for the token. 0-18 numerals are accepted. 18 is common practice.',
                trigger: 'blur'
            },
            {
                validator: this.checkDecimals,
                message: 'Defines the number of decimals for the token. 0-18 numerals are accepted. 18 is common practice.'
            }
            ],
            tokenSupply: [{
                required: true,
                message: 'Total amount of tokens to be generated. Minimum value is 1, and maximum 1,000,000,000,000,000.',
                trigger: 'blur'
            },
            {
                validator: this.checkSupply,
                message: 'Total amount of tokens to be generated. Minimum value is 1, and maximum 1,000,000,000,000,000.'
            }],
            numberOfCopies: [{
                required: true,
                message: 'Total amount of tokens to be generated. Minimum value is 1, and maximum 1,000,000,000,000,000.',
                trigger: 'blur'
            },
            {
                validator: this.checkSupply,
                message: 'Total amount of tokens to be generated. Minimum value is 1, and maximum 1,000,000,000,000,000.'
            }],
            supplyCap: [{
                validator: this.checkCapSupply,
                trigger: 'blur'
            }],
        }
    }
  },
  methods: {
    isSymboValid(rule, value, callback) {
        if (this.hasWhiteSpace(value)) {
          callback("");
          return
        }
        callback();
    },

    checkSupply(rule, value, callback) {
        const tmp = this.parseNumber(value)
        if (tmp > 1000000000000000 || tmp < 1) {
          callback("");
          return
        }
        callback();
    },

    checkDecimals(rule, value, callback) {
        if (value > 18 || value < 0) {
          callback("");
          return
        }
        callback();
    },

    checkCapSupply(rule, value, callback) {
        const tmp = this.parseNumber(value)

        if (this.formValidate.mintableToken != '') {
          if (tmp > 1000000000000000 || tmp < 1 || !tmp) {
            callback("Total amount of tokens to be generated. Minimum value is 1 and maximum 1,000,000,000,000,000.");
            return;
          } else if (tmp < this.parseNumber(this.formValidate.tokenSupply)) {
            callback("Please enter supply cap > initial supply!");
            return;
          }
          callback();
        }
        callback();
    }
  }
}
