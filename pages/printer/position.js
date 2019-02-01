import React from 'react'
import Layout from '../../components/MyLayout.js'

const getPosition = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { longitude, latitude } = position.coords || {}
          console.log(position.coords)
          resolve({ longitude, latitude })
        },
        function (e) {
          const { code, message } = e
          resolve({ code, message })
        }
      )
    }
  })
}

class Position extends React.Component {
    state = {
      position: '',
      privateIp: '',
      publicIp: ''
    }
    async componentDidMount () {
      const res = await getPosition()
      console.log('res is', res)
      const { message, longitude, latitude } = res
      this.setState({
        position: message || `longitude: ${longitude} latitude:${latitude}`
      })
      /* eslint-disable */
      const findIP = new Promise((r, re) => { var w = window; var a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }); var b = () => {}; a.createDataChannel(''); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) {} } })

      /* Usage example */
      findIP.then(privateIp => this.setState({
        privateIp
      })).catch(e => console.error('findIP:', e))

      fetch('https://api.ipify.org/').then(res => res.text()).then(publicIp => this.setState({
        publicIp
      }))
    }
    render () {
      const { position, privateIp, publicIp } = this.state
      return <Layout>
        <h3>Your Geolocation</h3>
        <p>{position}</p>
        <h3>Your IP</h3>
        <li>{`private: ${privateIp}`}</li>
        <li>{`public: ${publicIp}`}</li>
      </Layout>
    }
}

export default Position
