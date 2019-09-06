import React from 'react'
import Layout from '../../../../components/MyLayout'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { LOCAL_PREFFIX } from '../../../../client/constant'
import { Result } from '../../../../Fetch';
import { Photo } from '../../../../types';
import { NextPageContext } from 'next';
import Fetch from '@amanooo/fetch';

const IMG_ENDPOINT = process.env.IMG_ENDPOINT || 'http://218.168.168.105:8888'

const IP_REG = /http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:8888/

class Gallery extends React.Component<any, any> {
  state: {
    gallery: Photo[]
  } = {
      gallery: this.props.gallery
    }

  static async getInitialProps(props: NextPageContext) {
    let endpoint = LOCAL_PREFFIX
    if (!props.req) {
      endpoint = document.location.protocol + '//' + window.location.host
    }

    console.log('endpoint', endpoint)

    const { query: { type, id } } = props

    const res = await Fetch.get(endpoint + `/api/photo/${type}/${id}`)

    const { errMsg, payload }: Result<Photo[]> = res
    if (errMsg) {
      throw new Error(errMsg)
    }
    return {
      gallery: payload,
    }
  }

  render() {
    const { gallery } = this.state

    return <Layout>
      <div >
        {gallery.map(item => {
          const { id, url, title } = item
          return <div key={id}>
            <img alt={`${title}${url ? '' : ' (同步中)'}`} src={url.replace(IP_REG, IMG_ENDPOINT)} />
          </div>
        })}
      </div>
    </Layout>
  }
}

export default withRouter(Gallery)
