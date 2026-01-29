/**
 * @flow
 * @relayHash 777d3de2a4e3d0ac009cf8f08f78b33c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AuthorDetail_author$ref = any;
export type SubscribeToAuthorInput = {|
  authorId: number,
  clientMutationId?: ?string,
|};
export type SubscribeToAuthorMutationVariables = {|
  input: SubscribeToAuthorInput
|};
export type SubscribeToAuthorMutationResponse = {|
  +subscribeToAuthor: ?{|
    +author: ?{|
      +id: string,
      +$fragmentRefs: AuthorDetail_author$ref,
    |}
  |}
|};
export type SubscribeToAuthorMutation = {|
  variables: SubscribeToAuthorMutationVariables,
  response: SubscribeToAuthorMutationResponse,
|};
*/


/*
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

fragment AuthorDetail_author on Author {
  id
  name
  objectId
  categoryIds
  subscribed
  twitterHandle
  imageUrl
  twitterId
  featured
  twitterProfileImageUrl
  bio
  domains {
    nodes {
      id
      host
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SubscribeToAuthorInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SubscribeToAuthorInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SubscribeToAuthorMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "subscribeToAuthor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SubscribeToAuthorPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "author",
            "storageKey": null,
            "args": null,
            "concreteType": "Author",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "FragmentSpread",
                "name": "AuthorDetail_author",
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
    "name": "SubscribeToAuthorMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "subscribeToAuthor",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SubscribeToAuthorPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "author",
            "storageKey": null,
            "args": null,
            "concreteType": "Author",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "imageUrl",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "objectId",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "categoryIds",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "subscribed",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "twitterHandle",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "twitterId",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "featured",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "twitterProfileImageUrl",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "bio",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "domains",
                "storageKey": null,
                "args": null,
                "concreteType": "DomainConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "nodes",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Domain",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "host",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "SubscribeToAuthorMutation",
    "id": null,
    "text": "mutation SubscribeToAuthorMutation(\n  $input: SubscribeToAuthorInput!\n) {\n  subscribeToAuthor(input: $input) {\n    author {\n      id\n      ...AuthorDetail_author\n    }\n  }\n}\n\nfragment AuthorDetail_author on Author {\n  id\n  name\n  objectId\n  categoryIds\n  subscribed\n  twitterHandle\n  imageUrl\n  twitterId\n  featured\n  twitterProfileImageUrl\n  bio\n  domains {\n    nodes {\n      id\n      host\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e9851443dc4dc6bc19b9aa882faf502d';
module.exports = node;
