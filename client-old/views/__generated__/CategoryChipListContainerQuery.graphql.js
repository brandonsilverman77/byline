/**
 * @flow
 * @relayHash 9e9a902dbeb9f6c4583cce456acb6098
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CategoryChipList_categories$ref = any;
export type CategoryChipListContainerQueryVariables = {||};
export type CategoryChipListContainerQueryResponse = {|
  +app: {|
    +categories: ?{|
      +nodes: ?$ReadOnlyArray<?{|
        +objectId: number
      |}>,
      +$fragmentRefs: CategoryChipList_categories$ref,
    |}
  |}
|};
export type CategoryChipListContainerQuery = {|
  variables: CategoryChipListContainerQueryVariables,
  response: CategoryChipListContainerQueryResponse,
|};
*/


/*
query CategoryChipListContainerQuery {
  app {
    categories {
      nodes {
        objectId
        id
      }
      ...CategoryChipList_categories
    }
  }
}

fragment CategoryChipList_categories on CategoryConnection {
  nodes {
    objectId
    label
    ...CategoryChip_category
    id
  }
}

fragment CategoryChip_category on Category {
  id
  objectId
  label
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
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
    "name": "CategoryChipListContainerQuery",
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
                  (v0/*: any*/)
                ]
              },
              {
                "kind": "FragmentSpread",
                "name": "CategoryChipList_categories",
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
    "name": "CategoryChipListContainerQuery",
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
                  (v0/*: any*/),
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
                    "name": "label",
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
  "params": {
    "operationKind": "query",
    "name": "CategoryChipListContainerQuery",
    "id": null,
    "text": "query CategoryChipListContainerQuery {\n  app {\n    categories {\n      nodes {\n        objectId\n        id\n      }\n      ...CategoryChipList_categories\n    }\n  }\n}\n\nfragment CategoryChipList_categories on CategoryConnection {\n  nodes {\n    objectId\n    label\n    ...CategoryChip_category\n    id\n  }\n}\n\nfragment CategoryChip_category on Category {\n  id\n  objectId\n  label\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c22457d85e4f572e2b6e94a9131fb0c7';
module.exports = node;
