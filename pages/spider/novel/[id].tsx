import React, { CSSProperties } from 'react'
import Layout from '../../../components/MyLayout'
import Link from 'next/link'
import { LOCAL_PREFFIX, LOCAL } from '../../../client/constant'
import { NextPageContext } from 'next';
import Fetch, { Result } from '../../../Fetch';
import { Novel, LocalUser } from '../../../types';
import { withRouter } from 'next/router'

const MAIL_PATTERN = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/


type Chapter = Novel

class Chapters extends React.Component<any, any> {
  static async getInitialProps(props: NextPageContext) {
    let endpoint = LOCAL_PREFFIX
    if (!props.req) {
      endpoint = document.location.protocol + '//' + window.location.host
    }

    console.log('endpoint', endpoint)

    const { query: { id } } = props
    const res = await Fetch.get(endpoint + `/api/novel/${id}`)
    const { errMsg, payload }: Result<Chapter[]> = res
    if (errMsg) {
      throw new Error(errMsg)
    }
    return {
      chapters: payload.reverse()
    }
  }
  state: {
    chapters: Chapter[],
    reverse: boolean,
    show: boolean,
  } = {
      chapters: this.props.chapters,
      reverse: true,
      show: false
    }
  mail = {} as { value: string }
  async componentDidMount() {
    this._updateMail()
  }
  _updateMail() {
    try {
      const userString = localStorage.getItem(LOCAL.MARK_LOGIN) as string
      const user: LocalUser = JSON.parse(userString) || {}
      const { mail } = user
      if (this.mail && mail) {
        this.mail.value = mail
      }
    } catch (error) {
      console.error('chapters e', error)
    }
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
    if (!MAIL_PATTERN.test(mail)) {
      alert('邮箱格式不正确')
      return
    }

    const { errMsg } = await Fetch.post('/api/rss', { mail, id })
    if (errMsg) {
      alert(errMsg)
    } else {
      alert('成功')
      localStorage.setItem(LOCAL.MARK_LOGIN, JSON.stringify({ mail }))
    }
  }

  render() {

    const { chapters, reverse, show } = this.state

    const { query: { id } } = this.props.router

    const _chapters = show ? chapters : chapters.slice(0, 15)

    return <Layout>
      <div style={styles.parentStyle}>
        {_chapters.length === 0 && <div>还没有找到章节</div>}
        {_chapters.map(item => {
          return <div key={item.chapterIndex}>
            <Link href={`/spider/novel/${id}/${item.chapterIndex}`} prefetch={false}>
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
function Rss(props: any) {
  const { _this } = props
  return <div className='chapter-action'>
    <input placeholder='邮箱地址' ref={e => { _this.mail = e }} />
    <div onClick={_this.subscribe} style={{ lineHeight: '2rem' }}>订阅</div>
  </div>
}
const styles: { [name: string]: CSSProperties } = {
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
