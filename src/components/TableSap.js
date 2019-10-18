import React from 'react';
import './TableSap.css'
export default props => (
     <table className="table">
     <caption>Аналитика продаж</caption>
        <thead>
            <tr>
                {props.fields.map(item =>(
                   <th onClick={props.onSort.bind(null, item)}>
                        {item}{props.sortField === item ? <span>{props.sort}</span> : null}
                   </th> 
                ))}
            </tr>
        </thead>
        <tbody>
            {props.data1.map((element, i) =>
                <tr key = {i}>
                    {Object.entries(element).map(([k,v]) =>
                    (<td bgcolor={element.VBELN === 70206 ? "green" : "white"}>{v}</td>))}
                </tr>
            )}            
        </tbody>
    </table>
)

