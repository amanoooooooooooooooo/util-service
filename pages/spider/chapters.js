import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Fetch from '../../client/service.js'

const MAIL_PATTERN = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

class Chapters extends React.Component {
    state = {
      chapters: [],
      reverse: true,
      show: false
    }
    mail ={}
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
    _toggleShow = () => {
      this.setState({
        show: !this.state.show
      })
    }
    subscribe = async () => {
      const mail = this.mail.value && this.mail.value.trim()
      const { query: { id } } = this.props.router
      console.log('mail ', mail)
      
      if (!mail) {
        alert('请输入邮箱')
        return
      }
      if (MAIL_PATTERN.test(mail)) {
        alert('邮箱格式不正确')
      }

      const { errMsg } = await Fetch.post('/spider/api/sub', { mail, id })
      if (errMsg) {
        alert(errMsg)
      } else {
        alert('成功')
      }
    }
    render () {
      const { chapters, reverse, show } = this.state
      const { query: { id } } = this.props.router

      const _chapters = show ? chapters : chapters.slice(0, 15)

      return <Layout>
        <div style={styles.parentStyle}>
          {_chapters.map(item => {
            return <div key={item.chapterIndex}>
              <Link href={`/spider/novel/${id}/${item.chapterIndex}`}>
                <a>{item.chapterTitle}</a>
              </Link>
            </div>
          })}
          <div style={styles.floatStyle} onClick={this._reverse}>{reverse ? '顺序' : '倒序'}</div>
          <div style={styles.floatStyle2} onClick={this._toggleShow}>{show ? '隐藏更多' : '显示更多'}</div>
          <hr />
          <Rss _this={this} />
        </div>
      </Layout>
    }
}
function Rss (props) {
  const { _this } = props
  return <div className='chapter-action'>
    <input placeholder='邮箱地址' ref={e => { _this.mail = e }} />
    <div onClick={_this.subscribe} style={{ lineHeight: '2rem' }}>订阅</div>
  </div>
}
const styles = {
  floatStyle: {
    float: 'right',
    right: '1rem',
    top: '0rem',
    position: 'absolute'
  },
  floatStyle2: {
    float: 'right',
    right: '1rem',
    top: '2rem',
    position: 'absolute'
  },
  parentStyle: {
    position: 'relative'
  }
}

export default withRouter(Chapters)
