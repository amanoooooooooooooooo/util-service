import React from 'react'
import Layout from '../../components/MyLayout'
import Link from 'next/link'
import Fetch from '../../Fetch';
import { PhotoTypes } from '../../types';

class Photo extends React.Component<any, any> {
  // static async getInitialProps(props: NextPageContext) {
  //   let endpoint = LOCAL_PREFFIX
  //   if (!props.req) {
  //     endpoint = document.location.protocol + '//' + window.location.host
  //   }

  //   console.log('endpoint', endpoint)

  //   const res = await Fetch.get(endpoint + `/api/photo`)
  //   const { errMsg, payload } = res
  //   if (errMsg) {
  //     throw new Error(errMsg)
  //   }

  //   return {
  //     photoTypes: payload,
  //   }
  // }

  state: { photoTypes: PhotoTypes } = {
    photoTypes: {}
  }
  componentDidMount() {
    this._query()
  }
  _query = async () => {

    const res = await Fetch.get(`/api/photo`)
    const { errMsg, payload } = res
    if (errMsg) {
      throw new Error(errMsg)
    }

    this.setState({
      photoTypes: payload
    })

  }


  render() {
    return <Layout>
      <div style={{ position: 'relative' }}>
        <h2>已爬取的图片</h2>
        {Object.keys(this.state.photoTypes).map(item => {

          return <div key={item}>
            <Link href={`/spider/photo/${item}`} prefetch={false}>
              <a>{this.state.photoTypes[item].name}</a>
            </Link>
          </div>
        })}
      </div>
    </Layout>
  }
}

export default Photo
