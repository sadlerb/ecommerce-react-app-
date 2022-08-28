import {Routes,Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import {fetchCategoriesStart} from '../../store/categories/category.action'
import CategoreisPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';



const Shop = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(fetchCategoriesStart())
    })

  return (
    <Routes>
        <Route index element={<CategoreisPreview />}/>
        <Route path=':category' element={<Category />}/>
    </Routes>
  );
};

export default Shop;