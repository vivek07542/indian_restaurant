import React from "react";
import "./Pagination.css";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const Pagination = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
  pageSelect,
}) => {

  const pageNumbers = [];
  const lastPage = Math.ceil(totalPosts / postPerPage);
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

 
  return (
    <div className = "Pagination">
     <nav aria-label="Page navigation example ">
      <ul className="pagination justify-content-end ">
      <li className="page-item mx-1"><DropDown  className = "form-control" onClick={(e) => pageSelect(e.target.value)} options = {[3,5,10,20] }></DropDown></li>
      <li className="page-item"><Button className = "btn-sm" onClick={() => paginate(1)} disabled={currentPage === 1 ? true : false} ><FirstPageIcon /></Button></li>
      <li className="page-item"><Button className = "btn-sm" onClick={() => paginate(currentPage + 1)} disabled={currentPage === lastPage ? true : false}><NavigateNextIcon /></Button></li>
      {pageNumbers.map((number) => (
            <li key={number} className = "page-item mx-1"><Button className = "btn-sm" onClick={() => paginate(number)}>{number}</Button></li>
        ))}
        <li className="page-item"><Button className = "btn-sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1 ? true : false}><NavigateBeforeIcon /></Button></li>
        <li className="page-item"> <Button className = "btn-sm" onClick={() => paginate(Math.ceil(totalPosts / postPerPage))} disabled={currentPage === lastPage ? true : false}><LastPageIcon /></Button></li>
      </ul>
     </nav>
    </div>
  );
};

export default Pagination;