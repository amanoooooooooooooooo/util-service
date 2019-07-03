import Header from './Header'

const layoutStyle = {
  margin: 16,
  padding: 16,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
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
