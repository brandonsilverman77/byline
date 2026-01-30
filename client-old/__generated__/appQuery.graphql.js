/**
 * @flow
 * @relayHash d5690768c96e65e8db60fe1f4109a28d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LoginDialog_user$ref = any;
export type appQueryVariables = {||};
export type appQueryResponse = {|
  +app: {|
    +user: ?{|
      +$fragmentRefs: LoginDialog_user$ref
    |}
  |}
|};
export type appQuery = {|
  variables: appQueryVariables,
  response: appQueryResponse,
|};
*/


/*
query appQuery {
  app {
    user {
      ...LoginDialog_user
      id
    }
  }
}

fragment LoginDialog_user on User {
  id
  email
  superadmin
  objectId
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "appQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "app",
        "storageKey": null,
        "args": null,
        "concreteType": "App",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "LoginDialog_user",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "appQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "app",
        "storageKey": null,
        "args": null,
        "concreteType": "App",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "email",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "superadmin",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "objectId",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "appQuery",
    "id": null,
    "text": "query appQuery {\n  app {\n    user {\n      ...LoginDialog_user\n      id\n    }\n  }\n}\n\nfragment LoginDialog_user on User {\n  id\n  email\n  superadmin\n  objectId\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '92cf2a2b33b99ca0d3385d7295f5c419';
module.exports = node;
