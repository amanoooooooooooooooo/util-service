import React from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const Index = (props) => (
  <Layout>
    <p>打印机(Printer)</p>
    <br />
    <Link href={`/printer/headers`}>
      <a>请求头(Request Header)</a>
    </Link>
    <br />
    <Link href={`/printer/position`}>
      <a>地址(Geolocation)</a>
    </Link>
    <br />
    <Link href={`/printer/dns`}>
      <a>域名解析(Dns)</a>
    </Link>
    <br />
    <Link href={`/printer/portforwarding`}>
      <a>端口转发(Port Forwarding)</a>
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
