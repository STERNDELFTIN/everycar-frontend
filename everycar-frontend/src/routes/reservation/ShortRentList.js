import { useState } from 'react';
import '../../css/routes/ShortRentList.css';

import Category from '../../components/common/carList/Category';
import List from '../../components/common/carList/List';

function ShortRent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState(100000000);
    const [selectedGrades, setSelectedGrades] = useState([]);

    return (
        <div className="ProductList">
            <Category setSearchQuery={setSearchQuery} setPriceRange={setPriceRange} setSelectedGrades={setSelectedGrades} />
            <List searchQuery={searchQuery} priceRange={priceRange} selectedGrades={selectedGrades} />
        </div>
    );
};

export default ShortRent;