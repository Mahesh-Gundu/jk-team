import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PageHeader } from '@/components/common/PageHeader/PageHeader';
import PopupModal from '@/components/common/Model/Model';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Card } from '@mui/material';
import TableList from '../common/ReactTable/ReactTable';
import style from './Employee.module.scss'

const EmployeeTable = (props:any) => {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openviewModal, setOpenviewModal] = React.useState(false);
    const [rowData, setRowData] = React.useState<any>({});
    const [getRow , setGetRow] = React.useState<any>();
    const [getRowEdit , setGetRowEdit] = React.useState<any>();
    const handleClose = () => setOpenModal(false);
    const handleEditClose = () => setOpenEditModal(false);

    const handleShow = (row: any) => {
        // console.log(row, "**********");
        // setRowData(row)
        setOpenModal(true);
    }
    const handleEditShow = (row: any,index:any) => {
        console.log(row, "**********");
        setRowData(row);
        setGetRowEdit(index);
        setOpenEditModal(true);
    }

   const handleviewClose= () =>
   {} 
    const columns: readonly any[] = [
        { key: "id", label: "ID", minWidth: 80 },
        { key: "name", label: "Name", minWidth: 140 },
        { key: "email", label: "Email", minWidth: 140 },
        // { key: "department", label: "Department", minWidth: 140 },
        // { key: "designation", label: "Designation", minWidth: 140 },
        { key: "Phone_number", label: "Phone Number", minWidth: 140 },
        // { key: "off_location", label: "Office Locality", minWidth: 140 },
        // { key: "password", label: "Password", minWidth: 140 },
        { key: "address", label: "Address", minWidth: 140 },
    ];

    const addDetails = (val:any) =>{
        console.log(val,"******")
        // const adddata = [...getRow]
        // adddata.push(val);  
        // setGetRow(adddata)
        setGetRow([val]);
    }
    const editDetails = (val:any,index:any) =>{
        console.log(val,"******",getRowEdit)
        getRow[getRowEdit] = val
    }

    const viewDetails = (val:any,index:any) =>{
        console.log(val,"******",getRowEdit)
        getRow[getRowEdit] = val
    }

    const handleDelete = (index:any) => {
        const updatedRecords = getRow.filter((v:any,i:any) => index !== i);
        console.log(updatedRecords,index,"updatedRecords");
        setGetRow(updatedRecords);
      };

    // React.useEffect(() => {
    //     // setGlobalData({
    //     //   ...globalData,
    //     //   loading: true
    //     // })
    //     getexample().then((res: any) => {
    //         //   setGlobalData({
    //         //     ...globalData,
    //         //     loading: false
    //         //   })
    //         console.log(res.data,"res")
    //         setGetRow(res.data)
    //         console.log(getRow,"getrow");
    //     }).catch((err: any) => {
    //         console.log(err)
    //         //   setGlobalData({
    //         //     ...globalData,
    //         //     loading: false,
    //         //     error: true,
    //         //     errorMessage: "Failed to load data"
    //         //   });
    //     })
    // },[])

    return (
        <React.Fragment>
        
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className={style.headercard}>
                            <Container fluid>
                                <h3 className={style.cardtext}><b>Employee Table</b></h3>
                                </Container>
                            </Card>
                        <Card className={style.tablecard}>
                            <Container fluid className={style.cardtable}>
                            <Box>
                            <PageHeader list={true} value={"Add"} onClick={handleShow} />
                            </Box>
                            <TableList
                                onClick={handleEditShow}
                                rows={getRow}
                                columns={columns}
                                delete={handleDelete}
                                showViewModel={true}
                                deleteAccess={true}
                                editAccess={true}
                                showViewAccess={true}
                            />
                            </Container>
                             </Card>
                        </Col>
                    </Row>
                </Container>
                {openModal && <PopupModal show={openModal} onHide={handleClose} header="Add Employee" add={addDetails} Cmpnt = "employee" />}
                {openEditModal && <PopupModal show={openEditModal} onHide={handleEditClose} header="Update Employee" rowData={rowData} edit={editDetails} Cmpnt = "employee" />}
                {openviewModal && <PopupModal show={openviewModal} onHide={handleviewClose} header="View Dropdown" rowData={rowData} view={viewDetails}  Cmpnt = "employee"/>}

            </div>
           
        </React.Fragment>
    );
};

export default EmployeeTable;
