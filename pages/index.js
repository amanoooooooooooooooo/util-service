import React from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const Index = (props) => (
  <Layout>
    <p>打印机(printer)</p>
    <br />
    <Link href={`/printer/headers`}>
      <a>请求头(request header)</a>
    </Link>
    <br />
    <Link href={`/printer/position`}>
      <a>地址(geolocation)</a>
    </Link>
    <br />
    <Link href={`/printer/dns`}>
      <a>域名解析(dns)</a>
    </Link>
  </Layout>
)

// Index.getInitialProps = async function () {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()

//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {
//     shows: data
//   }
// }

export default Index
