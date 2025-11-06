// /src/graphql/portfolio.ts
import { gql } from "@apollo/client";

/**
 * ===============================
 * PORTFOLIO LIST  (/portfolio)
 * ===============================
 * - Lista básica de projetos
 * - Campos ACF principais (clientName)
 * - Featured image nativa
 * - Categorias (taxonomia PORTFOLIOCATEGORY)
 */
export const GET_PORTFOLIO_LIST = gql`
  query GetPortfolioList($first: Int = 24) {
    portfolios(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        date

        portfolioFields {
          clientName
        }

        featuredImage {
          node {
            mediaItemUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }

        # Categorias ligadas à taxonomia PORTFOLIOCATEGORY
        terms(where: { taxonomies: [PORTFOLIOCATEGORY] }) {
          nodes {
            id
            name
            slug
            uri
          }
        }
      }
    }
  }
`;

/**
 * ===============================
 * SINGLE PORTFOLIO  (/portfolio/[slug])
 * ===============================
 * - Campos ACF (heroImage, gallery, sideBlock, videos, poster)
 * - Taxonomia PORTFOLIOCATEGORY
 * - SEO e autor
 */
export const GET_PORTFOLIO_ITEM = gql`
  query GetPortfolioItem($slug: ID!) {
    portfolio(id: $slug, idType: SLUG) {
      id
      slug
      title
      date

      portfolioFields {
        clientName
        projectTagline
        summary

        heroImage {
          node {
            mediaItemUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }

        sideBlock {
          sideText
          leftImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          rightImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }

        gallery {
          edges {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }

        mediaGallery {
          edges {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }

        mediaVideos {
          videoUrl
          videoFile {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }

        poster {
          node {
            mediaItemUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }

      # 🔹 Taxonomia principal para o botão verde do single
      terms(where: { taxonomies: [PORTFOLIOCATEGORY] }) {
        nodes {
          id
          name
          slug
          uri
        }
      }

      author {
        node {
          name
          description
          avatar {
            url
          }
        }
      }

      seo {
        title
        metaDesc
        opengraphImage {
          mediaItemUrl
        }
      }

      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

// PAGINAÇÃO PARA O ARCHIVE (/portfolio)
export const GET_PORTFOLIO_ARCHIVE = gql`
  query GetPortfolioArchive($first: Int! = 8, $after: String) {
    portfolios(
      first: $first
      after: $after
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        slug
        uri
        title
        excerpt

        portfolioFields {
          clientName
        }

        featuredImage {
          node {
            mediaItemUrl
            altText
            mediaDetails { width height }
          }
        }

        # Taxonomia PORTFOLIOCATEGORY (para a "tag" do card)
        portfolioCategories: terms(where: { taxonomies: [PORTFOLIOCATEGORY] }) {
          nodes { id name slug uri }
        }
      }
    }
  }
`;