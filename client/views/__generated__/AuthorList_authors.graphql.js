/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type AuthorDetail_author$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type AuthorList_authors$ref: FragmentReference;
export type AuthorList_authors = {|
  +nodes: ?$ReadOnlyArray<?{|
    +id: string,
    +$fragmentRefs: AuthorDetail_author$ref,
  |}>,
  +$refType: AuthorList_authors$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "AuthorList_authors",
  "type": "AuthorConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "AuthorDetail_author",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '62f04cdfeb454c70dcb30e17a8a58713';
module.exports = node;
