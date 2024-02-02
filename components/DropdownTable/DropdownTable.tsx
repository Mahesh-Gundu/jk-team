import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PageHeader } from '@/components/common/PageHeader/PageHeader';
import PopupModal from '@/components/common/Model/Model';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { AppContext } from '@/components/common/Context/AppContext';
import { Box, Card } from '@mui/material';
import TableList from '../common/ReactTable/ReactTable';
import style from './DropdownTable.module.scss'

const DropdownTable = (props:any) => {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [viewModal, setViewModal] = React.useState(false);
    const [rowData, setRowData] = React.useState<any>({});
    const [getRow , setGetRow] = React.useState<any>([]);
    const [getRowEdit , setGetRowEdit] = React.useState<any>();
    const [getRowView , setGetRowView] = React.useState<any>();
    const handleClose = () => setOpenModal(false);
    const handleEditClose = () => setOpenEditModal(false);
    const handleViewClose = () => setViewModal(false);

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
    const handleView = (row: any,index:any) => {
        console.log(row, "**********");
        setRowData(row);
        setGetRowEdit(index);
        setViewModal(true);
    }
    const columns: readonly any[] = [
        { key: "field_name", label: "Field Name", minWidth: 140 },
        // { key: "options", label: "Options", minWidth: 140 },
    ];

    const addDetails = (val:any) =>{
        console.log(val,"******")
        // const adddata = [...getRow]
        // adddata.push(val);  
        // setGetRow(adddata)
        setGetRow([...getRow,val]);
        console.log(getRow,"getRow")
    }
    const editDetails = (val:any,index:any) =>{
        console.log(val,"******",getRowEdit)
        getRow[getRowEdit] = val
    }

    const handleDelete = (index:any) => {
        const updatedRecords = getRow.filter((v:any,i:any) => index !== i);
        console.log(updatedRecords,index,"updatedRecords");
        setGetRow(updatedRecords);
      };
      const viewDetails = (val:any,index:any) =>{
        console.log(val,"******",getRowView)
        setGetRowView(getRow);
    }


    return (
        <React.Fragment>
        
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className={style.headercard}>
                            <Container fluid>
                                <h3 className={style.cardtext}><b>Dropdown Table</b></h3>
                                </Container>
                            </Card>
                        <Card className={style.tablecard}>
                            <Container fluid className={style.cardtable}>
                            <Box>
                            <PageHeader list={true} value={"Add"} onClick={handleShow}/>
                            </Box>
                            <TableList
                                onClick={handleEditShow}
                                rows={getRow}
                                columns={columns}
                                delete={handleDelete}
                                showViewAccess={true}
                                deleteAccess={true}
                                editAccess={true}
                                viewClick = {handleView}
                            />
                            </Container>
                             </Card>
                        </Col>
                    </Row>
                </Container>
                {openModal && <PopupModal show={openModal} onHide={handleClose} header="Add Dropdown" add={addDetails} Cmpnt = "dropdown"  />}
                {openEditModal && <PopupModal show={openEditModal} onHide={handleEditClose} header="Update Dropdown" rowData={rowData} edit={editDetails} Cmpnt = "dropdown"  />}
                {viewModal && <PopupModal show={viewModal} onHide={handleViewClose} header="View Dropdown" rowData={rowData} view={viewDetails}  Cmpnt = "dropdownView"/>}

            </div>
           
        </React.Fragment>
    );
};

export default DropdownTable;
