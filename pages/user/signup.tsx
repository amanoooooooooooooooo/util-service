import Layout from '../../components/MyLayout'
import React, { useState } from 'react'
import { withRouter } from 'next/router'
import { setUserStorage } from '../../utils';
import { LocalUser } from '../../types';
import Fetch from '@amanooo/fetch';

function Signup(props: any) {

  const [user, setUser] = useState({} as LocalUser)

  const updateValue = (e: any, type: string) => {
    const newUser = {
      ...user,
      [type]: e.target.value
    }
    setUser(newUser)
  }
  const _apply = async () => {
    const { nick, pass, mail } = user

    const res = await Fetch.post('/api/user', { nick, pass, mail })
    const { errMsg, payload } = res
    if (errMsg) {
      alert(errMsg)
    } else {
      alert('成功')
      setUserStorage(payload)
      props.router.replace('/user/info')
    }
  }

  return (
    <Layout>
      <h3>注册</h3>

      <label htmlFor='unick'>昵称: </label><input id='unick' value={user.nick || ''} onChange={(e) => updateValue(e, 'nick')} />
      <br />
      <label htmlFor='upass'>密码: </label><input id='upass' value={user.pass || ''} onChange={(e) => updateValue(e, 'pass')} />
      <label> 暂不支持修改, 请谨慎</label>
      <br />
      <label htmlFor='umail'>邮箱: </label><input id='umail' value={user.mail || ''} onChange={(e) => updateValue(e, 'mail')} /><br />
      <br />

      <div onClick={_apply}>应用</div>

    </Layout>
  )
}

export default withRouter(Signup)
