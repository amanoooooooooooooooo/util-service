import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout'
import Link from 'next/link'
import { PhotoTypes } from '../../client/constant'

class Photo extends React.Component {
  state = {
    novels: [],
    filter: ''
  }

  render() {
    return <Layout>
      <div style={{ position: 'relative' }}>
        <h2>已爬取的图片</h2>
        {Object.keys(PhotoTypes).map(item => {
          return <div key={item}>
            <Link href={`/spider/photo/${item}`}>
              <a>{PhotoTypes[item].name}</a>
            </Link>
          </div>
        })}
      </div>
    </Layout>
  }
}

export default Photo
