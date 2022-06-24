import CategoryItem from "../directory-item/directory-item.components";
import './directory.styles.scss'


const Directory = ({categrories}) => {
  return (
    <div className="directory-container ">
      {categrories.map((category) => (
       <CategoryItem key={category.id} category={category}/>
        ))}
    </div>
  );
}
export default Directory