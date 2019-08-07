import React from 'react'
import Layout from '../../../../components/MyLayout'
import Link from 'next/link'
import { Novel } from '../../../../types';
import Fetch from '../../../../Fetch';
import { getStorage } from '../../../../utils';
import { withRouter } from 'next/router';
import { LOCAL } from '../../../../client/constant';

class Chapter extends React.Component<any, any> {

    state: {
        chapter: Novel,
        id: number,
        chapterIndex: string
    } = {
            chapter: {} as Novel,
            id: -1,
            chapterIndex: '-1'
        }
    fontColor = 'red'
    bgColor = 'green'

    async componentDidMount() {
        console.log('did life');
    }
    componentWillMount() {
        this._query()

        const fontColor = getStorage(LOCAL.COLOR_FONT) || 'black'
        const bgColor = getStorage(LOCAL.COLOR_BG) || 'white'
        this.fontColor = fontColor
        this.bgColor = bgColor

    }
    _query = async () => {
        console.log('Chapter props', this.props)

        const { query: { id, chapter: chapterIndex } } = this.props.router
        const res = await Fetch.get(`/api/novel/${id}/${chapterIndex}`)
        const { errMsg, payload } = res
        if (errMsg) {
            throw new Error(errMsg)
        }
        const chapter = { ...payload, content: payload.content.replace(/\s\s\s\s/g, '\n    ') }

        this.setState({
            chapter,
            id,
            chapterIndex
        })
    }

    render() {
        const { chapter, id, chapterIndex } = this.state
        const { crawlUrl } = chapter

        const pre = chapter.chapterIndex === '1' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) - 1}`
        const next = chapter.nextCrawlUrl === '' ? `/spider/novel/${id}` : `/spider/novel/${id}/${parseInt(chapterIndex) + 1}`
        return <Layout>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <style jsx global>
                    {`
                    div {
                    color: ${this.fontColor};
                    background-color: ${this.bgColor};
                }
                `}
                </style>
                <div style={{ height: '1rem', width: '1rem', backgroundColor: this.bgColor }}></div>
                <h2>{chapter.chapterTitle}</h2>

                <div style={{ flex: 2 }}>
                    <div className='chapter-content' >{chapter.content}</div>
                </div>
                {crawlUrl && <p>{`小说来自: ${chapter.crawlUrl} 仅作为学习使用, 侵删`}</p>}
                {!crawlUrl && <p>{`loading`}</p>}
                <p style={{ color: '#7BDCB5', fontSize: '0.5rem' }}>{`Tip: 保护视力, 请到 Setting 中设置`}</p>
                <br />

                <footer className='chapter-action'>
                    <Link href={pre} prefetch={false}>
                        <a>{'上一章'}</a>
                    </Link>
                    <Link href={`/spider/novel/${id}`} prefetch={false}>
                        <a>{'目录'}</a>
                    </Link>
                    <Link href={next} prefetch={false}>
                        <a>{'下一章'}</a>
                    </Link>
                </footer>
            </div>
        </Layout>
    }
}

export default withRouter(Chapter)
