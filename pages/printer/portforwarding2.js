import React from 'react'
import Layout from '../../components/MyLayout.js'
import io from 'socket.io-client'

import { CMD_GENERATE, CMD_CLOSE, CMD_GET_CON } from '../../constants'

const PORT = process.env.PORT || 3000
const IP = process.env.IP || 'http://localhost' // 39.104.226.149
const SERVICE_PORT = process.env.SERVICE_PORT || 3001

// const http = require('http')
// const url = require('url')
// const net = require('net')

// console.log('http ', http)
// console.log('url ', url)
// console.log('net ', net)

var httpHeaders = require('http-headers')

class PortForwarding extends React.Component {
    _close= () => {
      this.socket && this.socket.emit('common', CMD_CLOSE)
    }
    _getconnection = () => {
      this.socket && this.socket.emit('common', CMD_GET_CON)
    }
    componentDidMount () {
      // dRequest('/', function (er, res) {
      //   if (!er) { return console.log('browser-request got your root path:\n' + res.body) }

      //   console.log('There was an error, but at least browser-request loaded and ran!')
      //   throw er
      // })

      const socket = io(`${IP}:${PORT}`)
      this.socket = socket
      console.log('socket ', socket)

      socket.on('common', function (data) {
        console.log(data)
        socket.emit('common', CMD_GENERATE)
      })
      socket.on('buffer', async function (data) {
        console.log('onbuffer', data.byteLength, data, httpHeaders(data))
        const headers = httpHeaders(data)
        var data = null

        var xhr = new XMLHttpRequest()
        xhr.withCredentials = true

        xhr.addEventListener('readystatechange', function () {
          if (this.readyState === 4) {
            const response = xhr.response
            const headers = xhr.getAllResponseHeaders()
            console.log('response ', response)
            console.log('getAllResponseHeaders ', headers)
            console.log('status ', xhr.status)
            console.log('statusText ', xhr.statusText)
            console.log('responseXML ', xhr.responseXML)
            console.log('responseURL ', xhr.responseURL)

            socket.emit('buffer', 'HTTP/1.1 200 OK\r\n\r\n' + headers + '\r\n' + response)
          }
        })

        xhr.open('GET', 'http://localhost:3000')

        xhr.send(data)
      })
      // socket.on('data', function (data) {
      //   console.log('client server onData ' + data)
      // })

      // var to = net.createConnection({
      //   port: SERVICE_PORT
      // })

      // socket.pipe(to)
      // to.pipe(socket)

    // socket.on('close', function () {
    //   console.log('Connection closed')
    // })
    }
    render () {
      return <Layout>
        <h2>Expose Local Service To The Public</h2>
        <button onClick={this._close}> close</button>
        <button onClick={this._getconnection}> getconnection</button>
      </Layout>
    }
}

export default PortForwarding
