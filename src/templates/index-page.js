import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import paragraphs from 'lines-to-paragraphs'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
    <div>
      <div style={{ backgroundColor: `#98EEF6` }}>
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-5 is-offset-1">
                <h1 className="title is-size-1" style={{ marginTop: `70pt`, marginBottom: `40pt` }}>
                  {title}
                </h1>
                <h2 className="subtitle is-size-4">
                  {subheading}
                </h2>

                <a className="button is-large is-primary"
                  style={{ backgroundColor: `#ff8800` }}
                  href="https://storypurpose.github.io/app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GET STARTED
                <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '2pt' }} />
                </a>
                <div className="is-size-7 has-text-grey-dark" style={{ marginTop: '4pt' }}>100% Free. No credit card required.</div>
              </div>
              <div className="column is-6">

                <div style={{
                  backgroundImage: `url(${
                    !!image.childImageSharp ? image.childImageSharp.fluid.src : image
                    })`,
                  backgroundRepeat: `no-repeat`,
                  height: `500px`
                }}
                ></div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section section--gradient" style={{ margin: '24pt 0' }}>
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1>{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle" dangerouslySetInnerHTML={{ __html: paragraphs(mainpitch.description) }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="section section--gradient" style={{ backgroundColor: `#f8f8f8` }}>
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content" style={{ paddingTop: '20pt' }}>
                <h1>{heading}</h1>
                <p>{description}</p>

                <Features gridItems={intro.blurbs} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="is-size-2">Latest stories </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  )

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 600, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title,
            text
          }
        }
      }
    }
  }
`
