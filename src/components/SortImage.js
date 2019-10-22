import React from 'react';
import down from '../Images/down1.jpg'
export default props => (
   <span className="Icon"><img src = {props.sort === "asc" 
   ? require("../Images/up2.jpg")
   : require("../Images/down2.jpg")} alt = {props.sort} width="30" hight = "30" align="left" />
   {console.log(require("../Images/down1.jpg")),console.log({down})}</span>
);