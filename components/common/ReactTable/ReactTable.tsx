import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Link, Tooltip, Typography } from '@mui/material';
import { FlexDiv } from '../Flex/Flex';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import style from './ReactTable.module.scss'
import { CMButton } from '../Button/Button';
import PopupModal from '../Model/Model';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';


interface Column {
    id: 'type' | 'field_name' | 'placeholder';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
// const columns: Column[] = [
//     { id: 'type', label: 'Type', minWidth: 170 },
//     { id: 'field_name', label: 'Filed Name', minWidth: 170 },
//     { id: 'placeholder', label: 'Placeholder', minWidth: 170 },
// ];
// interface Data {
//     type: string;
//     field_name: string;
//     placeholder: string;
// }
// function createData(
//     type: string,
//     field_name: string,
//     placeholder: string,
// ): Data {
//     return { type, field_name, placeholder };
// }
// const rowsData = [
//     createData('Type1', 'FN1', "Placeholder1"),
//     createData('Type2', 'FN2', "Placeholder2"),
//     createData('Type3', 'FN3', "Placeholder3"),
//     createData('Type4', 'FN4', "Placeholder4"),
//     createData('Type5', 'FN5', "Placeholder5"),
// ];

const TableList = (props: any) => {

    const { columns } = props;
    console.log("****", props.rows, columns);

    const [editItem, setEditItem] = React.useState<any>({});
    const [perModal, setPermModal] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [openViewModal, setOpenViewModal] = React.useState(false);
    const [viewrow, setViewRow] = React.useState<any>([]);
    const [page, setPage] = React.useState(0);
    const [deleteRow, setDeleteRow] = React.useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [optionData, setOptionData] = React.useState<any>([]);
    const [smShow, setSmShow] = React.useState(false);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // const EditModel = (rowsdata:any) => {
    //     // setLoading(true);

    //       props.EditModelBody(rowsdata.id).then((res: any) => {
    //         // setViewRow(res);
    //         setOpenModal(true)
    //       props.viewbutton(rowsdata)
    //       }).catch((err: string) => {
    //         //   setLoading(false);
    //           setOpenModal(false);
    //         //   setGlobalData({
    //         //     ...globalData,
    //         //     loading: false,
    //         //     error: true,
    //         //     errorMessage: err || "Failed to delete please try again"
    //         //   });
    //         })

    //   }
    const confirmDelete = (item: any, permanently: boolean = false, index: any) => {
        setEditItem(item);
        if (!permanently) {
            setOpenModal(true);
        } else {
            setPermModal(true)
        }
        setDeleteRow(index)
    }
    // const deleteItem = (index:any) => {
    //     // setLoading(true);
    //     props.delete(editItem.id).then(() => {

    //         //   setLoading(false);
    //         //   setGlobalData({
    //         //     ...globalData,
    //         //     loading: false,
    //         //     error: false
    //         //   })
    //         setOpenModal(false)
    //         //   loadData();
    //         //   toast.success("Record Deleted Succesfully")
    //     }).catch((err: string) => {
    //         //   setLoading(false);
    //         setOpenModal(false);
    //         //   setGlobalData({
    //         //     ...globalData,
    //         //     loading: false,
    //         //     error: true,
    //         //     errorMessage: err || "Failed to delete please try again"
    //         //   });
    //     })
    // }
     const deleteItem = () => {
        props.delete(deleteRow);
        setDeleteRow(null)
        setOpenModal(false)
    }
    // let OptionsData: any = props?.rows?.map((opt: any) => {
    //     console.log(opt, "#####")
    //     let optionvalue: any = opt.options;
    //     console.log(optionvalue, "#####")
    //     optionvalue?.map((data: any) => {
    //         console.log(data, "########")
    //         optionData.push(data.value)
    //     })
    // });
    console.log(optionData, "optionData")
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "20px" }}>
                <TableContainer sx={{ maxHeight: 440 }} >
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead >
                            <TableRow >
                                {columns.map((column: any) => (
                                    <TableCell
                                        key={column.key}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className={style.Tablebg}
                                    >
                                        <Typography><b>{column.label}</b></Typography>
                                    </TableCell>
                                ))}

                                {/* <TableCell
                                    key={'options'}
                                    className={style.Tablebg}
                                >
                                    <Typography><b>Options</b></Typography>
                                </TableCell> */}
                                <TableCell
                                    key={'action'}
                                    className={style.Tablebg}
                                >
                                    <Typography><b>Action</b></Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props?.rows?.map((row: any, index: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id + "-" + index}>
                                        {columns.map((column: any) => {
                                            const value = row[column.key];
                                            return (
                                                //     <TableCell key={column.id} align={column.align}>
                                                //     {column.format && typeof value === 'number'
                                                //         ? column.format(value)
                                                //         : column.key=='options' && typeof value === 'object' ?
                                                //             ( value.slice(0,3).map((v: any) => v.value + "," 
                                                //             // && (v.value?.length>1) ? "...see more":''
                                                //             ) + "...Seemore"
                                                //             ) 
                                                //             // :(value.length>1)? "seemore"
                                                //             : value}
                                                // </TableCell>
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : column.key === 'options' && typeof value === 'object' ? (
                                                            <>
                                                                {value.slice(0, 3).map((v: any) => v.value + ', ')}
                                                                {value.length > 3 && (
                                                                    <Button
                                                                        color="primary"
                                                                        size="small"
                                                                        className='seemore'
                                                                        // onClick={() => setSmShow(true)}
                                                                        onClick={() => props.viewClick(row, index)}
                                                                        value="seemore"
                                                                    >
                                                                        ...See More
                                                                    </Button>
                                                                )}
                                                            </>
                                                        ) : (
                                                            value
                                                        )}
                                                </TableCell>
                                             );
                                        })}

                                        <TableCell key={"action"}>
                                            <FlexDiv>
                                                {props.editAccess ? <Typography sx={{ marginLeft: "10px" }}>
                                                    <Tooltip title="Edit">
                                                        <Button className={style.buttonadj} variant="outlined" value="edit" color='primary' size="small" onClick={() => props.onClick(row, index)} >Edit</Button>
                                                    </Tooltip>
                                                </Typography> : null}
                                                {props.showViewAccess ? <Typography sx={{ marginLeft: "10px" }}>
                                                    <Tooltip title="View">
                                                        <Button className={style.buttonadj} variant="outlined" value="View" color='primary' size="small" onClick={() => props.viewClick(row, index)}>View</Button>
                                                    </Tooltip>
                                                </Typography> : null}
                                                {(!row.removed && props.deleteAccess) ? <Typography sx={{ marginLeft: "10px" }}>
                                                    <Tooltip title="Delete">
                                                        <Button className={style.buttonadj} variant="outlined" value="delete" color='error' size="small" onClick={(e) => confirmDelete(row, false, index)}>Delete</Button>
                                                    </Tooltip>
                                                </Typography> : null}
                                            </FlexDiv>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {
                                !props?.rows?.length ?
                                    <TableCell align='center' colSpan={columns.length + 1}>
                                        No Records Found
                                    </TableCell> : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={props?.rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"
                open={openModal}
            >
                <DialogTitle><b>Delete Confirmation</b></DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Are you sure want to delete this item?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <CMButton color="error" value="Cancel" onClick={() => setOpenModal(false)} />
                    <CMButton color="primary" value="Delete" onClick={deleteItem} />
                </DialogActions>
            </Dialog>
            {/* <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal> */}

        </>
    );
}

export default TableList;