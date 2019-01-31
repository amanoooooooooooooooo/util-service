import Layout from '../components/MyLayout.js'
import { delay } from '../utils'

const About = () => {
  console.log('client about')
  return (
    <Layout>
      <h3>Pull requests are always welcome</h3>
      <a target='view_window' href='https://github.com/amanoooooooooooooooo/util-service' >github</a>
      <h3>Maintained by amano</h3>
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
