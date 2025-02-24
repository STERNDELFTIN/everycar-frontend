import '../css/ShortRentList.css';

import Category from '../components/shortRent/Category';
import List from '../components/shortRent/List';

function ShortRent() {
    return (
        <div className="ProductList">
            <Category />
            <List />
        </div>
    );
};

export default ShortRent;