import React from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const Index = (props) => (
  <Layout>
    <p>打印机(Printer)</p>
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

    <p>爬虫(Spider)</p>
    <Link href={`/spider/novel`}>
      <a>小说(novel)</a>
    </Link>
    <br />
    <Link href={`/spider/photo`}>
      <a>图片(photo)</a>
    </Link>
    <br />
    <br />

    <p>作品集(Collection)</p>
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
      <a>count down</a>
    </Link>
    {/* <br />
    <Link href={`/static/3dshow/index.html`}>
      <a>3d show</a>
    </Link> */}
    <br />
    <Link href={`/static/bgtranslation/index.html`}>
      <a>bg translation</a>
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
