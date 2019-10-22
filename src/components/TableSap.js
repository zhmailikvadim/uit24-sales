import React from 'react';
import './TableSap.css'
import SortImage from './SortImage';
export default props => (
     <table className="table">
     <caption>Аналитика продаж</caption>
        <thead>
            <tr>
                {props.fields.map(item =>(
                   <th onClick={props.onSort.bind(null, item)}>
                        {item}{props.sortField === item ? <SortImage sort = {props.sort} /> : null}
                   </th> 
                ))}
            </tr>
        </thead>
        <tbody>
            {props.data1.map((element, i) =>
                <tr key = {i}>
                    {Object.entries(element).map(([k,v]) =>
                    (<td bgcolor={element.VBELN === 70206 ? props.color3 : props.color7}>{v}</td>))}
                </tr>
            )}            
        </tbody>
    </table>
)

