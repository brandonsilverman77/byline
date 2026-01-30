/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CategorizeAuthorDialog_categories$ref: FragmentReference;
export type CategorizeAuthorDialog_categories = {|
  +nodes: ?$ReadOnlyArray<?{|
    +id: string,
    +objectId: number,
    +label: ?string,
  |}>,
  +$refType: CategorizeAuthorDialog_categories$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CategorizeAuthorDialog_categories",
  "type": "CategoryConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
          "name": "objectId",
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
};
// prettier-ignore
(node/*: any*/).hash = 'a5f66a98cd997c90dfbb9935f2cc924d';
module.exports = node;
