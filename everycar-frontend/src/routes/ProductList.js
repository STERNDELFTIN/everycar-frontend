import '../css/ProductList.css';
import styled from 'styled-components';

import Category from '../components/productList/Category';
import List from '../components/productList/List';

function ProductList() {
    return (
        <div className="ProductList">
            <Category />
            <List />
        </div>
    );
};

export default ProductList;