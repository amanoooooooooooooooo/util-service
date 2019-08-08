import React from 'react'
import Layout from '../../../components/MyLayout'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Result } from '../../../Fetch';
import { Oss } from '../../../types';
import { NextPageContext } from 'next';
import Fetch from '@amanooo/fetch';


class Gallerys extends React.Component<any, any> {
  static async getInitialProps(props: NextPageContext) {
    const { query: { type } } = props
    return {
      type
    }
  }
  state: {
    gallerys: Oss[]
    pageNum: number
    pageSize: number
  } = {
      gallerys: [],
      pageNum: 1,
      pageSize: 20,
    }

  componentDidMount() {
    this._query()
  }
  _query = async () => {
    const { pageSize, pageNum } = this.state
    const { query: { type } } = this.props.router
    console.log('Gallerys type', type, this.props.router)
    const res = await Fetch.get(`/api/photo/${this.props.type}`, { pageNum, pageSize })
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
            <Link href={`/spider/photo/${type}/${id}`} prefetch={false}>
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
const routerGallery = withRouter(Gallerys)

// const dynamicGallery = dynamic(() => import('.'), {
//   ssr: false,
// })

export default routerGallery 
