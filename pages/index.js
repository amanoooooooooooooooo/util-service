import React from 'react'
import Layout from '../components/MyLayout.js'
import Request from '../func/Request'

const Index = (props) => (
  <Layout>
    <Request />
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
