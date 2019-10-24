import React, { Component } from 'react';
import Loader from './Loader';
import _ from 'lodash';
import Papa from 'papaparse';
import TableSap from './TableSap';
import TableSearch from './TableSearch';
import ReactPaginate from 'react-paginate';
let s = Object.prototype.toString;
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,     
      csvfile: undefined,
      data1:[],
      fields:[],
      search: '',
      currentPage: 0
    };
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
      await new Promise( (resolve, reject) => {
        Papa.parse("https://sales.uit24.com/maindata.csv", {
          download: true,
          header: true,
          dynamicTyping: true,
          complete:(results) => {
            this.setState(
              {
                fields:results.meta.fields,
                isLoading: false,
                data1: _.orderBy(results.data, this.state.sortField, this.state.sort)
              })            
            
            console.log(results)
          }
        }) 
        resolve (true);
      });
  // Загрузка из json
  // const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
  // const data = await response.json() 
  }
  updateData(result) {
    console.log("update");
    this.setState(
      {
        data1:result.data,
        fields:result.meta.fields
      }
    )
  }

//  log = log=>{console.log(this.data1)}
  onSort = sortField =>{
    const cloneData = this.state.data1.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    console.log(sortField);
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    this.setState({
      data1: orderedData,
      sort: sortType,
      sortField
    })
  }
  searchHandler = search =>(
    this.setState({search, currentPage: 0})
  )
  getFilteredData(){

    const {data1, search,fields} = this.state
    console.log(data1);
    console.log(search.toLowerCase());
    if (search.lenght===0) {
      return data1
    }
   var result = data1.filter(item =>(fields.some(prop=>(item[prop]!=null && 
    (s.call(item[prop])===s.call(123) 
    ?item[prop].toString().toLowerCase().includes(search.toLowerCase())
    :item[prop].toLowerCase().includes(search.toLowerCase()))))));
    //console.log(result);
    //  item["VBELN"].toLowerCase().includes(search.toString().toLowerCase())

             //item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
       //item["email"].toLowerCase().includes(search.toLowerCase())
     
  
   if(result.length===0){
     alert("Совпадений не найдено, пожалуйста, повторите ввод")
     result = this.state.data1
   }
   return result
  }
  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )
  onRowSelect = row => (
    console.log(row)
  )
  render() {
    const pageSize = 10;
    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
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
            data1={displayData}
            onSort={this.onSort}
            sortField={this.state.sortField}
            sort={this.state.sort}
            fields={this.state.fields}
            onRowSelect={this.onRowSelect}
          />
        </React.Fragment>
      }
      {
        this.state.data1.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}
      /> : null
      }
      </div>
    );
  }
}
export default App;