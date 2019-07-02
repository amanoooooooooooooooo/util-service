import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'

class Spider extends React.Component {
    state = {
      data: []
    }
    async componentDidMount () {
      const res = await fetch('./api/oss').then(res => res.json())
      const { errMsg, payload } = res
      !errMsg && this.setState({
        data: payload
      })
    }
    render () {
      const { data } = this.state
      console.log('data ', data)
      return <Layout>
        <div>
          {data.map(item => {
            return <div key={item.id}>
              <Link href={`./novel/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </div>
          })}
        </div>
      </Layout>
    }
}

export default Spider
