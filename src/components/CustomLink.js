import { Link, useMatch } from 'react-router-dom'

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch()
  console.log({ match })
  return (
    <Link
      to={to}
      style={{
        color: match ? 'red' : 'white',
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default CustomLink
