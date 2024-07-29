import { useState } from "react"; 
import GetSearch from "../../container/GetSearch/getDataSearch";

function Search({ setFindPoke }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value) => {
        setInputValue(value);
        setFindPoke(value);
    };

    return (
        <GetSearch inputValue={inputValue} onInputChange={handleInputChange} />
    );
}

export default Search;