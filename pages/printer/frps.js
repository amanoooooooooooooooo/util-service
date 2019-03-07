import React from 'react'
import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

class PortForwarding extends React.Component {
    state = {
      domain: '',
      ip: '39.104.226.149',
      response: {},
      domainList: []
    }
    render () {
      return <Layout>
        <h2>Public frp server</h2>
        <h3>Ip: 39.104.226.149</h3>
        <pre>
        #frps.ini<br />
        [common]<br />
        bind_port = 7000<br />
        vhost_http_port = 7001<br />
        </pre>

      </Layout>
    }
}

export default PortForwarding
