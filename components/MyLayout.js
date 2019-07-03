import Header from './Header'
import NextHead from 'next/head';

const layoutStyle = {
  margin: 16,
  padding: 16,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    </NextHead>
    <NextHead>
      <meta httpEquiv="Content-Type" content="application/xhtml+xml;charset=utf-8"/>
    </NextHead>
    <style jsx global>{`
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        background-color: rgb(40, 44, 52);
        color: rgb(171, 178, 191);
        padding: 16px;
        border-radius: 5px;
      }
      em {
        color: #ffa11a;
      }
      .novel {
        white-space: pre-wrap;
      }
    `}</style>
    <Header />
    <hr />
    {props.children}
  </div>
)

export default Layout
