export const CONTRACT_FACTORY_20 = {
  rinkeby: {
    chainId: '0x4',
    contractAddress: '0x093B38c795654ea5cD8e7Df874f123dA23298882',
    contractAbi: require("@/assets/abi/erc20.json"),
    contractUrl: 'https://rinkeby.etherscan.io/address/',
    transactionUrl: 'https://rinkeby.etherscan.io/tx/',
  },
  binance: {
    chainId: '0x61',
    contractAddress: '0x73416D2563A66Ad816e2cf58453AFb0146d09ECc',
    contractAbi: require("@/assets/abi/erc20.json"),
    contractUrl: 'https://testnet.bscscan.com/address/',
    transactionUrl: 'https://testnet.bscscan.com/tx/',
  },
}

export const CONTRACT_FACTORY_223 = {
    rinkeby: {
        chainId: '0x4',
        contractAddress: '0x74A4ef900fFbF9D8A7E44CbD6359a914D84a0ca6',
        contractAbi: require("@/assets/abi/erc223/factory.json"),
        contractUrl: 'https://rinkeby.etherscan.io/address/',
        transactionUrl: 'https://rinkeby.etherscan.io/tx/',
    },
    binance: {
        chainId: '0x61',
        contractAddress: '0x722aabB7dAA9C2F946cF5e7A4adD32CE226590a9',
        contractAbi: require("@/assets/abi/erc223/factory.json"),
        contractUrl: 'https://testnet.bscscan.com/address/',
        transactionUrl: 'https://testnet.bscscan.com/tx/',
    },
}

export const CONTRACT_FACTORY_777 = {
    rinkeby: {
        chainId: '0x4',
        contractAddress: '0xB3cF266EC9dA55FC385faD4F5db3b2533F943939',
        contractAbi: require("@/assets/abi/erc777/factory.json"),
        contractUrl: 'https://rinkeby.etherscan.io/address/',
        transactionUrl: 'https://rinkeby.etherscan.io/tx/',
    },
    binance: {
        chainId: '0x61',
        contractAddress: '',
        contractAbi: require("@/assets/abi/erc777/factory.json"),
        contractUrl: 'https://testnet.bscscan.com/address/',
        transactionUrl: 'https://testnet.bscscan.com/tx/',
    },
}

export const CONTRACT_FACTORY_721 = {
  ropsten: {
    chainId: '0x3',
    contractAddress: '0x6832D40588c83FB8fC5fc017F3cFFfFBDF278b6A',
    contractAbi: require("@/assets/abi/erc721/factory.json"),
    contractUrl: 'https://ropsten.etherscan.io/address/',
    transactionUrl: 'https://ropsten.etherscan.io/tx/',
  },
  rinkeby: {
    chainId: '0x4',
    contractAddress: '0x54a3fDeaA65B5aEcE6fE29784F562a37A9DeEc75',
    contractAbi: require("@/assets/abi/erc721/factory.json"),
    contractUrl: 'https://rinkeby.etherscan.io/address/',
    transactionUrl: 'https://rinkeby.etherscan.io/tx/',
  },
  binance: {
    chainId: '0x61',
    contractAddress: '0x35E6EafaEFbdb70b9c1a51c8Cd143D0B5BbF628A',
    contractAbi: require("@/assets/abi/erc721/factory.json"),
    contractUrl: 'https://testnet.bscscan.com/address/',
    transactionUrl: 'https://testnet.bscscan.com/tx/',
  },
}

export const CONTRACT_FACTORY_1155 = {
  rinkeby: {
    chainId: '0x4',
    contractAddress: '0x733650002665ffB5c5710B6C6dA4e6d01c8137e2',
    contractAbi: require("@/assets/abi/erc1155/factory.json"),
    contractUrl: 'https://rinkeby.etherscan.io/address/',
    transactionUrl: 'https://rinkeby.etherscan.io/tx/',
  },
  binance: {
    chainId: '0x61',
    contractAddress: '0xD82A2c20eFa52F76BBd16FB9a2BE652Ff1a15Ff6',
    contractAbi: require("@/assets/abi/erc1155/factory.json"),
    contractUrl: 'https://testnet.bscscan.com/address/',
    transactionUrl: 'https://testnet.bscscan.com/tx/',
  },
}

export default [
    {
        path: 'erc20',
        address: CONTRACT_FACTORY_20
    },
    {
        path: 'erc223',
        address: CONTRACT_FACTORY_223
    },
    {
        path: 'erc777',
        address: CONTRACT_FACTORY_777
    },
    {
        path: 'erc721',
        address: CONTRACT_FACTORY_721
    },
    {
      path: 'erc1155',
      address: CONTRACT_FACTORY_1155
    },
]

