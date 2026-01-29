/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CategoryChip_category$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type CategoryChipList_categories$ref: FragmentReference;
export type CategoryChipList_categories = {|
  +nodes: ?$ReadOnlyArray<?{|
    +objectId: number,
    +label: ?string,
    +$fragmentRefs: CategoryChip_category$ref,
  |}>,
  +$refType: CategoryChipList_categories$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CategoryChipList_categories",
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
        },
        {
          "kind": "FragmentSpread",
          "name": "CategoryChip_category",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7c80ab394237e58184444e8ec14d1a74';
module.exports = node;
