import React, { Component } from 'react';
export default props  => {
  return(
    <tbody>
      {props.data.map((element, i) =>
            <tr key = {i}>
                {Object.entries(element).map(([k,v]) =>(<td>{k}:{v}</td>))}
                </tr>
        )}
    </tbody>
  )
}

