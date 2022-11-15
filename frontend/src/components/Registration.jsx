import React from 'react';
import useFetch from './useFetch';
import TableList from './TableList/TableList';
const Registration = () => {
  const { data: tables, isPending, error } = useFetch('http://localhost:4000/tables');
  
  return (
    <div>
      
      <div className="home">
        { error && <div> {error} </div> }
        { isPending && <div>Loading... </div> }
        {tables && <TableList tables={tables}  />}
      </div>
    </div>
  )
}

export default Registration
