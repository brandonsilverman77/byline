import {commitMutation, graphql} from 'react-relay';
import Environment from "../environment";


const mutation = graphql`
  mutation CreateAuthorCategoryMutation(
    $input: CreateAuthorCategoryInput!
  ) {
    createAuthorCategory(input: $input) {
      author {
        id
        ...AuthorDetail_author
      }
    }
  }
`;

export function createAuthorCategory(authorId, categoryIds, onError, onSuccess) {
  const variables = {
    input: {
      authorId,
      categoryIds
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