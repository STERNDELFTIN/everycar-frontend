import '../../css/routes/ShortRentList.css';

import Category from '../../components/common/carList/Category';
import List from '../../components/common/carList/List';

function ShortRent() {
    return (
        <div className="ProductList">
            <Category />
            <List />
        </div>
    );
};

export default ShortRent;