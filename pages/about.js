import Layout from '../components/MyLayout.js'

const About = () => {
  console.log('client about')
  return (
    <Layout>
      <h3>Pull requests are always welcome</h3>
      <a target='view_window' href='https://github.com/amanoooo/util-service' >Github</a>
      <h3>Maintained by amano</h3>
      <ul>
        <li>Mail: <a href='mailto:1060996790@qq.com' >1060996790@qq.com</a></li>
        <li>Blog: <a target='_blank' href='https://fe2o3.club'>https://fe2o3.club</a></li>
      </ul>
    </Layout>
  )
}

About.getInitialProps = async function (contex) {
  console.log('server about')

  // return {
  //   shows: data
  // }
  return { about: 1 }
}

export default About
