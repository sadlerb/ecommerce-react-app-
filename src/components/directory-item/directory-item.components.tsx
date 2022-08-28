import {BackgroundImage,Body,DirectoryItemContainer} from './directory-item.styles'
import { useNavigate } from "react-router-dom";
import {FC} from 'react';
import { DirectoryCategory } from '../directory/directory.component';


type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({category}) => {
    const {imageUrl,title,route} = category
    const navigate = useNavigate()


    function onNavigateHandeler(){
      navigate(route)
    }
    return (
        <DirectoryItemContainer onClick={onNavigateHandeler}>
        <BackgroundImage imageUrl={imageUrl}/>
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    )
}


export default DirectoryItem