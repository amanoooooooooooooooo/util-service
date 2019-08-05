import Layout from '../components/MyLayout'

import dynamic from 'next/dynamic'
const Color = dynamic(import('../components/Color'), { ssr: false })


const Setting = () => {
    return (
        <Layout>
            <h3>Setting</h3>
            <Color></Color>

        </Layout>
    )
}

export default Setting
