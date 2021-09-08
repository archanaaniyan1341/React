import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserData, setParams } from "../../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import api from '../../actions/api';
import { WORKLIST_URI } from '../../app-constants';
import "./worklist.css";
import ReactPaginate from "react-paginate";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

  const Worklist = () => {      
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    let markup, isConfigured = false;    
    const [worklistData, setWorklistData] = useState([]);
    const [isDataSelected, seIsDataSelected] = useState(false);
    let userSelected = JSON.parse(localStorage.getItem("selectedPatient"));
    const [selectedParams, setSelectedParams] = useState(userSelected || {});
    let userRole = user.role || localStorage.getItem("userRole");
    const [pageNumber, setPageNumber] = useState(0);
    const [dataPerPage,setdataPerPage]=useState(1);
  const pagesVisited = pageNumber * dataPerPage;
  const pageCount = Math.ceil(worklistData.length / dataPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const pageSizeSelect = (e) => {
    //console.log(e);
    var val=parseInt(e)
    setdataPerPage(val);
  }
    useEffect(() => {      
      api.getData(WORKLIST_URI + "?role=" + userRole)
      .then((response)=>{
        isConfigured = true;
        setWorklistData(JSON.parse(response.data));
        if(userSelected.patientId) {
          document.querySelector("[data-item-id='" +userSelected.patientId+ "']").classList.add("active");
          seIsDataSelected(true);
        }         
      })
      .catch((error) => {
          console.log(error)
      });
    }, isConfigured ? [worklistData] : []);

    const refreshWorklist = () => {
      setWorklistData([]);
      api.getData(WORKLIST_URI + "?role=" + userRole)
      .then((response)=>{
        isConfigured = true;
        setWorklistData(JSON.parse(response.data));
        if(userSelected.patientId) {
          document.querySelector("[data-item-id='" +userSelected.patientId+ "']").classList.add("active");
          seIsDataSelected(true);
        }         
      })
      .catch((error) => {
          console.log(error)
      });      
    };

    const handleRowClick = (data, event) => {
      let nodeList = event.currentTarget.parentElement.children;
      localStorage.setItem("physicianSelectedTab", 0)
      seIsDataSelected(true);
      for (let item of nodeList) {
          item.classList.remove("active");
      }
      event.currentTarget.classList.add("active");      
      let selectedParams = {
        "patientId": data.patient_id,
        "pathwayId": data.pathway_id[0]    
      }  
      setSelectedParams(selectedParams);
      localStorage.setItem("selectedPatient", JSON.stringify(selectedParams));
    }

    const loadData = () => {
      api.postData(WORKLIST_URI, selectedParams)
      .then(()=>{
        setCurrentDataAndNavigate();
      })
      .catch((error) => {
        //markup = <div className="error"><p>[!Alert] Service Error</p></div>
        setWorklistData([]);
      });      
    }

    const setCurrentDataAndNavigate = () => {      
      let path = '/Layouts/'+ selectedParams.patientId + '/' + selectedParams.pathwayId;
      let selectedPatientCreds = JSON.stringify({patientId:selectedParams.patientId, pathwayId:selectedParams.pathwayId});
      localStorage.setItem("selectedPatient", selectedPatientCreds);
      dispatch(setUserData({role: userRole, layout: path}));    
      dispatch(setParams({
        "role": userRole,
        ...selectedParams    
      })); 
      history.push({
        pathname: path,
      });
    }
    const displayWorklistData = worklistData.sort((a, b) => a.id > b.id ? 1 : -1)
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((item, index) => (

      <tr key={index} className="bg-dark table-row" data-item-id={item.patient_id} onClick={(e) => handleRowClick(item, e)}>

        <td key={"sl_" + index}>{index + 1}</td>
        <td className="pt-half pb-0" key={"pid_" + index}><label className="td-label">{item.id}</label></td>
        <td className="pt-half pb-0" key={"name_" + index}><label className="td-label">{item.name}</label></td>
        <td className="pt-half pb-0" key={"dob_" + index}><label className="td-label">{item.dateOfBirth}</label></td>
        <td className="pt-half pb-0" key={"gender_" + index}><label className="td-label">{item.gender}</label></td>
      </tr>
    ));
    markup = worklistData ? (
      <div className="worklist-container">  
        <div className="container-fluid">
          <header className="shadow float-left header pr-4 w-100 p-4">
            <h2 className="pl-2 float-left text-white">Worklist</h2>  
            <button type="button" className="ml-4 float-left p-1 pl-4 pr-4 btn btn-success" onClick={() => refreshWorklist()}><FontAwesomeIcon className="mr-2" icon={faSync}/>Refresh Worklist</button> 
            <button disabled={!isDataSelected} type="button" className="mr-4 float-right p-1 pl-4 pr-4 btn btn-success btn-arrow-right" onClick={() => loadData()}>Load</button>
          </header>    
          <Table responsive className="mb-0">
            <thead className="table-header">
              <tr className="table-row">
                <th>#</th>
                {["Patient ID", "Patient Name", "Date of Birth", "Gender"].map((item, index) => (
                  <th key={"head_"+index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>        
                 {displayWorklistData}     
            </tbody>
          </Table>
          <footer className="shadow footer p-4 text-right">
           <p>Items Per Page &nbsp;</p>
           <DropdownButton
              title={dataPerPage}
              onSelect={pageSizeSelect}
            >
             <Dropdown.Item eventKey="1">1</Dropdown.Item>
              <Dropdown.Item eventKey="10">10</Dropdown.Item>
              <Dropdown.Item eventKey="50">50</Dropdown.Item>
              <Dropdown.Item eventKey="100">100</Dropdown.Item>
              <Dropdown.Divider />
            </DropdownButton>
          <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </footer>
        </div>
      </div>
    ) : setWorklistData([]);
    return markup;
  }

  export default Worklist
