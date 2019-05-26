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
    <br />
    <br />

    <p>作品集(Collection)</p>
    <br />
    <Link href={`/static/2048/index.html`}>
      <a>2048</a>
    </Link>
    <br />
    <Link href={`/static/handwrite/index.html`}>
      <a>handwrite</a>
    </Link>
    <br />
    <Link href={`/static/wow/index.html`}>
      <a>wow</a>
    </Link>
    <br />
    <Link href={`/static/countdown/index.html`}>
      <a>countdown</a>
    </Link>
    <br />
    <Link href={`/static/3dshow/index.html`}>
      <a>3dshow</a>
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
