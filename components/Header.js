import Link from 'next/link'

import { getUserStorage } from '../client/util'

const linkStyle = {
  marginRight: 15
}

const Header = () => {
  const { mail } = getUserStorage()
  const userHref = mail ? '/user/info' : '/user/signup'
  return (
    <div>
      <Link href='/'>
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href={userHref}>
        <a style={linkStyle}>User</a>
      </Link>
      <Link href='/about'>
        <a style={linkStyle}>About</a>
      </Link>
    </div>
  )
}

export default Header
