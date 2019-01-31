import Layout from '../components/MyLayout.js'
import { delay } from '../utils'

const About = () => {
  console.log('client about')
  return (
    <Layout>
      <p>This is the about page</p>
    </Layout>
  )
}

About.getInitialProps = async function (contex) {
  console.log('server about', contex)

  // return {
  //   shows: data
  // }
  return { about: 1 }
}

export default About
