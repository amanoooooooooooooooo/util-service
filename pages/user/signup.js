import Layout from '../../components/MyLayout.js'
import React, { useState } from 'react'
import { setUserStorage } from '../../client/util'
import FetchApi from '../../client/service.js'
import { withRouter } from 'next/router'

function Signup (props) {
  const [user, setUser] = useState({})

  const updateValue = (e, type) => {
    const newUser = {
      ...user,
      [type]: e.target.value
    }
    setUser(newUser)
  }
  const _apply = async () => {
    const { nick, pass, mail } = user

    const res = await FetchApi.post('/spider/api/user', { nick, pass, mail })
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
