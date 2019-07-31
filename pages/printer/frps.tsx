import React from 'react'
import Layout from '../../components/MyLayout'

class PortForwarding extends React.Component {
  render() {
    return <Layout>
      <h2>Public frp server</h2>
      <h3>Public ip: 39.104.226.149</h3>
      <pre>
        cat > frps.ini &lt;&lt; EOF<br />
        # frps.ini <br />
        <br />
        [common]<br />
        bind_port = 7000<br />
        vhost_http_port = 7001<br />
        EOF<br />
        <br />
        docker run -d -p 7000:7000 -p 7001:7001 -v $(pwd)/frps.ini:/conf/frps.ini amanohikaru/frp-docker
      </pre>

    </Layout>
  }
}

export default PortForwarding
