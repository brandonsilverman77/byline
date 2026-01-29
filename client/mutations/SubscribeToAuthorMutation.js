import {commitMutation, graphql} from 'react-relay';
import Environment from "../environment";


const mutation = graphql`
  mutation SubscribeToAuthorMutation(
    $input: SubscribeToAuthorInput!
  ) {
    subscribeToAuthor(input: $input) {
      author {
        id
        ...AuthorDetail_author
      }
    }
  }
`;

export function subscribeToAuthor(authorId, onError, onSuccess) {
  const variables = {
    input: {
      authorId
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