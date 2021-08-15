import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  

  return (
    <Layout>
      <Seo title="Home" />
      <p>
        <Link to="/Wallet">Go to Wallet demo</Link> <br />
      </p>
    </Layout>
  )
}

export default IndexPage
