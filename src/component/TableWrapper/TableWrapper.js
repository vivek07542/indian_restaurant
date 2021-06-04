import React, { useState } from 'react';
import Table from "../../UI/Table/Table";
import Pagination from "../../UI/Pagination/Pagination";
import Button from "../../UI/Button/Button";
import ReactToPdf from "react-to-pdf";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
const ref = React.createRef();

const TableWrapper = (props) => {
    const [state, setState] = useState({
        currentPage: 1,
        postPerPage: 3,
    })
    const paginate = (pageNumbers) => {
        setState({ ...state, currentPage: pageNumbers })
    }
    const pageSelect = (pagePerPost) => {
        setState({ ...state, postPerPage: pagePerPost })
    }

    const indexOfLastPost = state.currentPage * state.postPerPage;
    const indexOfFirstPost = indexOfLastPost - state.postPerPage;
    const currentItem = props.tableData.slice(indexOfFirstPost, indexOfLastPost);
    return (
        <div className="jumbotron formWrapper">
             <div className="row justify-content-end">
                <div className="col-6 col-md-4">   
                  <ReactToPdf targetRef = {ref}>{({toPdf})=><Button className = "btn-sm" onClick = {toPdf}>Export pdf</Button>}</ReactToPdf>
                </div>
                <div className="col-6 col-md-4">      
                    <ReactHTMLTableToExcel  className="btn btn-outline-danger btn-sm"  table={"emp"}  filename="ReportExcel"  sheet="Sheet"  buttonText="Export excel" /> 
                </div>
            </div>
            <div className="row">
                <div className="mx-auto" ref={ref} style={{width: "60vw"}}>
                    <Table  
                        id = {"emp"}                      
                        tableData={currentItem}
                        headingColumns={props.headingColumns}
                        breakOn={props.breakOn}
                        addEditButton={props.addEditButton}
                        addDeleteButton={props.addDeleteButton}
                        editHandler={props.editHandler}
                        deleteHandler={props.deleteHandler}
                    />
                </div>
            </div>            
            <div className="row">
                <div className="col-12">
                    <Pagination pageSelect={pageSelect} paginate={paginate} currentPage={state.currentPage} postPerPage={state.postPerPage} totalPosts={props.tableData.length} />
                </div>
            </div>

        </div>
    )
}
export default TableWrapper;