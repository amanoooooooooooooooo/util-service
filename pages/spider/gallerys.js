import React from 'react'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Fetch from '../../client/service.js'
import { PhotoTypes } from '../../client/constant'

class Gallerys extends React.Component {
    state = {
      gallerys: [],
      pageNum: 1,
      pageSize: 20
    }
    componentDidMount () {
      this._query()
    }
    _query = async () => {
      const { pageSize, pageNum } = this.state
      const { query: { type } } = this.props.router
      console.log('Gallerys type', type)
      const res = await Fetch.get(`/spider/api/photo/${PhotoTypes[type].type}`, { pageNum, pageSize })
      const { errMsg, payload } = res
      !errMsg && this.setState({
        gallerys: payload
      })
    }
    _pre = () => {
      const { pageNum } = this.state
      if (pageNum === 1) {
        return
      }
      this.setState({
        pageNum: pageNum - 1
      }, this._query)
    }
    _next =() => {
      const { pageNum } = this.state
      this.setState({
        pageNum: pageNum + 1
      }, this._query)
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
          <div style={{ marginTop: '1rem' }} className='chapter-action'>
            <div onClick={this._pre} >上一页</div>
            <div onClick={this._next}>下一页</div>
          </div>
        </div>
      </Layout>
    }
}

export default withRouter(Gallerys)
