import {commitMutation, graphql} from 'react-relay';
import Environment from "../environment";

const mutation = graphql`
  mutation LoginMutation(
    $input: LoginInput!
  ) {
    login(input: $input) {
      app {
        user {
          ...LoginDialog_user
        }
      }
    }
  }
`;

export function login(email, password, onSuccess, onError) {
  const variables = {
    input: {
      email, password
    },
  };

  commitMutation(
    Environment,
    {
      mutation,
      variables,
      updater: (store) => {
        // Get the payload returned from the server
        const payload = store.getRootField('login');
        if (!payload) {
          return;
        }
        const app = payload.getLinkedRecord('app');
        const user = app.getLinkedRecord('user');
        const root = store.getRoot();
        const mainApp = root.getLinkedRecord('app');
        const appuser = mainApp.setLinkedRecord(user, 'user');

        // Get the edge of the newly created Todo record
  
      },
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

