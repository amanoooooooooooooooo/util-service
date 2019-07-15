import React from 'react'
import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

import dynamic from 'next/dynamic'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

function trim (value) {
  return value.replace(/^(\s*)|(\s*$)/g, '')
}
class Dns extends React.Component {
    state = {
      domain: '',
      ip: '39.104.226.149',
      response: {},
      domainList: []
    }
    async componentDidMount () {
      fetch('../dns/list', {
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST' // *GET, POST, PUT, DELETE, etc.
      })
        .then(res => res.json())
        .then(res => {
          const { DomainRecords: { Record } = [] } = res
          this.setState({
            domainList: Object.values(Record).filter(item => item.Type === 'A' || item.Type === 'CNAME')
          })
        })
    }
    _onChange = (type, value) => {
      this.setState({ [type]: value })
    }
    _add = () => {
      const { domain, ip } = this.state
      const _domain = trim(domain)
      const _ip = trim(ip)
      if (!_domain) {
        alert('domain should not be null')
        return
      }
      if (!_ip) {
        alert('ip should not be null')
        return
      }
      const body = JSON.stringify({
        RR: domain,
        value: ip
      })
      fetch('../dns/add', {
        body: body, // must match 'Content-Type' header
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST' // *GET, POST, PUT, DELETE, etc.
      })
        .then(res => res.json())
        .then(response => {
          const { code = 'success' } = response
          code && alert(code)
          this.setState({
            response
          })
        })
    }

    render () {
      const { response = '', domainList = [] } = this.state
      console.log('domainList is', domainList)
      return <Layout>
        <h3>Apply your domain</h3>
        <p>if your want <b><i>buddy.util.online</i></b> , just input <b><i>buddy</i></b> please</p>
        <input type='text' onChange={(e) => this._onChange('domain', e.target.value)} />
        <h3>Input your Ip</h3>
        <input type='text' defaultValue='39.104.226.149' onChange={(e) => this._onChange('ip', e.target.value)} />
        <br />
        <br />
        <button onClick={this._add} >{'ADD'}</button>
        <br />
        <br />
        <DynamicReactJson src={response} />

        <h3>Following domains have beed used</h3>
        {domainList.map(item => <li key={item.RR}>{`${item.RR}.${item.DomainName}`}</li>)}
      </Layout>
    }
}

export default Dns
