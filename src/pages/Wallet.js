import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useEffect, useState } from "react"
import superagent from "superagent"
import { getAllNFTsFromTransactions } from "../lib/util"
import { StringParam, useQueryParam } from "use-query-params"

const Token = (token) => {
  return (
    <div 
      key={token.name}
      style={{
        width: "300px",
        height: "400px",
        display: "inline-block",
        marginLeft: "20px",
        marginRight: "20px",
      }}>
      <img 
        src={token.image} 
        style={{
          width: "300px",
          height: "300px",
        }}></img>
      <div 
        style={{
          textAlign:"center", 
          textOverflow:"ellipsis", 
          overflow:"hidden",
          whiteSpace:"nowrap"}}
        title={token.name}>{token.name}</div>
    </div>
  )
}

const Wallet = () => {
  let [tokens, setTokens] = useState([])
  let [address, setAddress] = useQueryParam("address", StringParam)
  let [addressInput, setAddressInput] = useState("")

  useEffect(() => {
    if (address) {
      async function fetchData() {
        let transactionsResponse = await superagent.get(`https://api.ergoplatform.com/api/v1/addresses/${address}/transactions`)
        setTokens(await getAllNFTsFromTransactions(transactionsResponse.body, address))
      }

      fetchData()
    }
  },[address])

  if(address) {
    return (
      <Layout>
        <Seo title="Wallet" />
        <h2
          style={{
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow:"hidden",
            whiteSpace:"nowrap"
          }}>Address {address}</h2>
        {tokens.length ? 
          tokens.map(token => Token(token))
          : <h3>...Loading...</h3>}
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Seo title="Wallet" />
        <p>Enter Address:<input type="text" onChange={(e) => setAddressInput(e.target.value)}></input>
          <button onClick={() => setAddress(addressInput)}>Set</button>
        </p>
      </Layout>
    )
  }
}

export default Wallet
