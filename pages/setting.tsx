import Layout from '../components/MyLayout'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import { delCookie, setCookie, getCookie } from '../utils';
import { LOCAL } from '../client/constant';
const Color = dynamic(import('../components/Color'), { ssr: false })

function Setting() {
    const [model, setModel] = useState(0)

    useEffect(() => {
        const _mode = getCookie(LOCAL.MODE_DEV) || '0'
        setModel(parseInt(_mode))
    })
    const _toggleDev = () => {
        if (model) {
            delCookie(LOCAL.MODE_DEV)
        } else {
            setCookie(LOCAL.MODE_DEV, '1', undefined, '/')
        }
        setModel(model ^ 1)
    }
    return (
        <Layout>
            <h3>Setting</h3>
            <Color></Color>
            <hr />
            <div className='flex'>
                <div>开发者模式</div>
                <div onClick={_toggleDev}>{!model ? '已关闭' : '已打开'}</div>
            </div>

        </Layout>
    )
}

export default Setting
