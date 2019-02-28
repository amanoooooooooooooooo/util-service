import React from 'react'
import Layout from '../../components/MyLayout.js'

class Dns extends React.Component {
    state = {
      position: '',
      privateIp: '',
      publicIp: ''
    }
    async componentDidMount () {

    }
    render () {
      return <Layout>
        <h3>Apply your domain</h3>
        <input type='text' />
        <h3>Input your Ip</h3>
        <input type='text' />

      </Layout>
    }
}

export default Dns
