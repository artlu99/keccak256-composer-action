import { gql } from "graphql-request";

export const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;
export const query = gql`
  query GetResponse($fid: Int) {
    heartbeat
    isPrePermissionless(fid: $fid)
  }
`;
export interface Response {
  heartbeat: boolean;
  isPrePermissionless?: boolean;
}
export const authToken = process.env.AUTH_TOKEN;
export const mutation = gql`
  mutation UpdateData(
    $fid: Int
    $timestamp: Int
    $messageHash: String
    $text: String!
  ) {
    updateData(
      input: {
        fid: $fid
        timestamp: $timestamp
        messageHash: $messageHash
        text: $text
      }
    ) {
      success
      message
    }
  }
`;
