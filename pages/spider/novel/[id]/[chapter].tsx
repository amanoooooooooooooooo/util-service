import React from 'react'
import Layout from '../../../../components/MyLayout.js'
import Link from 'next/link'
import { LOCAL_PREFFIX } from '../../../../client/constant'
import { NextPageContext } from 'next';
import { Novel } from '../../../../types';
import Fetch from '../../../../client/service.js';


class Chapter extends React.Component<any, any> {
  static async getInitialProps(props: NextPageContext) {
    let endpoint = LOCAL_PREFFIX
    if (!props.req) {
      endpoint = document.location.protocol + '//' + window.location.host
    }

    console.log('endpoint', endpoint)

    const { query: { id, chapter: chapterIndex } } = props
    const res = await Fetch.get(endpoint + `/api/novel/${id}/${chapterIndex}`)
    const { errMsg, payload } = res
    if (errMsg) {
      throw new Error(errMsg)
    }
    const chapter = { ...payload, content: payload.content.replace(/\s\s\s\s/g, '\n    ') }

    return {
      chapter,
      id,
      chapterIndex
    }
  }
  state: {
    chapter: Novel,
    id: number,
    chapterIndex: string
  } = {
      chapter: this.props.chapter,
      id: this.props.id,
      chapterIndex: this.props.chapterIndex
    }
  async componentDidMount() {
  }

  render() {
    const { chapter, id, chapterIndex } = this.state

    const pre = chapter.chapterIndex === '1' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) - 1}`
    const next = chapter.nextCrawlUrl === '' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) + 1}`
    return <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2>{chapter.chapterTitle}</h2>

        <div style={{ flex: 2 }}>
          <div className='chapter-content'>{chapter.content}</div>
        </div>
        <p>{`小说来自: ${chapter.crawlUrl} 仅作为学习使用, 侵删`}</p>
        <footer className='chapter-action'>
          <Link href={pre}>
            <a>{'上一章'}</a>
          </Link>
          <Link href={`/spider/novel/${id}`}>
            <a>{'目录'}</a>
          </Link>
          <Link href={next}>
            <a>{'下一章'}</a>
          </Link>
        </footer>
      </div>
    </Layout>
  }
}

export default Chapter
