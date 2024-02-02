import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PageHeader } from '@/components/common/PageHeader/PageHeader';
import PopupModal from '@/components/common/Model/Model';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Card } from '@mui/material';
import TableList from '../common/ReactTable/ReactTable';
import { getexample } from './Validation.services';
import style from './Validation.module.scss'

const ValidationTable = (props:any) => {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
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
    const columns: readonly any[] = [
        { key: "validation", label: "Validation", minWidth: 140 },
        { key: "description", label: "Description", minWidth: 140 },
    ];

    const addDetails = (val:any) =>{
        console.log(val,"******")
        // const adddata = [...getRow]
        // adddata.push(val);  
        // setGetRow(adddata)
        setGetRow([...getRow,val]);
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

    React.useEffect(() => {
        // setGlobalData({
        //   ...globalData,
        //   loading: true
        // })
        getexample().then((res: any) => {
            //   setGlobalData({
            //     ...globalData,
            //     loading: false
            //   })
            console.log(res.data,"res")
            setGetRow(res.data)
            console.log(getRow,"getrow");
        }).catch((err: any) => {
            console.log(err)
            //   setGlobalData({
            //     ...globalData,
            //     loading: false,
            //     error: true,
            //     errorMessage: "Failed to load data"
            //   });
        })
    },[])

    return (
        <React.Fragment>
        
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className={style.headercard}>
                            <Container fluid>
                                <h3 className={style.cardtext}><b>Validation Table</b></h3>
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
                                showViewAccess={false}
                                // modelCmpnt={DropdownBody}
                            />
                            </Container>
                             </Card>
                        </Col>
                    </Row>
                </Container>
                {openModal && <PopupModal show={openModal} onHide={handleClose} header="Add Validation" add={addDetails} Cmpnt = "validation" />}
                {openEditModal && <PopupModal show={openEditModal} onHide={handleEditClose} header="Update Validation" rowData={rowData} edit={editDetails} Cmpnt = "validation" />}
            </div>
           
        </React.Fragment>
    );
};

export default ValidationTable;
