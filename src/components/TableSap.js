import React from 'react';
import './css/TableSap.css'
import SortImage from './SortImage';
var ColorOverTerm = "Salmon";
var Color0To3 = "	lightyellow";
var Color3To7 = "lightskyblue";
export default props => (
     <table className="table table-striped table-bordered table-hover table-sm" al>
     <caption>Аналитика продаж</caption>
        <thead>
            <tr>
                {props.fields.map(item =>(
                   <th onClick={props.onSort.bind(null, item)}>
                        {props.fcat.map((element, i) =>(element.FIELDNAME === item?element.COLTEXT:null))}{props.sortField === item ? <SortImage sort = {props.sort} /> : null}
                   </th> 
                ))} 
            </tr>
        </thead>
        <tbody>
            {props.data1.map((element, i) =>
                <tr key = {i} onClick={props.onRowSelect.bind(null, element)}
                    class=
                    {element.ZDAYS <= 0 ? "table-danger"  //Оплата просрочена
                        :element.ZDAYS <= 3 ? "table-warning"
                        :element.ZDAYS <= 7 ?"table-info"
                        :null}>
                    {Object.entries(element).map(([k,v]) =>
                    (<td>{v}</td>))}
                </tr>
            )}            
        </tbody>
      </table>
)

