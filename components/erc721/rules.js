export default {
  formToken: {
    name: [
      {
      required: true,
      max: 25,
      message: 'The name of the token. Max length is 25 symbols. Alphanumerical characters, space, and hyphen are accepted.',
      trigger: 'blur'
    }],
    symbol: [{
      required: true,
      max: 5,
      message: 'Max length is 5 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.',
      trigger: 'blur'
    }, {
      message: 'Max length is 5 characters (example ETH, BTC, BAT, etc.). No spaces. Only alphanumerical characters.',
      validator: (rule, value, callback) => {
        function hasWhiteSpace(str) {
            return /\s/g.test(str);
        }

        if (hasWhiteSpace(value)) {
          callback("");
          return
        }
        callback();
      },
      trigger: 'blur'
    }],
    description: [{
      required: false,
      max: 255,
      message: 'Max length is 255 symbols. Alphanumerical characters, space, and hyphen are accepted.',
      trigger: 'blur'
    }]
  },

  formMetadata: {
    name: [{
      required: true,
      max: 25,
      message: 'The name of the token. Max length is 25 symbols. Alphanumerical characters, space, and hyphen are accepted.',
      trigger: 'blur'
    }],
    description: [{
      required: false,
      max: 255,
      message: 'Max length is 255 symbols. Alphanumerical characters, space, and hyphen are accepted.',
      trigger: 'blur'
    }]
  },
}
