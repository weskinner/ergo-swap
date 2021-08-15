import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useEffect } from "react"
import superagent from "superagent"
import {getAllNFTsFromTransactions} from "../lib/util"
import { useState } from "react"
import { StringParam, useQueryParam } from "use-query-params"

const IndexPage = () => {
  let [tokens, setTokens] = useState([])
  let [address,setAddress] = useQueryParam("address",StringParam)
  
  useEffect(() => {
    if(address) {
      async function fetchData() {
        let transactionsResponse = await superagent.get(`https://api.ergoplatform.com/api/v1/addresses/${address}/transactions`)
        let tokens = await getAllNFTsFromTransactions(transactionsResponse.body, address)
        setTokens(tokens)
      }
      fetchData()
    }
  })

  return (
    <Layout>
      <Seo title="Home" />
      {tokens.map(token => <div key={token.name}>{token.name} :: {token.description} :: <img src={token.image}></img></div>)}
      
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
}

export default IndexPage
