import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'

class Spider extends React.Component {
    state = {
      novels: [],
      filter: ''
    }
    componentDidMount () {
      this.query()
    }
    async query () {
      const res = await fetch('./api/oss').then(res => res.json())
      const { errMsg, payload: novels } = res
      !errMsg && this.setState({
        novels
      })
    }
    filter = (e) => {
      const filter = e.target.value
      this.setState({ filter })
    }
    add1 = async () => {
      const name = this.name1.value
      if (!name) {
        alert('请输入内容')
        return
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name })
      }
      const { errMsg } = await fetch('/spider/api/novel', options).then(res => res.json())
      if (!errMsg) {
        alert('成功')
        this.query()
      } else {
        alert(errMsg)
      }
    }
    add2 = async () => {
      const name = this.name2.value
      const crawlUrl = this.crawlUrl2.value
      if (!name || !crawlUrl) {
        alert('请输入内容')
        return
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name, crawlUrl })
      }
      const { errMsg } = fetch('/spider/api/novel', options).then(res => res.json())
      if (!errMsg) {
        alert('成功')
        this.query()
      } else {
        alert(errMsg)
      }
    }
    render () {
      const { novels, filter } = this.state
      return <Layout>
        <div style={{ position: 'relative' }}>
          <h2>已爬取的小说</h2>
          {novels.filter(item => item.name.indexOf(filter) !== -1).map(item => {
            return <div key={item.id}>
              <Link href={`./novel/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </div>
          })}
          <Filter filter={this.filter} />
          <hr />
          <h2>添加想爬取的小说</h2>
          <AddNewNovel _this={this} add1={this.add1} add2={this.add2} />
        </div>
      </Layout>
    }
}

function Filter (props) {
  return <div style={{
    position: 'absolute',
    right: 0,
    top: 0
  }}><input placeholder='增加过滤' onChange={props.filter} /></div>
}
function AddNewNovel (props) {
  const { _this, add1, add2 } = props
  return <div>
    <h3>方法1</h3>
    <p>使用 https://www.dingdiann.com</p>
    <p>输入小说名, 点击添加</p>
    <label htmlFor='add-nove-name1'>{'小说名称: '}</label>
    <input id='add-nove-name1' placeholder='小说名称' ref={e => { _this.name1 = e }} />
    <br />
    <div onClick={add1}>增加</div>
    <h3>方法2</h3>
    <p>使用 https://www.qu.la</p>
    <p>输入小说名, 输入小说第一章网址, 点击添加</p>
    <label htmlFor='add-nove-name2'>{'小说名称: '}</label>
    <input id='add-nove-name2' placeholder='小说名称' ref={e => { _this.name2 = e }} />
    <br />
    <label htmlFor='add-nove-url2'>{'小说网址: '}</label>
    <input id='add-nove-url2' placeholder='小说第一章网址' ref={e => { _this.crawlUrl2 = e }} />
    <br />
    <div onClick={add2}>增加</div>

  </div>
}

export default Spider
