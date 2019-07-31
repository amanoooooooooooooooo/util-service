import React from 'react'
import Layout from '../../../components/MyLayout'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { PhotoTypes, LOCAL_PREFFIX } from '../../../client/constant'
import Fetch, { Result } from '../../../Fetch';
import { NextPageContext } from 'next';
import { mValue } from '../../../utils';
import { Oss } from '../../../types';

class Gallerys extends React.Component<any, any> {
  static async getInitialProps(props: NextPageContext) {
    let endpoint = LOCAL_PREFFIX
    if (!props.req) {
      endpoint = document.location.protocol + '//' + window.location.host
    }

    console.log('endpoint', endpoint)

    const { query: { type } } = props
    const pageNum = 1
    const pageSize = 20

    const res = await Fetch.get(endpoint + `/api/photo/${PhotoTypes[mValue(type)].type}`, { pageNum, pageSize })
    const { errMsg, payload }: Result<Oss[]> = res
    if (errMsg) {
      throw new Error(errMsg)
    }
    return {
      gallerys: payload,
      pageNum,
      pageSize
    }
  }
  state: {
    gallerys: Oss[]
    pageNum: number
    pageSize: number
  } = {
      gallerys: this.props.gallerys,
      pageNum: this.props.pageNum,
      pageSize: this.props.pageSize,
    }

  _query = async () => {
    const { pageSize, pageNum } = this.state
    const { query: { type } } = this.props.router
    console.log('Gallerys type', type)
    const res = await Fetch.get(`/api/photo/${PhotoTypes[type].type}`, { pageNum, pageSize })
    const { errMsg, payload }: Result<Oss[]> = res
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
  _next = () => {
    const { pageNum } = this.state
    this.setState({
      pageNum: pageNum + 1
    }, this._query)
  }

  render() {
    const { gallerys } = this.state
    const { query: { type } } = this.props.router

    return <Layout>
      <div >
        {gallerys.map(item => {
          const { id, name, createTime } = item
          return <div key={id} className="flex">
            <Link href={`/spider/photo/${type}/${id}`}>
              <a>{name}</a>
            </Link>
            <span>{createTime}</span>
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
