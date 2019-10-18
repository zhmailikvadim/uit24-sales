import React, { Component } from 'react';
import Loader from './Loader';
//import Table from './TableSap';
//import FileReader from './FileReader';
import _ from 'lodash';
import Papa from 'papaparse';
import TableSap from './TableSap';
import TableSearch from './TableSearch'
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: [],      
      csvfile: undefined,
      data1:[],
      fields:[],
      search: ''
    };
    this.updateData = this.updateData.bind(this);
  }
 //* state ={
 //   isLoading: true,
 //   data: [],
 //   this.updateData = this.updateData.bind(this)
//  }

  async componentDidMount() {
    Papa.parse("https://sales.uit24.com/maindata.csv", {
      download: true,
      header: true,
      complete: this.updateData
    })    
    const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    const data = await response.json()
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
     // data1 = data1
    })
  }

  updateData(result) {
    this.setState(
      {
        data1:result.data,
        fields:result.meta.fields
      }
    )

  //        this.state.data1 = result.data
  //        this.state.fields = result.meta.fields
 //         console.log(data);
        }

    
//  log = log=>{console.log(this.data1)}
  onSort = sortField =>{
    const cloneData = this.state.data1.concat();
    const sortType = this.state.sort === 'asc' ? '&#x21D2' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    this.setState({
      data1: orderedData,
      sort: sortType,
      sortField
    })
  }
  searchHandler = search =>(
    this.setState({search}),
    console.log(search)
  )
  getFilteredData(){
    const {data1, search} = this.state
    console.log(search)
    if (!search) {
      return data1
    }

    return data1.filter(item => {
      return item['VBELN'].toLowerCase().includes(search.toLowerCase())
    })
  }
  render() {
    const filteredData = this.getFilteredData();

    console.log(this.state.data)
    console.log(this.state.data1)
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        :<React.Fragment>
          <TableSearch onSearch={this.searchHandler} />
          <TableSap 
            data={this.state.data}
            data1={filteredData}
            onSort={this.onSort}
            sortField={this.state.sortField}
            sort={this.state.sort}
            fields={this.state.fields}
          />
        </React.Fragment>
      }
      </div>
    );
  }
}
export default App;