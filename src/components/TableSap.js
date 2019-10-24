import React from 'react';
import './TableSap.css'
import SortImage from './SortImage';
var ColorOverTerm = "lightskyblue";
var Color3To7 = "lightsalmon";
var Color0To3 = "	lightyellow";
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
                <tr key = {i} onClick={props.onRowSelect.bind(null, element)}>
                    {Object.entries(element).map(([k,v]) =>
                    (<td bgcolor=
                        {element.ZDAYS <= 0 ? ColorOverTerm //Оплата просрочена
                        : element.ZDAYS <= 3 ? Color0To3 
                        :element.ZDAYS <= 7 ? Color3To7
                        :null}>{v}</td>))}
                </tr>
            )}            
        </tbody>
    </table>
)

