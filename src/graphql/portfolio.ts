import { gql } from "@apollo/client";

export const GET_PORTFOLIO_LIST = gql`
  query GetPortfolioList($first: Int = 24) {
    portfolios(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        date
        portfolioFields {
          summary
          heroImage {
            node {
              mediaItemUrl
              mediaDetails { width height }
            }
          }
        }
      }
    }
  }
`;

export const GET_PORTFOLIO_ITEM = gql`
  query GetPortfolioItem($slug: ID!) {
    portfolio(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      portfolioFields {
        summary
        heroImage {
          node { mediaItemUrl mediaDetails { width height } }
        }
        gallery {
          edges {
            node {
              mediaItemUrl
              mediaDetails { width height }
            }
          }
        }
        sectionBackground
        sectionChallenges
        sectionSolution
      }
      portfolioCategories { nodes { id name slug } }
      author {
        node { name description avatar { url } }
      }
      seo { title metaDesc opengraphImage { mediaItemUrl } }
    }
  }
`;
