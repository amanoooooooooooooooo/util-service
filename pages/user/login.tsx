import Layout from '../../components/MyLayout'
import { withRouter } from 'next/router'
import React, { useState } from 'react'
import { LocalUser } from '../../types';
import { setUserStorage } from '../../utils';
import Fetch from '@amanooo/fetch';

function Login(props: any) {
  function _toSignup() {
    props.router.push('/user/signup')
  }

  const [user, setUser] = useState({} as LocalUser)

  const updateValue = (e: any, type: string) => {
    const newUser = {
      ...user,
      [type]: e.target.value
    }
    setUser(newUser)
  }
  const _login = async () => {
    const { nick, pass, mail } = user

    const res = await Fetch.put('/api/user/login', { nick, pass, mail })
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
