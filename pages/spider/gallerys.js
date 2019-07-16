import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Fetch from '../../client/service.js'
import { PhotoTypes } from '../../client/constant'

class Gallerys extends React.Component {
    state = {
      gallerys: []
    }
    async componentDidMount () {
      const { query: { type } } = this.props.router
      console.log('Gallerys type', type)
      const res = await Fetch.get(`/spider/api/photo/${PhotoTypes[type].type}`)
      const { errMsg, payload } = res
      !errMsg && this.setState({
        gallerys: payload
      })
    }

    render () {
      const { gallerys } = this.state
      const { query: { type } } = this.props.router

      return <Layout>
        <div >
          {gallerys.map(item => {
            const { id, name } = item
            return <div key={id}>
              <Link href={`/spider/photo/${type}/${id}`}>
                <a>{name}</a>
              </Link>
            </div>
          })}
        </div>
      </Layout>
    }
}

export default withRouter(Gallerys)
