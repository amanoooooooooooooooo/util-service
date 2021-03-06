
import React from 'react'
import Layout from '../../components/MyLayout'
import Link from 'next/link'
import { LOCAL_PREFFIX } from '../../client/constant'
import { Result } from '../../Fetch';
import { OssRow } from '../../types';
import Fetch from '@amanooo/fetch';

export default class Novel extends React.Component {
    static async getInitialProps(props: any) {
        let endpoint = LOCAL_PREFFIX
        if (!props.req) {
            endpoint = document.location.protocol + '//' + window.location.host
        }

        console.log('endpoint', endpoint)

        const pageNum = 1
        const pageSize = 20
        const res = await Fetch.get(endpoint + '/api/oss', { pageNum, pageSize })

        const { errMsg, payload: novels } = res

        if (errMsg) {
            throw new Error(errMsg)
        }
        return {
            novels
        }
    }
    state: {
        novels: OssRow[],
        filter: string,
        pageNum: number,
        pageSize: number
    } = {
            // @ts-ignore
            novels: this.props.novels,
            filter: '',
            pageNum: 1,
            pageSize: 20
        }
    crawlUrl = {}
    name = {}

    componentDidMount() {
        // this.query()
    }
    async query() {
        const { pageNum, pageSize } = this.state
        const res = await Fetch.get('/api/oss', { pageNum, pageSize })

        const { errMsg, payload: novels }: Result<OssRow> = res
        !errMsg && this.setState({
            novels
        })
    }
    filter = (e: any) => {
        const filter = e.target.value
        this.setState({ filter })
    }

    add = async () => {
        // @ts-ignore
        const name = this.name.value
        // @ts-ignore
        const crawlUrl = this.crawlUrl.value
        if (!name) {
            alert('请输入小说名')
            return
        }
        const { errMsg } = await Fetch.post('/api/novel', { name, crawlUrl })

        if (!errMsg) {
            alert('成功')
            this.query()
        } else {
            alert(errMsg)
        }
    }
    _pre = () => {
        const { pageNum } = this.state
        if (pageNum === 1) {
            return
        }
        this.setState({
            pageNum: pageNum - 1
        }, this.query)
    }
    _next = () => {
        const { pageNum } = this.state
        this.setState({
            pageNum: pageNum + 1
        }, this.query)
    }
    render() {
        const { novels, filter } = this.state
        return <Layout>
            <div style={{ position: 'relative' }}>
                <h2>已爬取的小说</h2>
                {novels.filter(item => item.name.indexOf(filter) !== -1).map(item => {
                    return <div key={item.id}>
                        <Link href={`/spider/novel/${item.id}`} prefetch={false}>
                            <a>{item.name}</a>
                        </Link>
                    </div>
                })}
                <div style={{ marginTop: '1rem' }} className='chapter-action'>
                    <div onClick={this._pre} >上一页</div>
                    <div onClick={this._next}>下一页</div>
                </div>
                <Filter filter={this.filter} />
                <hr />
                <h2>添加想爬取的小说</h2>
                <AddNewNovel _this={this} add={this.add} />
            </div>
        </Layout>
    }
}

function Filter(props: any) {
    return <div style={{
        position: 'absolute',
        right: 0,
        top: 0
    }}><input placeholder='增加过滤' onChange={props.filter} /></div>
}
function AddNewNovel(props: any) {
    const { _this, add } = props
    return <div>
        <h3>方法1</h3>
        <p>输入小说名, 点击添加</p>
        <label htmlFor='add-nove-name'>{'小说名称: '}</label>
        <input id='add-nove-name' placeholder='*小说名称' ref={e => { _this.name = e }} />
        <br />
        {/* <label htmlFor='add-nove-url'>{'小说网址: '}</label>
    <input id='add-nove-url' placeholder='第一章网址' ref={e => { _this.crawlUrl = e }} />
    <span>(同名小说)</span> */}
        <br />
        <div onClick={add}>增加</div>

    </div>
}

