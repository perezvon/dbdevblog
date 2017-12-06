import React from 'react'
import Link from 'gatsby-link'

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

const IndexPage = ({data}) => {
  const { edges: posts} = data.allMarkdownRemark
  return (
  <div>
    {posts.map(({node: post}) => {
    const {frontmatter} = post
    return (
      <div>
        <h2>
          <Link to={frontmatter.path}>
            {frontmatter.title}
          </Link>
        </h2>
        <p>{frontmatter.date}</p>
        <p>{frontmatter.excerpt}</p>
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
    )
    }
  )}
  </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`

export default IndexPage
