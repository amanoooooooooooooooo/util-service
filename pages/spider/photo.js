import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import Fetch from '../../client/service.js'
import { PhotoTypes } from '../../client/constant'

class Photo extends React.Component {
    state = {
      novels: [],
      filter: ''
    }
    crawlUrl= {}
    name= {}

    componentDidMount () {
      this.query()
    }
    async query () {
      const res = await fetch('./api/oss').then(res => res.json())
      const { errMsg, payload: novels } = res
      !errMsg && this.setState({
        novels
      })
    }
    filter = (e) => {
      const filter = e.target.value
      this.setState({ filter })
    }

    add = async () => {
      const name = this.name.value
      const crawlUrl = this.crawlUrl.value
      if (!name) {
        alert('请输入小说名')
        return
      }
      const { errMsg } = await Fetch.post('/spider/api/novel', { name, crawlUrl })

      if (!errMsg) {
        alert('成功')
        this.query()
      } else {
        alert(errMsg)
      }
    }
    render () {
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
