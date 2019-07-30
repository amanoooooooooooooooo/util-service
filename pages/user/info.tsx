import Layout from '../../components/MyLayout.jsx'
import React, { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { getUserStorage, setUserStorage } from '../../utils.js';
import { LocalUser } from '../../types.js';
import Fetch from '../../Fetch.js';

function Info(props: any) {
  const [user, setUser] = useState(getUserStorage())
  const [rss, updateRss] = useState([])

  const updateValue = (e: any, type: string) => {
    const newUser = {
      ...user,
      [type]: e.target.value
    }
    setUser(newUser)
  }
  const _apply = async () => {
    const { nick, pass, mail, id } = user

    const res = await Fetch.put('/spider/api/user', { nick, pass, mail })
    console.log('res ', res)
    const { errMsg, payload } = res
    if (errMsg) {
      alert(errMsg)
    } else {
      alert('成功')
      setUserStorage(payload as LocalUser)
    }
  }

  const _logout = async () => {
    setUserStorage({})
    setUser(getUserStorage())
    props.router.push('/user/login')
  }

  useEffect(() => {
    const userId = user.id
    if (userId) {
      console.log('userId', userId)

      try {
        (async function fetchUser() {
          const { errMsg, payload: userInfo } = await Fetch.get(`/spider/api/user/${userId}`)
          console.log('userifno1 ', userInfo)
          if (errMsg) {
            console.error('fetchUser errMsg ', errMsg)
          } else {
            updateRss(userInfo)
          }
        })()
      } catch (error) {
        console.error('fetch user e', error)
      }
    }
    return () => { }
  }, [])

  return (
    <Layout>
      <h3>用户信息</h3>

      {!user.id && user.mail && <div>已根据邮箱为您自动登陆</div>}
      {<br />}

      <label htmlFor='unick'>昵称: </label><input id='unick' value={user.nick || ''} onChange={(e) => updateValue(e, 'nick')} />
      <br />
      <label htmlFor='upass'>密码: </label><input id='upass' value={user.pass || ''} onChange={(e) => updateValue(e, 'pass')} type='password' />
      <label> 暂不支持修改, 请谨慎</label>
      <br />
      <label htmlFor='umail'>邮箱: </label><input id='umail' disabled value={user.mail || ''} onChange={(e) => updateValue(e, 'mail')} /><br />
      <br />

      <div className='chapter-action'>
        <div onClick={_apply}>应用</div>
        <div onClick={_logout}>登出</div>
      </div>

      <hr />
      <h3>订阅信息</h3>

      {rss.map(item => {
        return <div key={item.id} >
          <Link href={`/spider/novel/${item.ossId}`}>
            <a>{item.name}</a>
          </Link>
        </div>
      })}

    </Layout>
  )
}

export default withRouter(Info)
