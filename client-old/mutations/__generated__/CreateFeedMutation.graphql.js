/**
 * @flow
 * @relayHash b092860eb4b9fdf1a3a2eb8f7e6d911f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateFeedInput = {|
  url: string,
  clientMutationId?: ?string,
|};
export type CreateFeedMutationVariables = {|
  input: CreateFeedInput
|};
export type CreateFeedMutationResponse = {|
  +createFeed: ?{|
    +feed: ?{|
      +id: string,
      +url: string,
    |}
  |}
|};
export type CreateFeedMutation = {|
  variables: CreateFeedMutationVariables,
  response: CreateFeedMutationResponse,
|};
*/


/*
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateFeedInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createFeed",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateFeedInput!"
      }
    ],
    "concreteType": "CreateFeedPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "feed",
        "storageKey": null,
        "args": null,
        "concreteType": "Feed",
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
            "name": "url",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateFeedMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateFeedMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateFeedMutation",
    "id": null,
    "text": "mutation CreateFeedMutation(\n  $input: CreateFeedInput!\n) {\n  createFeed(input: $input) {\n    feed {\n      id\n      url\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '950a2d47f82dec192fab03b6b2385b30';
module.exports = node;
