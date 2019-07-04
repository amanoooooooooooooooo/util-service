import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../../components/MyLayout.js'
import Link from 'next/link'

class Spider extends React.Component {
    state = {
      novels: [],
      filter: ''
    }
    crawlUrl= {}
    name= {}

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

    add = async () => {
      const name = this.name.value
      const crawlUrl = this.crawlUrl.value
      if (!name) {
        alert('请输入小说名')
        return
      }
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name, crawlUrl })
      }
      const { errMsg } = await fetch('/spider/api/novel', options).then(res => res.json())

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
          <AddNewNovel _this={this} add={this.add} />
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
  const { _this, add } = props
  return <div>
    <h3>方法1</h3>
    <p>输入小说名, 输入小说第一章网址, 点击添加</p>
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

export default Spider
