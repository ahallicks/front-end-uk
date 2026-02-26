export const HeroFragment = `
      ... on Hero {
        id
        keyline {
          html
          raw
        }
        title
        content {
          html
          raw
        }
        links {
          ... on ButtonLink {
            linkText
            linkUrl
            variation
          }
        }
      }
`;
