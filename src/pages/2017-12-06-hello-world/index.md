---
path: "/hello-world"
date: "2017-12-06T10:02:21.165Z"
title: "hello world"
tags: ['dev', 'gatsby', 'blog']
excerpt: "Wherein we discuss the creation of this very blog."
---

![an image](https://upload.wikimedia.org/wikipedia/commons/1/1a/Code.jpg)

Howdy there, and welcome to the Distant Blue Software devblog. This is a place where you will find posts ranging from the educational to the highly trivial but all adhering to the general theme of software development. We build everything from out-of-the-box Squarespace sites to custom e-commerce and app solutions, and we are always learning and teaching one another.

In this first post we're going to talk about how we built this blog right here using Gatsby, and why we chose to do so.

## Gatsby and the JAMStack

The TL;DR version of this post is: we saw a free course on [Egghead.io](https://egghead.io/courses/build-a-blog-with-react-and-markdown-using-gatsby "Build a Blog with React and Markdown using Gatsby - Egghead.io") about building a Gatsby blog and said, "OK!" But it does go a little deeper. Fact is we've been tiptoeing on the edges of working with the JAMStack for a while, and it was high time to dive in.

The JAMStack stands for JavaScript, APIs, and Markdown. Basically it's trying to get away from many of the complexities of modern web apps and run something that's kind of akin to the way we built the World Wide Web in the first place. Here's a nice distillation from [JAMstack.org](https://jamstack.org/) of what it signifies, why we like it, and why you might, too:

>When we talk about “The Stack,” we no longer talk about operating systems, specific web servers, backend programming languages, or databases.
>The JAMstack is not about specific technologies. It’s a new way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience.

For us, the prospect of writing code that's super-lightweight, flexible, and low to the ground is irresistible. Gatsby gives us a head start by doing a whole bunch of the heavy lifting behind the scenes, so we can just write templates in React / GraphQL, blog posts in Markdown, and fly.

For example, here's how we compile and build each blog post from a template at build time:

```javascript
exports.createPages = ({ boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            date
            path
            title
            excerpt
            tags
          }
        }
      }
    }
  }`)
  .then(result => {
    if (result.errors) {
      console.log(result.errors)
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges

    createTagPages(createPage, posts)

    posts.forEach(({node}, index) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : posts[index-1].node,
          next: index === (posts.length-1) ? null : posts[index+1].node
        }
      })
    })
  })
}
```

We're using a GraphQL query to collect all our posts and the relevant info, then calling Gatsby's `createPages()` function with a template we've built to populate each one. It's crazy-simple once you get the hang of the syntax, and extremely powerful.

[Gatsby](https://www.gatsbyjs.org/) is like the Rails of this tech stack: it gives you real power from the moment you install the cli. It's not just for Markdown blogs either. You could grab data from the server with an API call, or process JSON or YAML files, or you can use a legacy CMS like WordPress or Drupal as the back-end. Gatsby will build your static site from whatever data you feed it and spit you out a shiny new site, ready to go. It's pretty damn amazing.

We've already got a couple other projects coming down the pipe that we'll be leveraging the power of Gatsby and the JAMStack to build. I'm sure we'll be talking about them here soon. Check it out for yourself; I don't think you'll be disappointed. 
