import React from 'react'
import Layout from '../../components/MyLayout'
import dynamic from 'next/dynamic'
import Fetch from '@amanooo/fetch'
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

class Header extends React.Component {
  state = {
    isRaw: false,
    data: {}
  }
  async componentDidMount() {
    const res = await Fetch.get('/api/headers')
    // const res = await fetch('/api/headers').then(res => res.json())
    console.log('res', res);

    this.setState({
      data: res
    })
  }
  render() {
    const { data } = this.state
    return <Layout>
      <React.Fragment>
        <p>{JSON.stringify(data)}</p>
        <DynamicReactJson src={data} />
      </React.Fragment>
    </Layout>
  }
}

export default Header
