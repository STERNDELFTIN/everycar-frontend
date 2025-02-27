import '../../css/routes/ShortRentList.css';

import Category from '../../components/common/carList/Category';
import List from '../../components/common/carList/List';

function QuickReservationList() {
    return (
        <div className="ProductList">
            <Category />
            <List />
        </div>
    );
};

export default QuickReservationList;