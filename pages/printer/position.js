import React from 'react'
import Layout from '../../components/MyLayout.js'

const getPosition = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { longitude, latitude } = position.coords || {}
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
      ip: ''
    }
    async componentDidMount () {
      const res = await getPosition()
      console.log('res is', res)
      const { message, longitude, latitude } = res
      this.setState({
        position: message || `longitude: ${longitude} latitude:${latitude}`
      })
      /* eslint-disable */
      var findIP = new Promise((r, re) => { var w = window; var a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }); var b = () => {}; a.createDataChannel(''); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) {} } })

      /* Usage example */
      findIP.then(ip => this.setState({
        ip
      })).catch(e => console.error('findIP:', e))
    }
    render () {
      const { position, ip } = this.state
      return <Layout>
        <h3>Your Geolocation</h3>
        <p>{position}</p>
        <h3>Your IP</h3>
        <p>{ip}</p>
      </Layout>
    }
}

export default Position
