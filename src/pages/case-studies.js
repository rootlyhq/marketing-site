import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { createUseStyles } from 'react-jss';
import get from 'lodash/get';

import { SEO, StickyFooter, PageMargins } from 'components';
import PostSummary from 'components/blog/PostSummary';

const MAX_WIDTH_BREAKPOINT = 'lg';

const useStyles = createUseStyles((theme) => ({
  header: {
    marginBottom: '2em',
  },

  summaryRoot: {
    display: 'flex',
    marginBottom: '2em',
  },

  summaryWrapper: {},

  summaryImageWrapper: {
    alignItems: 'center',
    display: 'none',
  },

  [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
    summaryImageWrapper: {
      display: 'flex',
    },

    summaryWrapper: {
      marginLeft: 16,
    },
  },
}));

const CaseStudiesIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const siteTitle = data.site.siteMetadata.title;
  const classes = useStyles();

  return (
    <>
      <SEO
        title={`Backstage case studies | ${siteTitle}`}
        description={`
          Learn how organizations around the world are adopting and benefiting from Backstage.
        `}
      />

      <StickyFooter maxWidthBreakpoint={MAX_WIDTH_BREAKPOINT} location={location}>
        <PageMargins>
          <header className={classes.header}>
            <h2>Case Studies</h2>
          </header>

          {posts.map(({ node }) => {
            const logoBackgroundColor = get(node, 'frontmatter.logo.backgroundColor', null);

            return (
              <div key={node.fields.slug} className={classes.summaryRoot}>
                <span
                  className={classes.summaryImageWrapper}
                  style={{ backgroundColor: node.frontmatter.logo.backgroundColor }}
                >
                  <GatsbyImage
                    image={node.frontmatter.logo.image.childImageSharp.gatsbyImageData}
                    backgroundColor={logoBackgroundColor}
                    alt={node.frontmatter.logo.alt}
                  />
                </span>
                <span className={classes.summaryWrapper}>
                  <PostSummary post={node} />
                </span>
              </div>
            );
          })}
        </PageMargins>
      </StickyFooter>
    </>
  );
};

export default CaseStudiesIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/.+/case-studies/.+/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }

          frontmatter {
            date
            title
            description
            author {
              name
            }

            logo {
              alt
              backgroundColor
              image {
                childImageSharp {
                  gatsbyImageData(layout: FIXED, width: 140)
                }
              }
            }
          }
        }
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`;
