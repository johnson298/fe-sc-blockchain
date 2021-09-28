<template>
  <div class="home-page">
    <el-row :gutter="24">
      <el-col :span="24">
        <h3 class="title-main">How Creator Smart Contract can help you</h3>
        <p class="home-intro">Creator Smart Contract empowers its users, from rookies to experts, in creating various network-based mintable tokens of ERC-20 standards. The platform is stable and transparent because it is built on Smart Contracts using Blockchain Technology. Due to its protected cryptography model, it ensures the security of users' data and transactions. The entire system is intact and efficient and is believed to be one for the future. Designed with a customer-centric user interface, Token Launcher can be accessed to create, trade, and share tokens, even with limited knowledge.</p>
      </el-col>
    </el-row>
    <el-row class="row-item" :gutter="24">
      <el-col :span="10">
        <div class="h-item">
          <h5 class="title-home">a real dapp</h5>
          <p>This is site is a true DApp, 100% on-chain. There is no database or server side code. Your browser runs the web application locally on your computer and talks directly to the Ethereum blockchain through MetaMask.</p>
        </div>
        <div class="h-item">
          <h5 class="title-home">simplicity</h5>
          <p>It's easy to launch your own smart contracts with The Contract Factory. To use this site you should be viewing it in a DApp compatible browser. You can use MetaMask in the Chrome browser or a wallet application that can view Dapps. You can even issue commands to your smart contracts from this site.</p>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="img-cr">
          <img src="@/assets/images/home1.jpg" alt="">
        </div>
      </el-col>
    </el-row>
    <el-row class="row-item" :gutter="24">
      <el-col :span="10">
        <div class="img-cr">
          <img src="@/assets/images/home2.jpg" alt="">
        </div>
      </el-col>
      <el-col :span="14">
        <div class="h-item"><h5 class="title-home">security</h5>
          <p>There are no logins or accounts on this site. Your account is your Ethereum account and you log into your wallet. This site cannot and will never store any personal information.</p>
        </div>
        <div class="h-item"><h5 class="title-home">control</h5>
          <p>You are in control. When you launch a smart contract on The Contract Factory you become the owner. Nobody can control your contracts but you. All of our contracts are ownable and have owner-ownly commands. In addition, all of our non-token contracts include owner-only methods to recover lost Ether and tokens that may accidentally end up in your contracts.</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-item timeline-lst" :gutter="24">
      <el-col :span='10'>
        <div class="time-line-item left-timeline">
          <div class="icon">
            <div class="img"><img src="@/assets/images/icon/h-create-token.svg" alt=""></div>
            <span>Create Token</span>
          </div>
          <div class="content">Our experts are skilled enough to create tokens that are fully optimized within the network. This helps business firms to transact without any delay.</div>
        </div>
        <div class="time-line-item left-timeline">
          <div class="icon">
            <div class="img"><img src="@/assets/images/icon/h-manage-token.svg" alt=""></div>
            <span>Manage Token</span>
          </div>
          <div class="content">Once created, your tokens can be managed in the Token Manager dashboard which caters to your requirements of buying, selling, and burning tokens in a seamless manner.</div>
        </div>
        <div class="time-line-item left-timeline">
          <div class="icon">
            <div class="img"><img src="@/assets/images/icon/h-instruction.svg" alt=""></div>
            <span>Instruction</span>
          </div>
          <div class="content">This document provides a baseline knowledge of security considerations for intermediate Solidity programmers. It is maintained by V2B Lab, with contributions from our friends in the broader Ethereum community.</div>
        </div>
      </el-col>
      <el-col :span="4" class="px-0">
        <div class="time-line-img">
          <img src="@/assets/images/icon/timeline.svg" alt="">
        </div>
      </el-col>
      <el-col :span='10'>
        <div class="time-line-item right-timeline">
          <div class="icon">
            <div class="img"><img src="@/assets/images/icon/h-api.svg" alt=""></div>
            <span>API</span>
          </div>
          <div class="content">
            <p>Non-template smart contracts can be developed for your projects in almost any area of business. Developers can integrate smart contracts into existing solutions.</p>
            <p>A smart contract developer can create architecture for your existing or newly developed software solutions using blockchain platforms and smart contracts.</p>
          </div>
        </div>
        <div class="time-line-item right-timeline">
          <div class="icon">
            <div class="img"><img src="@/assets/images/icon/h-request-audit.svg" alt=""></div>
            <span>Request Audit</span>
          </div>
          <div class="content">
            <p>The smart contract audit service includes:</p>
            <p>- checks against known vulnerabilities that are relevant to the unique business logic of each smart contract.</p>
            <p>- provides verification that the smart contract is free from logical</p>
            <p>- access control issues and an assessment of compliance with the Solidity Code Style guide.</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-item" :gutter="24">
      <el-col :span="24">
        <div class="box-info" v-for="(item, index) in contracts" :key="`contract_${index}`">
            <h5 class="title">{{item.type}}</h5>
            <h6>
              <nuxt-link :to="item.to">Create {{item.type}} token</nuxt-link>
            </h6>
            <p>{{item.content}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: 'default',
  name: 'home',
  data() {
    return {
      contracts: [
        {
          type: 'ERC 20',
          to: '/erc20',
          content: 'ERC20 token development is undertaken to make advancements within the blockchain network. According to the traditional form of financial business companies who have listed their shares on the IPOs can be sold to other companies to raise funds for the business.'
        },
        /*{
          type: 'ERC 777',
          to: '/erc777',
          content: 'The ERC777 tokens are taken as a benchmark for the grant and protection handling tokens within the blockchain network. Protected tokens are the ones which are protected from any kind of malware and hackers. The value of tokens can be compared to the traditional form of financial businesses.'
        },*/
        {
          type: 'ERC 721',
          to: '/erc721',
          content: 'ERC721 is a much more refined token and it cannot be exchanged when compared to others. ERC20 tokens resemble money whereas ERC721 resembles collectables which is equivalent to a pack of cards. Moreover, every token within the ERC721 network is authorized in nature.'
        },
        {
          type: 'ERC 1155',
          to: '/erc1155',
          content: 'This standard outlines a smart contract interface that can represent any number of fungible and non-fungible token types. The ERC-1155 Multi Token Standard allows for each token ID to represent a new configurable token type, which may have its own metadata, supply and other attributes.'
        },
      ]
    }
  }
}
</script>
