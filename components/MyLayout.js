import Header from './Header'

const layoutStyle = {
  margin: 16,
  padding: 16,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <hr />
    {props.children}
  </div>
)

export default Layout
