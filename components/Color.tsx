import React, { useState } from 'react';
import { BlockPicker, GithubPicker, ColorResult, TwitterPicker } from 'react-color';
import { getStorage, setStorage } from '../utils';
import { NextPageContext, NextPage } from 'next';
import { LOCAL } from '../client/constant';

function Color(props: any) {
    const fontColor = getStorage(LOCAL.COLOR_FONT) || 'black'
    const bgColor = getStorage(LOCAL.COLOR_BG) || 'white'

    const [font, setFont] = useState({ color: fontColor, show: false })
    const [bg, setBg] = useState({ color: bgColor, show: false })


    function _handleChange(color: ColorResult, type: string) {
        // console.log('_handleChange color', color)
        if (type === 'font') {
            setFont({ ...font, color: color.hex })
        } else {
            setBg({ ...bg, color: color.hex })
        }
    }
    function _handleChangeComplete(color: ColorResult, type: string) {
        // console.log('_handleChangeComplete color', color)
        if (type === 'font') {
            setFont({ ...font, color: color.hex })
        } else {
            setBg({ ...bg, color: color.hex })
        }
    }
    function _toggleClick(type: string) {
        if (type === 'font') {
            setFont({ ...font, show: !font.show })
        } else {
            setBg({ ...bg, show: !bg.show })
        }
    }
    function _reset() {
        setStorage(LOCAL.COLOR_FONT, "")
        setStorage(LOCAL.COLOR_BG, "")
        setFont({ ...font, color: 'black' })
        setBg({ ...bg, color: 'white' })
    }
    function _save() {
        setStorage(LOCAL.COLOR_FONT, font.color)
        setStorage(LOCAL.COLOR_BG, bg.color)
        setFont({ ...font, show: false })
        setBg({ ...bg, show: false })
    }
    return <div>
        <div className="flex" style={{ alignItems: 'center' }} onClick={() => { _toggleClick('font') }}>
            <span>字体颜色</span>
            <div style={{ backgroundColor: font.color, height: '1rem', width: '1rem' }}></div>
        </div>
        {font.show && <div style={{ marginTop: '0.5rem' }}><TwitterPicker color={fontColor} onChange={(e) => _handleChange(e, 'font')} onChangeComplete={e => _handleChangeComplete(e, 'font')} triangle={'hide'} /></div>}
        <div className="flex" style={{ alignItems: 'center', marginTop: '0.1rem' }} onClick={() => { _toggleClick('bg') }}>
            <span>背景颜色</span>
            <div style={{ backgroundColor: bg.color, height: '1rem', width: '1rem' }}></div>
        </div>
        {bg.show && <div style={{ marginTop: '0.5rem' }}><TwitterPicker onChange={(e) => _handleChange(e, 'bg')} onChangeComplete={e => _handleChangeComplete(e, 'bg')} triangle={'hide'} /></div>}
        <div className="flex" style={{ marginTop: '0.1rem' }}>
            <div onClick={_reset}>重置</div>
            <div onClick={_save}>保存</div>
        </div>
    </div>
}
Color.getInitialProps = function (props: NextPageContext) {
    if (!props.req) {
        console.log('-----server');
    } else {
        console.log('-----client');
    }
    return {
    }
}

export default Color