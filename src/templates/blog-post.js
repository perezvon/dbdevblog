import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const tagListStyle = {
  display: 'inline-block',
  marginLeft: 0
}
const tagStyle = {
  float: 'left',
  margin: '0 5px',
  fontSize: '12px',
  padding: '0 3px 0 3px',
  border: '1px solid #8e0202',
  borderRadius: '4px'
}

const Template = ({data, location, pathContext}) => {
  const { markdownRemark: post} = data
  const { frontmatter, html } = post
  const {title, date} = frontmatter
  const {next, prev} = pathContext

  return (
    <div>
      <Helmet title={`${title} - distant blue devblog`} />

      <div>
        <h1>{title}</h1>
        <h3>{date}</h3>

        <div dangerouslySetInnerHTML={{__html: html}} />

        <p>
          {prev && (
            <Link to={prev.frontmatter.path}>
              Previous: {prev.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.frontmatter.path}>
              Next: {next.frontmatter.title}
            </Link>
          )}
        </p>
        <ul style={tagListStyle}>
          {post.frontmatter.tags.map((tag, index) => {
            return (
              <li style={tagStyle} key={index}>
                <Link to={`/tags/${tag}`}>
                  {tag}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
   )
}

export const PageQuery = graphql `
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: {path: {eq: $path}}) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`

export default Template
