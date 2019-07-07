import Layout from '../../components/MyLayout.js'
import React, { useState, useEffect } from 'react'
import { getUserStorage, setUserStorage } from '../../client/util'
// import Fetch from '../../client/service.js'
import fetch from 'isomorphic-unfetch'

function Info () {
  const userStorage = getUserStorage()
  const [user, setUser] = useState(userStorage)
  // const userCache = getUserStorage()
  const _this = {}

  const updatePass = (e) => {
    const newUser = {
      ...user,
      mail: e.target.value
    }

    setUser(newUser)
  }
  const _apply = async () => {
    const nick = _this.nick.value
    const pass = _this.pass.value
    const mail = _this.mail.value

    const res = await Fetch.put('/spider/api/user', { nick, pass, mail })
    console.log('res ', res)
    const { errMsg, payload } = res
    if (errMsg) {
      alert(errMsg)
    } else {
      alert('成功')
      setUserStorage(payload)
    }
  }

  const _logout = async () => {

  }

  useEffect(() => {
    const userId = userStorage.id
    if (userStorage.id) {
      console.log('userId', userId)
      
      try {
        (async function fetchUser () {
          const { errMsg, payload: userInfo } = await fetch(`/spider/api/user/${userId}`).then(res => res.json)
          console.log('userifno ', userInfo)
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

      {!user.nick && user.mail && <div>已根据邮箱为您自动登陆</div> }
      {<br />}

      <label htmlFor='unick'>昵称: </label><input id='unick' ref={e => { _this.nick = e }} /><br />
      <label htmlFor='upass'>密码: </label><input id='upass' ref={e => { _this.pass = e }} /><br />
      <label htmlFor='umail'>邮箱: </label><input id='umail' ref={e => { _this.mail = e }} disabled value={user.mail} onChange={updatePass} /><br />
      <br />

      <div className='chapter-action'>
        <div onClick={_apply}>应用</div>
        <div onClick={_logout}>重制</div>
      </div>

    </Layout>
  )
}

export default Info
