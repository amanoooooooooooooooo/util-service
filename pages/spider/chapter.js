import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import { withRouter } from 'next/router'



class Chapter extends React.Component {
    state = {
      chapter: ''
    }
    async componentDidMount () {
      const { router } = this.props
      const { query: { id, chapter:chapterIndex } } = router
      const res = await fetch(`/spider/api/novel/${id}/${chapterIndex}`).then(res => res.json())
      const { errMsg, payload } = res
      if(errMsg) return 

      const chapter = {...payload, content: payload.content.replace(/\s\s\s\s/g,"\n    ")}
      this.setState({
        chapter
      })
    }
    render () {
      const { chapter } = this.state

      return <Layout>
        <div>
          <h2>{chapter.chapterTitle}</h2>
          <div className="novel">{chapter.content}</div>
        </div>
      </Layout>
    }
}

export default withRouter(Chapter)
