import Layout from '../../components/MyLayout.js'

function Signup () {
  return (
    <Layout>
      <h3>注册</h3>
      <input placeholder={'用户名'} />
      <br />
      <input placeholder={'密码'} />
    </Layout>
  )
}

export default Signup
