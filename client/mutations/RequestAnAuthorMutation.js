import {commitMutation, graphql} from 'react-relay';
import Environment from "../environment";

const mutation = graphql`
  mutation RequestAnAuthorMutation(
    $input: RequestAnAuthorInput!
  ) {
    requestAnAuthor(input: $input) {
      errors
      success
    }
  }
`;

export function requestAnAuthor(name, onSuccess, onError) {
  const variables = {
    input: {
      name
    },
  };

  commitMutation(
    Environment,
    {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors && errors[0] && errors[0].message) {
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

