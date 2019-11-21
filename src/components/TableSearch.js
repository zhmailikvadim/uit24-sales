import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import './css/TableSearch.css';
export default props => {
    const [value, setValue] = useState('')
    const valueChangeHandler = event => {
        setValue(event.target.value)
      }

    return (
        <ButtonToolbar>
            <div className="input-group mb-3 mt-3">
                <div className="input-group-prepend">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={() => props.onSearch(value)} >Поиск по всей таблице
                    </button>
                </div>
                <input 
                    type="text" 
                    className="form-control"
                    onChange={valueChangeHandler} 
                    value={value}
                />
            </div>
            <Button variant="outline-danger" size="sm"  onClick={() => props.onSearchLessZero()}>Опасные</Button>
          </ButtonToolbar>

    )
}