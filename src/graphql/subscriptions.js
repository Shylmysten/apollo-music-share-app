import { gql } from "apollo-boost";

export const GET_SONGS = gql`
subscription getSongs {
    songs(order_by: {create_at: desc}) {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }`