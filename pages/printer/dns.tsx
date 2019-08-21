import React from 'react'
import Layout from '../../components/MyLayout'

import dynamic from 'next/dynamic'
import Fetch from '@amanooo/fetch';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

function trim(value: string) {
  return value.replace(/^(\s*)|(\s*$)/g, '')
}
interface DomainItem {
  RR: string
  Status: string
  Value: string
  DomainName: string
  Type: string
}
interface DomainRecords {
  DomainRecords: {
    Record: DomainItem[]
  }
}
class Dns extends React.Component {
  state: {
    domain: string,
    ip: string,
    response: Object,
    domainList: DomainItem[]
  } = {
      domain: '',
      ip: '39.104.226.149',
      response: {},
      domainList: []
    }
  async componentDidMount() {
    const r = await Fetch.get('/api/dns')
    const {
      DomainRecords: {
        Record = []
      }
    }: DomainRecords = r
    this.setState({
      domainList: Object.values(Record).filter((item: DomainItem) => item.Type === 'A' || item.Type === 'CNAME')
    })
  }
  _onChange = (type: string, value: string) => {
    this.setState({
      [type]: value
    })
  }
  _add = async () => {
    const {
      domain,
      ip
    } = this.state
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
    const body = {
      RR: domain,
      value: ip
    }
    const r = await Fetch.post('/api/dns', body)
    const {
      code = 'success'
    } = r
    code && alert(code)
    this.setState({
      response: r
    })
  }

  render() {
    const { response = '', domainList = [] } = this.state
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
