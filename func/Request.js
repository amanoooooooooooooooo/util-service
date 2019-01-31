import React from 'react'
import fetch from 'isomorphic-unfetch'

import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

class Request extends React.Component {
    state = {
      isRaw: false,
      data: ''
    }
    async componentDidMount () {
      const res = await fetch('./header').then(res => res.json())
      this.setState({
        data: res
      })
    }
    render () {
      const { data } = this.state
      return <React.Fragment>
        <a href='./header' >request header</a>
        <p>{JSON.stringify(data)}</p>
        <DynamicReactJson src={data} />
      </React.Fragment>
    }
}

export default Request
