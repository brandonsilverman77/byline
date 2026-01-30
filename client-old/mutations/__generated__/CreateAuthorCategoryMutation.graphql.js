/**
 * @flow
 * @relayHash 4bf780a2a1aa894ce58831a3aaf20fe0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AuthorDetail_author$ref = any;
export type CreateAuthorCategoryInput = {|
  authorId: number,
  categoryIds: $ReadOnlyArray<number>,
  clientMutationId?: ?string,
|};
export type CreateAuthorCategoryMutationVariables = {|
  input: CreateAuthorCategoryInput
|};
export type CreateAuthorCategoryMutationResponse = {|
  +createAuthorCategory: ?{|
    +author: ?{|
      +id: string,
      +$fragmentRefs: AuthorDetail_author$ref,
    |}
  |}
|};
export type CreateAuthorCategoryMutation = {|
  variables: CreateAuthorCategoryMutationVariables,
  response: CreateAuthorCategoryMutationResponse,
|};
*/


/*
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
    "type": "CreateAuthorCategoryInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateAuthorCategoryInput!"
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
    "name": "CreateAuthorCategoryMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createAuthorCategory",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAuthorCategoryPayload",
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
    "name": "CreateAuthorCategoryMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createAuthorCategory",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAuthorCategoryPayload",
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
    "name": "CreateAuthorCategoryMutation",
    "id": null,
    "text": "mutation CreateAuthorCategoryMutation(\n  $input: CreateAuthorCategoryInput!\n) {\n  createAuthorCategory(input: $input) {\n    author {\n      id\n      ...AuthorDetail_author\n    }\n  }\n}\n\nfragment AuthorDetail_author on Author {\n  id\n  name\n  objectId\n  categoryIds\n  subscribed\n  twitterHandle\n  imageUrl\n  twitterId\n  featured\n  twitterProfileImageUrl\n  bio\n  domains {\n    nodes {\n      id\n      host\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bbdaaa2a8ed7687b378e6442f433e170';
module.exports = node;
