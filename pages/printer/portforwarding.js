import React from 'react'
import Layout from '../../components/MyLayout.js'

class PortForwarding extends React.Component {
  render () {
    return <Layout>
      <h2>Expose Local Service To The Public</h2>
      <h3>Scenes</h3>
      <ul>
        <li><a href='./dns'>Free Domain</a></li>
        <li><a href='./frps'>Free Public Server</a></li>

      </ul>
      <h3>Method 1: Using Docker</h3>
      <p>Refer to <a target='_blank' href='https://hub.docker.com/r/amanohikaru/frp-docker'>frp-docker</a></p>
      <ol>
        <li>Edit web_customname(Start with web)</li>
        <li>Edit local port</li>
        <li>Edit domain(Domain must resolve to server_addr)</li>
      </ol>
      <pre>cat > frpc.ini &lt;&lt; EOF<br />
            # frpc.ini<br />
        <br />
            [common]<br />
            server_addr = 39.104.226.149<br />
            server_port = 7000<br />
        <br />
            [<em>web_customname</em>]<br />
            type = http<br />
            local_port = <em>4000</em><br />
            custom_domains = <em>amano</em>.util.online<br />
            EOF<br />
        <br />
            docker run --network host -d -v $(pwd)/frpc.ini:/conf/frpc.ini amanohikaru/frp-docker client<br />
      </pre>
    </Layout>
  }
}

export default PortForwarding
