import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'

import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

class Header extends React.Component {
    state = {
      isRaw: false,
      data: {}
    }
    async componentDidMount () {
      const res = await fetch('../header').then(res => res.json())
      this.setState({
        data: res
      })
    }
    render () {
      const { data } = this.state
      return <Layout>
        <React.Fragment>
          <p>{JSON.stringify(data)}</p>
          <DynamicReactJson src={data} />
        </React.Fragment>
      </Layout>
    }
}

export default Header
