import React, {PureComponent} from "react";
import {createFragmentContainer, graphql} from 'react-relay';
import CreateFeedView from "Views/CreateFeedView";

const CreateFeed = (props) => {
  console.log("CreateFeed Props", props);
  return <CreateFeedView {...props} />;
}

// export default createFragmentContainer(CreateFeed, {
//   // For each of the props that depend on server data, we define a corresponding
//   // key in this object. Here, the component expects server data to populate the
//   // `item` prop, so we'll specify the fragment from above at the `item` key.
//   feeds: graphql`
//     fragment CreateFeed_feeds on Query {
//       feeds {
//         url 
//         id
//       }
//     }
//   `,
// });

