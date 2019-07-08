import Layout from '../../components/MyLayout.js'
import { withRouter } from 'next/router'
import React, { useState } from 'react'
import FetchApi from '../../client/service.js'
import { setUserStorage } from '../../client/util'

function Login (props) {
  function _toSignup () {
    props.router.push('/user/signup')
  }

  const [user, setUser] = useState({})
  console.log('props', props)

  const updateValue = (e, type) => {
    const newUser = {
      ...user,
      [type]: e.target.value
    }
    setUser(newUser)
  }
  const _login = async () => {
    const { nick, pass, mail } = user

    const res = await FetchApi.post('/spider/api/user/version', { nick, pass, mail })
    console.log('res ', res)
    const { errMsg, payload } = res
    if (errMsg) {
      alert(errMsg)
    } else {
      alert('成功')
      setUserStorage(payload)
      props.router.push('/user/info')
    }
  }

  return (
    <Layout>
      <h3>登陆</h3>

      <label htmlFor='umail'>邮箱: </label><input id='umail' value={user.mail || ''} onChange={(e) => updateValue(e, 'mail')} /><br />

      <label htmlFor='upass'>密码: </label><input id='upass' value={user.pass || ''} onChange={(e) => updateValue(e, 'pass')} /><br />
      <br />

      <div className='chapter-action'>
        <div onClick={_login}>登录</div>
        <div onClick={_toSignup}>注册</div>

      </div>
    </Layout>
  )
}

export default withRouter(Login)
