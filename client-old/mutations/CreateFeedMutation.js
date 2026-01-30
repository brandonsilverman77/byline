import {commitMutation, graphql} from 'react-relay';
import Environment from "../environment";


const mutation = graphql`
  mutation CreateFeedMutation(
    $input: CreateFeedInput!
  ) {
    createFeed(input: $input) {
      feed {
        id
        url
      }
    }
  }
`;

export function createFeed(url, onSuccess, onError) {
  const variables = {
    input: {
      url
    },
  };

  commitMutation(
    Environment,
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        console.log(errors);
        if (errors && errors[0].message) {
          onError(errors[0].message)
        } else {
          onSuccess();
        }
      },
      onError: err => {
        onError(err.message)
      }
    },
  );
}