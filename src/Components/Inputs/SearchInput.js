import React from 'react'
import styles from '../../Styles/Inputs/SearchInput.module.css'

const SearchInput = ({value, onChange, id ,placeholder}) => {

    function handleChange(event){
        onChange(event.target.value)
    }

    return(
        <input id={id} type='search' placeholder={placeholder} value={value} onChange={handleChange} className={styles.SearchInput}/>
    );
}

export default SearchInput;