/**
 * @flow
 * @relayHash ff83ccb69d61a6bc9577d2829ad2644c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AuthorDetail_categories$ref = any;
type AuthorDetail_user$ref = any;
type AuthorList_authors$ref = any;
export type AuthorSearchQueryVariables = {|
  search: string,
  categories?: ?$ReadOnlyArray<number>,
|};
export type AuthorSearchQueryResponse = {|
  +app: {|
    +authors: {|
      +$fragmentRefs: AuthorList_authors$ref
    |},
    +user: ?{|
      +$fragmentRefs: AuthorDetail_user$ref
    |},
    +categories: ?{|
      +$fragmentRefs: AuthorDetail_categories$ref
    |},
  |}
|};
export type AuthorSearchQuery = {|
  variables: AuthorSearchQueryVariables,
  response: AuthorSearchQueryResponse,
|};
*/


/*
query AuthorSearchQuery(
  $search: String!
  $categories: [Int!]
) {
  app {
    authors(search: $search, categories: $categories) {
      ...AuthorList_authors
    }
    user {
      ...AuthorDetail_user
      id
    }
    categories {
      ...AuthorDetail_categories
    }
  }
}

fragment AuthorList_authors on AuthorConnection {
  nodes {
    id
    ...AuthorDetail_author
  }
}

fragment AuthorDetail_user on User {
  id
  superadmin
}

fragment AuthorDetail_categories on CategoryConnection {
  ...CategoryChipList_categories
  ...CategorizeAuthorDialog_categories
}

fragment CategoryChipList_categories on CategoryConnection {
  nodes {
    objectId
    label
    ...CategoryChip_category
    id
  }
}

fragment CategorizeAuthorDialog_categories on CategoryConnection {
  nodes {
    id
    objectId
    label
  }
}

fragment CategoryChip_category on Category {
  id
  objectId
  label
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
    "name": "search",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "categories",
    "type": "[Int!]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "categories",
    "variableName": "categories",
    "type": "[Int!]"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "objectId",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AuthorSearchQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
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
            "name": "authors",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "AuthorConnection",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "AuthorList_authors",
                "args": null
              }
            ]
          },
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
                "name": "AuthorDetail_user",
                "args": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "categories",
            "storageKey": null,
            "args": null,
            "concreteType": "CategoryConnection",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "AuthorDetail_categories",
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
    "name": "AuthorSearchQuery",
    "argumentDefinitions": (v0/*: any*/),
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
            "name": "authors",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "AuthorConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "nodes",
                "storageKey": null,
                "args": null,
                "concreteType": "Author",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "imageUrl",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
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
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "superadmin",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "categories",
            "storageKey": null,
            "args": null,
            "concreteType": "CategoryConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "nodes",
                "storageKey": null,
                "args": null,
                "concreteType": "Category",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "label",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AuthorSearchQuery",
    "id": null,
    "text": "query AuthorSearchQuery(\n  $search: String!\n  $categories: [Int!]\n) {\n  app {\n    authors(search: $search, categories: $categories) {\n      ...AuthorList_authors\n    }\n    user {\n      ...AuthorDetail_user\n      id\n    }\n    categories {\n      ...AuthorDetail_categories\n    }\n  }\n}\n\nfragment AuthorList_authors on AuthorConnection {\n  nodes {\n    id\n    ...AuthorDetail_author\n  }\n}\n\nfragment AuthorDetail_user on User {\n  id\n  superadmin\n}\n\nfragment AuthorDetail_categories on CategoryConnection {\n  ...CategoryChipList_categories\n  ...CategorizeAuthorDialog_categories\n}\n\nfragment CategoryChipList_categories on CategoryConnection {\n  nodes {\n    objectId\n    label\n    ...CategoryChip_category\n    id\n  }\n}\n\nfragment CategorizeAuthorDialog_categories on CategoryConnection {\n  nodes {\n    id\n    objectId\n    label\n  }\n}\n\nfragment CategoryChip_category on Category {\n  id\n  objectId\n  label\n}\n\nfragment AuthorDetail_author on Author {\n  id\n  name\n  objectId\n  categoryIds\n  subscribed\n  twitterHandle\n  imageUrl\n  twitterId\n  featured\n  twitterProfileImageUrl\n  bio\n  domains {\n    nodes {\n      id\n      host\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2d8455de9cc380ac39cc56511b0e8f20';
module.exports = node;
