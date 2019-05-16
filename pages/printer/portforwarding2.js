import React from 'react'
import Layout from '../../components/MyLayout.js'
import io from 'socket.io-client'

import {
  CMD_GENERATE,
  CMD_CLOSE,
  CMD_GET_CON,
  CMD_ERR_PORT,
  CMD_SERVER_PORT,
  LISTEN_PORT
} from '../../constants'

const IP = process.env.IP || 'http://localhost' // 39.104.226.149

var httpHeaders = require('http-headers')

class PortForwarding extends React.Component {
  state = {
    localPort: '3000',
    serverPort: ''
  }
  _close = () => {
    this.socket && this.socket.emit('cmd', { type: CMD_CLOSE })
  }
  _open = () => {
    const { localPort } = this.state
    const _this = this
    const _port = parseInt(localPort)
    console.log('forward local port ', _port)
    const socket = io(`${IP}:${LISTEN_PORT}`)
    this.socket = socket

    socket.on('cmd', function (data) {
      console.log('cmd:', data)
      switch (data.type) {
        case CMD_ERR_PORT:
          alert('random server port in use , retry')
          break
        case CMD_SERVER_PORT:
          const serverPort = data.value
          console.log('server port', serverPort)
          _this.setState({ serverPort })
          break
        default:
          break
      }
    })
    socket.on('common', function (data) {
      console.log('common:', data.slice(1, 500))
    })
    socket.emit('cmd', { type: CMD_GENERATE })

    socket.on('buffer', async function (data) {
      console.log('---------- onbuffer -----------\n', data)
      const headerObj = httpHeaders(data)
      console.log('origing headerObj ', headerObj)
      var bodyData = null

      var xhr = new XMLHttpRequest()
      const { method, url, headers } = headerObj
      xhr.open(method, url)
      for (const header of Object.keys(headers)) {
        xhr.setRequestHeader(header, headers[header])
      }

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          const headers = xhr.getAllResponseHeaders()
          const { response, status, statusText } = xhr
          console.log('headers \r\n', headers)
          console.log('response \r\n', response)
          console.log('status ', xhr.status)
          console.log('statusText ', xhr.statusText)
          console.log('responseURL ', xhr.responseURL)

          // socket.emit('buffer', 'HTTP/1.1 200 OK\r\n' + headers + '\r\n' + response)
          socket.emit(
            'buffer',
            'HTTP/1.1 ' +
              status +
              ' ' +
              statusText +
              ' \r\n' +
              headers +
              '\r\n' +
              response
          )
        }
      })
      xhr.send(bodyData)
    })
  }
  _getconnection = () => {
    this.socket && this.socket.emit('cmd', { type: CMD_GET_CON })
  }
  _onChange = (type, value) => {
    this.setState({ [type]: value })
  }
  componentDidMount () {}
  render () {
    return (
      <Layout>
        <h2>Expose Local Service To The Public</h2>
        localPort:{' '}
        <input
          value={this.state.localPort}
          type='text'
          onChange={e => this._onChange('localPort', e.target.value)}
        />
        <br />
        <a href={`http://localhost:${this.state.localPort}`} target='_blank'>
          <p>serverPort: {this.state.serverPort}</p>
        </a>
        <button onClick={this._close}>close</button>
        <button onClick={this._open}>open</button>
        <button onClick={this._getconnection}> getconnection</button>
      </Layout>
    )
  }
}

export default PortForwarding
