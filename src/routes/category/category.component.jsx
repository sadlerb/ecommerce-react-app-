import './category.styles.scss';

import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

function Category(){
    const {category} = useParams();
   
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products,setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[category,categoriesMap]);

    return(
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products && products.map((product)=><ProductCard key={products.id} product={product}/>)}
            </div>
        </>
    );   
};


export default Category;