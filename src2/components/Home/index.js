import React, { Component } from 'react'
import Web3 from "web3";
import test from "../../contracts/test.json";
import "./index.css"
import data from "../Login/data.json"

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        if (typeof this.web3 != 'undefined') {
            this.web3Provider = this.web3.currentProvider
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
        }
        this.web3 = new Web3(this.web3Provider)
    }
    web3
    account={

    }

    componentDidMount(){
        if (window.ethereum) {
            // use MetaMask's provider
            this.web3 = new Web3(window.ethereum);
            window.ethereum.enable(); // get permission to access accounts
        } else {
            console.warn(
              "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
            );
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(
              new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
        }
        this.start()
    }

    start = async function() {
        const { web3 } = this;

        try {
            // get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = test.networks[networkId];

            this.meta = new web3.eth.Contract(
                test.abi,
                "0x71447f57a7ec3e7f9d85912537a5465a6a64b531",
                // deployedNetwork.address,
            );
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];
        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    }

    
    changeProvider8545 = async function() {
        try {
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            const { web3 } = this;
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            document.getElementById("ProviderNow").innerHTML = 8545;
        } catch (error) {
            console.log(error);
        }
    }

    changeProvider9545= async function() {
        try {
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
            const { web3 } = this;
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            document.getElementById("ProviderNow").innerHTML = 9545;
        } catch (error) {
            console.log(error);
        }
    }

    initiateCorp_=  async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];

        const INFO = document.getElementById("Info").value;
        const ADDR = document.getElementById("Addr").value;
        const TYPE = document.getElementById("Type").value;

        const { initCorp } = this.meta.methods;
        await initCorp(ADDR, INFO, TYPE).send({ from: this.account, gas: 3000000});

    }

    queryCorp_= async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];

        const ADDR = document.getElementById("QueryAddr").value;

        const { queryCorp } = this.meta.methods;
        await queryCorp(ADDR).call().then (
            function(corpData) {
                console.log(corpData);
                document.getElementById('QueryCorpAddr').innerHTML = ADDR;
                document.getElementById('QueryCorpInfo').innerHTML = corpData.Info;
                document.getElementById('QueryCorpCERs').innerHTML = corpData.CERs;
                document.getElementById('QueryCorpQuota').innerHTML = corpData.Quota;
                document.getElementById('QueryCorpMoney').innerHTML = corpData.Money;
                document.getElementById('QueryCorpType').innerHTML = corpData.Type;
            }
        );
    }

    transferQuota_=  async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];

        const fromADDR = document.getElementById("QuotaFromCorp").value;
        const toADDR = document.getElementById("QuotaToCorp").value;
        const tmpCERs = document.getElementById("Quota").value;
        const tmpMoney = document.getElementById("Money0").value;

        const { transferQuota } = this.meta.methods;
        await transferQuota(fromADDR, toADDR, tmpCERs, tmpMoney).send({ from: this.account, gas: 3000000});
    }

    transferCERs_= async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];

        const fromADDR = document.getElementById("CERsFromCorp").value;
        const toADDR = document.getElementById("CERsToCorp").value;
        const tmpCERs = document.getElementById("CERs").value;
        const tmpMoney = document.getElementById("Money1").value;

        const { transferCERs } = this.meta.methods;
        await transferCERs(fromADDR, toADDR, tmpCERs, tmpMoney).send({ from: this.account, gas: 3000000});
    }

    initTradeQuest_= async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];

        const { initTradeQuest } = this.meta.methods;
        const toCorpAddr = document.getElementById("TradeQuestToAddr").value
        await initTradeQuest(toCorpAddr, true, 10, 10).send({ from: this.account, gas: 3000000});
    }

    queryTrade_= async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        this.account = accounts[0];
        var tmpAccount = accounts[0];

        const { queryCorpList } = this.meta.methods;
        const { queryTradeQuest } = this.meta.methods;
        await queryCorpList().call().then (
            function(corpAddrList) {
                for(var i = 0; i < corpAddrList.length; i++){
                    console.log(corpAddrList[i]);
                    queryTradeQuest(tmpAccount, corpAddrList[i]).call().then (
                        function(tmpQuest) {
                            console.log(corpAddrList[i], tmpQuest);
                        }
                    );
                }
            }
        );
    }

    replyTradeQuest_= async function() {
        const { web3 } = this;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        var account = accounts[0];
        console.log(account);
        const { replyTradeQuest } = this.meta.methods;
        const toAddr = document.getElementById("ReplyToAddr").value;
        console.log(toAddr)
        await replyTradeQuest(account, toAddr).send({ from: account, gas: 3000000});
    }

    render() {
        this.start()
        return (
            <div>
                <h1>Green Chain — Example Truffle Dapp</h1>
                <p id='ProviderNow'> </p>
                <button onClick={this.changeProvider8545()}> Port 8545 </button>
                <button onClick={this.changeProvider9545()}> Port 9545 </button>

                <h1>Initiate Corporation</h1>

                <p> 地址 </p>
                <input type="address" id="Addr" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <p> 信息 </p>
                <input type="string" id="Info" placeholder="e.g. info" />
                <p> 类型 </p>
                <input type="bool" id="Type" placeholder="e.g. true" />
                <button onClick={this.initiateCorp_()}> 记录公司 </button>
                <p> -------------------------------------------- </p>

                <h1>Query Corporation Data</h1>

                <p> 地址 </p>
                <input type="address" id="QueryAddr" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <p id="QueryCorpAddr"> </p>
                <p id="QueryCorpInfo"> </p>
                <p id="QueryCorpCERs"> </p>
                <p id="QueryCorpQuota"> </p>
                <p id="QueryCorpMoney"> </p>
                <p id="QueryCorpType"> </p>

                <button onClick={this.queryCorp_()}> 查询信息 </button>

                { /**<p> -------------------------------------------- </p>

                <h1> Transfer Quota </h1>

                <input type="address" id="QuotaFromCorp" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <input type="address" id="QuotaToCorp" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <input type="int" id="Quota" placeholder="e.g. 10" />
                <input type="int" id="Money0" placeholder="e.g. 10" />

                <button onClick="App.transferQuota_()"> Quota 转账 </button>

                <p> -------------------------------------------- </p>

                <h1> Transfer CERs </h1>

                <input type="address" id="CERsFromCorp" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <input type="address" id="CERsToCorp" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <input type="int" id="CERs" placeholder="e.g. 10" />
                <input type="int" id="Money1" placeholder="e.g. 10" />

                <button onClick="App.transferQuota_()"> CERs 转账 </button> */ }

                <p> -------------------------------------------- </p>

                <h1> Initiate Trade Quest </h1>

                <input type="address" id="TradeQuestToAddr" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <button onClick={this.initTradeQuest_()}> 发出交易请求 </button>

                <p> -------------------------------------------- </p>

                <h1> Query All Trade Quest </h1>

                <button onClick={this.queryTrade_()}> 查询发给该账户的交易请求 </button>

                <p> -------------------------------------------- </p>

                <h1> Reply Trade Quest </h1>

                <input type="address" id="ReplyToAddr" placeholder="e.g. 0x18E31dC556026B8f45793D93b4e2383e4dD1Cb74" />
                <button onClick={this.replyTradeQuest_()}> 回应交易请求 </button>

            </div>
        )
    }
}
