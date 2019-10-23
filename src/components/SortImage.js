import React from 'react';
export default props => (
   <span className="Icon"><img src = {props.sort === "asc" 
   ? require("../Images/up1.jpg")
   : require("../Images/down1.jpg")} alt = {props.sort} width="10" hight = "10" align="left" /></span>
)