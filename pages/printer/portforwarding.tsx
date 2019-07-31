import React from 'react'
import Layout from '../../components/MyLayout'

class PortForwarding extends React.Component {
  render() {
    return <Layout>
      <h2>Expose Local Service To The Public(Deprecated)</h2>
      <h1>!! NOT MAINTAINED !! USE SSH PORT FORWARDING</h1>
      <h3>Scenes</h3>
      <ul>
        <li><a href='./dns'>Free Domain</a></li>
        <li><a href='./frps'>Free Public Server</a></li>

      </ul>
      <h3>Method 1: Using Docker</h3>
      <p>Refer to <a target='_blank' href='https://hub.docker.com/r/amanohikaru/frp-docker'>frp-docker</a></p>
      <ol>
        <li>Create frpc.ini.(Edit yellow field)</li>
        <pre>
          cat > frpc.ini &lt;&lt; EOF<br />
          # frpc.ini<br />
          <br />
          [common]<br />
          server_addr = 39.104.226.149<br />
          server_port = 7000<br />
          <br />
          [web<em>_customname</em>]<br />
          type = http<br />
          local_port = <em>4000</em><br />
          custom_domains = <em>amano</em>.util.online<br />
          EOF<br />
        </pre>
        <li>Create Docker container</li>
        <pre>
          docker run --network host -d -v $(pwd)/frpc.ini:/conf/frpc.ini amanohikaru/frp-docker client<br />
        </pre>
      </ol>

      <h3>Method 2: Using Release Executable File</h3>
      <p>Refer to <a target='_blank' href='https://github.com/fatedier/frp'>github/frp</a></p>
      <p>Download <a href='https://github.com/fatedier/frp/releases'>Release</a> </p>
      <ol>
        <li>Create frpc.ini.(Edit yellow field)</li>
        <pre>
          cat > frpc.ini &lt;&lt; EOF<br />
          # frpc.ini<br />
          <br />
          [common]<br />
          server_addr = 39.104.226.149<br />
          server_port = 7000<br />
          <br />
          [web<em>_customname</em>]<br />
          type = http<br />
          local_port = <em>4000</em><br />
          custom_domains = <em>amano</em>.util.online<br />
          EOF<br />
        </pre>
        <li>Start Client</li>
        <pre>
          ./frpc -c ./frpc.ini
        </pre>
      </ol>
    </Layout>
  }
}

export default PortForwarding
