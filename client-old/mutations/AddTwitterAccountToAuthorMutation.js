import {commitMutation, graphql} from 'react-relay';
import Environment from "../environment";


const mutation = graphql`
  mutation AddTwitterAccountToAuthorMutation(
    $input: AddTwitterAccountToAuthorInput!
  ) {
    addTwitterAccountToAuthor(input: $input) {
      author {
        id
        ...AuthorDetail_author
      }
    }
  }
`;

export function addTwitterAccountToAuthor(authorId, twitterUrlOrName, onError, onSuccess) {
  const variables = {
    input: {
      authorId,
      twitterUrlOrName
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