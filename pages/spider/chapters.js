import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import { withRouter } from 'next/router'

class Chapters extends React.Component {
    state = {
      chapters: [],
      reverse: true
    }
    async componentDidMount () {
      const { query: { id } } = this.props.router
      const res = await fetch(`/spider/api/novel/${id}`).then(res => res.json())
      const { errMsg, payload } = res
      !errMsg && this.setState({
        chapters: payload.reverse()
      })
    }

    _reverse = () => {
      this.setState({
        chapters: this.state.chapters.reverse(),
        reverse: !this.state.reverse
      })
    }
    render () {
      const { chapters, reverse } = this.state
      const { query: { id } } = this.props.router

      const floatStyle = {
        float: 'right',
        right: '1rem',
        top: '0rem',
        position: 'absolute'
      }
      const parentStyle = {
        position: 'relative'
      }
      return <Layout>
        <div style={parentStyle}>
          {chapters.map(item => {
            return <div key={item.chapterIndex}>
              <Link href={`/spider/novel/${id}/${item.chapterIndex}`}>
                <a>{item.chapterTitle}</a>
              </Link>
            </div>
          })}
          <div style={floatStyle} onClick={this._reverse}>{reverse ? '顺序' : '倒序'}</div>
        </div>
      </Layout>
    }
}

export default withRouter(Chapters)
