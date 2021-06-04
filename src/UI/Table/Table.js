import React from 'react'
import PropTypes from "prop-types";
import "./Table.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const TableContainer = ({tableData,headingColumns,addEditButton,addDeleteButton,breakOn,editHandler,deleteHandler,id}) => {
    const onEditHandler = (rowDetail)=>() =>{
        editHandler(rowDetail);
    }
    const onDeleteHandler = (rowDetail) => () =>{
        deleteHandler(rowDetail);
    }
    
    let tableClass = "table table-sTriped table-dark";
    if(breakOn === "small"){
        tableClass += "table table-responsive-sm";
    }else if(breakOn === "medium"){
        tableClass += "table  table-responsive-md";
    }else if(breakOn === "large"){
        tableClass += "table table-responsive-lg";
    }

    const data = tableData.map((row,index) =>{
        let rowData = [];
        let i = 0;
        for(const key in row){
           rowData.push({
              key:headingColumns[i],
              val:row[key] 
           }) 
           i++;
        }
        return <Tr key = {index}>
            {rowData.map((data,index) =>
            <Td key = {index} data-heading = {data.key}>{data.val}</Td>)}
            {addEditButton && 
            <Td><button className = "btn btn-outline-dark btn-sm" onClick ={onEditHandler(row)}><EditIcon color="secondary"/></button></Td>}
            {addDeleteButton && 
            <Td><button className = "btn btn-outline-dark btn-sm" onClick = {onDeleteHandler(row)} ><DeleteIcon color="secondary"/></button></Td>
            }
        </Tr>
    })
    return (
        <div className = "table-container mx-auto">            
            <Table className = {tableClass} id={id} style ={{backgroundColor : "rgba(0,0,0,0.4)",fontSize : "12px"}}>
                <Thead>
                    <Tr>{headingColumns.map((col,index)=>(<Th key = {index}>{col}</Th>))}</Tr>
                </Thead>
                <Tbody>
                    {data}
                </Tbody>
            </Table>
        </div>
    )
}

TableContainer.propTypes = {
    tableData : PropTypes.arrayOf(PropTypes.object).isRequired,
    headingColumns : PropTypes.arrayOf(PropTypes.string).isRequired,
    breakOn : PropTypes.oneOf(['small','medium','large'])
}
export default TableContainer;