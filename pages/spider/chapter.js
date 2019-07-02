import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import { withRouter } from 'next/router'

class Chapter extends React.Component {
    state = {
      chapter: ''
    }
    async componentDidMount () {
      console.log('a ', this)
      const { router } = this.props
      const { query: { id, chapter } } = router
      const res = await fetch(`/spider/api/novel/${id}/${chapter}`).then(res => res.json())
      const { errMsg, payload } = res
      !errMsg && this.setState({
        chapter: payload
      })
    }
    render () {
      const { chapter } = this.state
      console.log('chapter', chapter)

      return <Layout>
        <div>
          <h2>{chapter.chapterTitle}</h2>
          <p>{chapter.content}</p>
        </div>
      </Layout>
    }
}

export default withRouter(Chapter)
