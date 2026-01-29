import React, {Component} from "react";
import {createFragmentContainer, graphql, QueryRenderer} from 'react-relay';
import Environment from "../environment";
import CategoryChipList from "UI/CategoryChipList";
import CircularProgress from '@material-ui/core/CircularProgress';


class CategoryChipListContainer extends Component {
  
  
  render() {
    const {onSelect, selected, ignoreHint} = this.props;
    
    console.log("selected", selected);
    
    
    return <QueryRenderer
      environment={Environment}
      query={graphql`
        query CategoryChipListContainerQuery  {
          app {
            categories {
              nodes {
                objectId
              }
              ...CategoryChipList_categories
            }
          }
          
        }
      `}
      variables={{}}
      render={({error, props}) => {

        if (!props) {
          return null;
        }
        
        console.log(props, error);
        
        const categoryIds = props.app.categories.nodes.map(c => c.objectId);
                
        return <CategoryChipList 
          onSelect={onSelect}
          selected={selected}
          ignoreHint={ignoreHint}
          categoryIds={categoryIds} 
          categories={props.app.categories} />;
      }}
    />
  }
}

export default CategoryChipListContainer;



