import Item from "../Item/item";
import Search from "../Search/search";
import { useState } from "react";
import Description from "../Description/description";
function AllComponent() {
    const [selectedNumber, setSelectedNumber] = useState(undefined);
    const [findPoke, setFindPoke] = useState('');
    return ( <>
        <div className="row">
        <div className="col-8">
        <Search setFindPoke={setFindPoke} />
        </div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-8">
        <Item findPoke={findPoke} setSelectedNumber={setSelectedNumber}/>
        </div>
        <div className="col-4">
        <Description selectedNumber={selectedNumber}/>
        </div>
      </div>        
    </> );
}

export default AllComponent;
