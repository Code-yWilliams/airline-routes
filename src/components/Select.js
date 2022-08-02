import React from 'react';

const Select = ({ name="selection", label="Select an option", options=["option 1"], enabledOptions=["option 1"] ,defaultValue="All", onChange=() => console.log(`no onChange handler prop given`) }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} defaultValue={defaultValue} onChange={onChange}>
        {options.map(option => {
            if (enabledOptions.includes(option)) {
              return ( <option value={option} key={option}>{option}</option> );
            } else {
              return ( <option value={option} key={option} disabled={true}>{option}</option> );
            }
        })}
      </select>
    </>
  )
}

export default Select;