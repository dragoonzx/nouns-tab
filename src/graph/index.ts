import { gql } from "@urql/svelte";

export const auctionQuery = gql`
  query {
    auctions(orderDirection: desc, first: 1, orderBy: startTime) {
      id
      amount
      startTime
      endTime
      noun {
        seed {
          background
        }
      }
    }
  }
`;

export const addressNounsQuery = gql`
  query ($owner: String!) {
    nouns(where: { owner_contains: $owner }) {
      id
      seed {
        background
        body
        accessory
        head
        glasses
      }
      owner {
        id
      }
    }
  }
`;

export const proposalsQuery = gql`
  query {
    proposals(orderBy: startBlock, orderDirection: desc, first: 4) {
      id
      status
      title
      votes {
        id
        support
        votes
      }
    }
  }
`;
