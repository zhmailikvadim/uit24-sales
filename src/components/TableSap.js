import React from 'react';
import Table from './SortableBody';
import SortableBody from './SortableBody';
export default props => (
     <table className="table">
        <thead>
            <tr>
                {props.fields.map(item =>(
                   <th onClick={props.onSort.bind(null, item)}>
                        {item}{props.sortField === item ? <small>{props.sort}</small> : null}
                   </th> 
                ))}
            </tr>
        </thead>
        <tbody>
            {props.data1.map((element, i) =>
                <tr key = {i}>
                    {Object.entries(element).map(([k,v]) =>(<td>{v}</td>))}
                </tr>
            )}            
        </tbody>
    </table>
)

