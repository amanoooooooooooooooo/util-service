import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Fetch from '../../client/service.js'
import { PhotoTypes } from '../../client/constant'

class Gallery extends React.Component {
    state = {
      gallery: []
    }
    async componentDidMount () {
      const { query: { id, type } } = this.props.router
      console.log('Gallery id %s type %s', id, type)
      const res = await Fetch.get(`/spider/api/photo/${PhotoTypes[type].type}/${id}`)
      const { errMsg, payload } = res
      !errMsg && this.setState({
        gallery: payload
      })
    }

    render () {
      const { gallery } = this.state

      return <Layout>
        <div >
          {gallery.map(item => {
            const { id, url, title, crawlUrl } = item
            return <div key={id}>
              <img alt={`${title}${url ? '' : ' (同步中)'}`} src={url.replace('http://192.168.1.6:8888/', 'http://util.online:8888/') || crawlUrl} />
            </div>
          })}
        </div>
      </Layout>
    }
}

export default withRouter(Gallery)
