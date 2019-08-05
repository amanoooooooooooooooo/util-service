import Layout from '../components/MyLayout'

import dynamic from 'next/dynamic'
import { useReducer, useState } from 'react';
import { delCookie, setCookie } from '../utils';
const Color = dynamic(import('../components/Color'), { ssr: false })

function Setting() {
    const [model, setModel] = useState(false)
    const _developer = () => {
        if (model) {
            delCookie('d')
        } else {
            setCookie('d', 'true', undefined, '/')
        }
        setModel(!model)
    }
    return (
        <Layout>
            <h3>Setting</h3>
            <Color></Color>
            <hr />
            <div className='flex'>
                <div>开发者模式</div>
                <div onClick={_developer}>{!model ? '已关闭' : '已打开'}</div>
            </div>

        </Layout>
    )
}

export default Setting
