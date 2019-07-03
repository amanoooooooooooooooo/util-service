import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import { withRouter } from 'next/router'

class Chapters extends React.Component {
    state = {
      chapters: []
    }
    async componentDidMount () {
      const { query: { id } } = this.props.router
      const res = await fetch(`/spider/api/novel/${id}`).then(res => res.json())
      const { errMsg, payload } = res
      !errMsg && this.setState({
        chapters: payload
      })
    }
    render () {
      const { chapters } = this.state
      const { query: { id } } = this.props.router

      return <Layout>
        <div>
          {chapters.map(item => {
            return <div key={item.chapterIndex}>
              <Link href={`/spider/novel/${id}/${item.chapterIndex}`}>
                <a>{item.chapterTitle}</a>
              </Link>
            </div>
          })}
        </div>
      </Layout>
    }
}

export default withRouter(Chapters)
