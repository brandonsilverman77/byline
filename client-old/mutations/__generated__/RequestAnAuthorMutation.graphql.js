/**
 * @flow
 * @relayHash 6a1cac12cceb6f0ecdd5cd9c8267bb26
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RequestAnAuthorInput = {|
  name: string,
  clientMutationId?: ?string,
|};
export type RequestAnAuthorMutationVariables = {|
  input: RequestAnAuthorInput
|};
export type RequestAnAuthorMutationResponse = {|
  +requestAnAuthor: ?{|
    +errors: $ReadOnlyArray<string>,
    +success: boolean,
  |}
|};
export type RequestAnAuthorMutation = {|
  variables: RequestAnAuthorMutationVariables,
  response: RequestAnAuthorMutationResponse,
|};
*/


/*
mutation RequestAnAuthorMutation(
  $input: RequestAnAuthorInput!
) {
  requestAnAuthor(input: $input) {
    errors
    success
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "RequestAnAuthorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "requestAnAuthor",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "RequestAnAuthorInput!"
      }
    ],
    "concreteType": "RequestAnAuthorPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "errors",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "success",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RequestAnAuthorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "RequestAnAuthorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "RequestAnAuthorMutation",
    "id": null,
    "text": "mutation RequestAnAuthorMutation(\n  $input: RequestAnAuthorInput!\n) {\n  requestAnAuthor(input: $input) {\n    errors\n    success\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6d625500d5e29f98d127d49214a5313d';
module.exports = node;
