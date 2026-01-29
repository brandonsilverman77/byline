/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CategorizeAuthorDialog_categories$ref = any;
type CategoryChipList_categories$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuthorDetail_categories$ref: FragmentReference;
export type AuthorDetail_categories = {|
  +$fragmentRefs: CategoryChipList_categories$ref & CategorizeAuthorDialog_categories$ref,
  +$refType: AuthorDetail_categories$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "AuthorDetail_categories",
  "type": "CategoryConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CategoryChipList_categories",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CategorizeAuthorDialog_categories",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '61df498dcc3606f0497b70cc05ee624c';
module.exports = node;
