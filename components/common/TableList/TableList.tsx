import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Grid, Tooltip, Typography, debounce, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { Link } from 'react-router-dom'
import { mouseCursor } from '../Helpers/InlineStyles';
import { CMButton } from '../Button/Button';
import { FlexDiv, FlexDivColumn} from '../Flex/Flex';
import { CMToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { CMTextField } from '../TextField/CMSTextField';
import UndoIcon from '@mui/icons-material/Undo';
import { CMAutoComplete } from '../AutoComplete/AutoComplete';
import { Settings } from '@mui/icons-material';
import { AppContext } from '../Helpers/Context/AppContext';
// import { checkSuperAdmin } from '../../../pages/Auth/User.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CMModel from '../Model/Model';
import { config } from '../../../config';
import { decryptData } from '../../../helpers/security';

const imageUrl = config.imageUrl;
export const CMTableList = (props: any) => {
  const [rows, setRows] = React.useState<any>([]);
  const [rowCount, setRowsCount] = React.useState<any>(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
  const [editItem, setEditItem] = React.useState<any>({});
  const [openModal, setOpenModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [rollbackModal, setOpenRollbackModal] = React.useState(false);
  const [perModal, setPermModal] = React.useState(false);
  const { globalData, setGlobalData } = React.useContext(AppContext);
  const [value, setValue] = React.useState(0); // used for tabs
  const [valueUpdated, setUpdated] = React.useState(0); // used for reload
  const { columns } = props;
  const statusOptions = [{ id: 1, label: "All" }, { id: 2, label: "Not Deleted" }, { id: 3, label: "Deleted" }];
  const statusBookingOptions = [{ id:1, label: "All" },{ id: 2, label: "Pending" }, { id: 3, label: "Checked In" }, { id: 4, label: "Checked Out" },{ id: 5, label: "Cancelled" }];
  const hotelsOptions = [{ id: 1, label: "All" }, { id: 2, label: "Pending" }, { id: 3, label: "Approved" },{ id: 4, label: "Rejected" }];
  const [dropdownStatus, setDropdownStatus] = React.useState(props?.isBooking? statusBookingOptions[0] : (props.isHotels?hotelsOptions[0] : statusOptions[0]));
  const [searchByValue, setSearchByValue] = React.useState<any>(null);
  const [searchText, setSearchText] = React.useState("");
  const [viewrow, setViewRow] = React.useState<any>([]);
  const [searchColumns, setSearchColumns] = React.useState([]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setUpdated(Math.random())
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(prev => parseInt(event.target.value));
    setPage(prev => 0);
    setUpdated(Math.random())
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const confirmDelete = (item: any, permanently: boolean = false) => {
    setEditItem(item);
    if (!permanently) {
      setOpenModal(true);
    } else {
      setPermModal(true)
    }
  }

  const confirmRollback = (item: any) => {
    setEditItem(item);
    setOpenRollbackModal(true);
  }

  const deleteItem = () => {
    setLoading(true);
    props.deleteService(editItem.id).then(() => {
      setLoading(false);
      setGlobalData({
        ...globalData,
        loading: false,
        error: false
      })
      setOpenModal(false)
      loadData();
      toast.success("Record Deleted Successfully")
    }).catch((err: string) => {
      setLoading(false);
      setOpenModal(false);
      setGlobalData({
        ...globalData,
        loading: false,
        error: true,
        errorMessage: err || "Failed to delete please try again"
      });
    })
  }

  const deleteItemPermenant = () => {
    setLoading(true);
    props.deleteHardService(editItem.id).then(() => {
      setLoading(false);
      setGlobalData({
        ...globalData,
        loading: false,
        error: false
      })
      setPermModal(false)
      loadData();
      toast.success("Record Deleted Permanently")
    }).catch((err: string) => {
      setLoading(false);
      setPermModal(false);
      setGlobalData({
        ...globalData,
        loading: false,
        error: true,
        errorMessage: err || "Failed to delete please try again"
      });
    })
  }

  const rollbackItem = () => {
    setLoading(true);
    props.rollbackService(editItem.id).then(() => {
      setLoading(false);
      setGlobalData({
        ...globalData,
        loading: false,
        error: false
      })
      setOpenModal(false)
      setOpenRollbackModal(false)
      loadData();
      toast.success("Record Rollback Successfully")
    }).catch((err: string) => {
      setLoading(false);
      setOpenModal(false);
      setOpenRollbackModal(false)
      setGlobalData({
        ...globalData,
        loading: false,
        error: true,
        errorMessage: err || "Failed to delete please try again"
      });
    })
  }

  // const exportData = () => {
  //   let filter = '';
  //   let val =''
  //   if(props.isBooking)
  //  { if (value == 2) {
  //     val = "&status=0"
  //   } else if (value == 3) {
  //     val = "&status=1"
  //   }
  //   else if(value ==4){
  //     val ="&status=2"
  //   }else if(value ==5){
  //     val ="&status=3"
  //   }} else{
  //     if (value == 2) {
  //       filter = "&removed=0"
  //     } else if (value == 3) {
  //       filter = "&removed=1" 
  //     }
  //   }
  //   return props.listService("?page=" + (page + 1) + "&pageCount=" + rowsPerPage + (filter) + "&searchText=" + searchText +(val)+ "&export=true");
  // }

  // const exportPdf = () => {
  //   setGlobalData({
  //     ...globalData,
  //     loading: true
  //   });
  //   exportData().then((res: any) => {
  //     setGlobalData({
  //       ...globalData,
  //       loading: false
  //     });
  //     const options = {
  //       fieldSeparator: ',',
  //       quoteStrings: '"',
  //       decimalSeparator: '.',
  //       showLabels: true,
  //       showTitle: true,
  //       title: props.exportFileName || 'Exported data',
  //       useTextFile: false,
  //       useBom: true,
  //       headers: props.csvHeaders
  //       // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  //     };
  //   //   const exporter = new ExportToCsv(options);
  //   //   exporter.generateCsv(res.map((item: any) => {
  //   //     return {
  //   //       ...item,
  //   //       removed: item.removed=="1" ? "Yes" : "No"
  //   //     }
  //   //   }));
  //   // }).catch((err: any) => {
  //   //   setGlobalData({
  //   //     ...globalData,
  //   //     loading: false
  //   //   });
  //   })
  // }

  const ViewModel = (rowsdata:any) => {
    setLoading(true);
    if(!props.isBooking){
      props.viewModeBody(rowsdata.id).then((res: any) => {
        setViewRow(res);
        setOpenViewModal(true)
      props.viewbutton(rowsdata)
      })
    }else{
      setOpenViewModal(true)
        setViewRow([rowsdata])
        console.log(rowsdata,"11111111111")
        props.viewbutton(rowsdata)
    }
  }

  const loadData = () => {
    let filter = '';
    let hotelfilter =''
    let val =''
    
    if(props.isBooking)
   { if (value === 2) {
      val = "&status=0"
    } else if (value === 3) {
      val = "&status=1"
    }
    else if(value ===4){
      val ="&status=2"
    }else if(value ===5){
      val ="&status=3"
    }} 
    else if(props.isHotels){
      if (value === 2) {
        hotelfilter= "&status=0"
      } else if (value === 3) {
        hotelfilter = "&status=1"
      }
      else if(value ===4){
        hotelfilter ="&status=2"
      }
    }
     else{
      if (value === 2) {
        filter = "&removed=0"
      } else if (value === 3) {
        filter = "&removed=1" 
      }
    }

    setGlobalData({
      ...globalData,
      loading: true
    })
    props.listService("?page=" + (page + 1) + "&pageCount=" + rowsPerPage + (filter) + "&searchText=" + searchText + "&searchBy=" + searchByValue?.key + (val) +(hotelfilter)).then((res: any) => {
      let keyData:any = {};
      columns.forEach((item:any)=>{
        keyData[item.key] = item.findService
      })

      let arr = columns.filter((e:any)=> !e.hideSearch);
      setSearchColumns(arr)
      !searchByValue && setSearchByValue(arr[0]);
      res.data.map((item:any)=>{
          return(
            Object.keys(item).forEach(async (key)=>{
            
              if(keyData[key]){
                item[key] = await keyData[key](item[key])
              }
            })
          )
      })
      res.data.forEach((item:any)=>{
        item.removed = item.removed==="1"?1:0
      })
      setRows(res.data);
      setRowsCount(res.total);
      setGlobalData({
        ...globalData,
        loading: false
      })
    }).catch((err: any) => {
      console.log("err",err)
      setGlobalData({
        ...globalData,
        loading: false,
        error: true,
        errorMessage: "Failed to load data"
      });
    })
  }

  const changeBlock = (id: any, flag: boolean) => {
    setGlobalData({
      ...globalData,
      loading: true
    })
    props.blockService(id, flag).then((res: any) => {
      setGlobalData({
        ...globalData,
        loading: false
      })
      loadData();
    }).catch((err: any) => {
      setGlobalData({
        ...globalData,
        loading: false,
        error: true,
        errorMessage: err || "Failed to update block event, please try again"
      });
    })
  }
  React.useEffect(() => {
    loadData();
  }, [valueUpdated,openViewModal])

  const handleChange = (newValue: any) => {
    if(newValue){
    setDropdownStatus(newValue);
    setValue(newValue.id);
    setUpdated(Math.random())}
  };

  const handleSearchByChange = (newValue: any) => {
    setSearchByValue(newValue);
    setUpdated(Math.random())
  }

  const onChange = (e: any) => {
    console.log(e.target, e)
    if(e.target && e.target.value){
    setSearchText(e.target.value);
    setUpdated(Math.random());
    }else{
      if(e || e===''){
        setSearchText(e);
    setUpdated(Math.random());
      }
    }
  }

  const debouncedOnChange = debounce(onChange, 500);



  // const generateCsv = () => {
  //   let data = {

  //   }
  //   // exporter.generateCsv(data)
  //   // export
  // }

  const [superAdmin, setSuperAdmin] = React.useState(false);

  React.useEffect(()=>{
    setSuperAdmin(false)
    // setSuperAdmin(checkSuperAdmin())
  },[])

  return (
    <React.Fragment>
      {!props.hideSearch && <Card>
        <CardContent>
          <Box>

            <Grid container spacing={2} >
              <Grid item xs={12} md={4}>
                <FlexDivColumn>
                  <Typography sx={{ mb: 1 }}>
                    Search Field
                  </Typography>
                  <CMAutoComplete
                    options={searchColumns}
                    name={"searchby"}
                    value={searchByValue}
                    onChange={handleSearchByChange}
                    onBlur={(e: any) => { }}
                    size="small" disabled={false}/>
                </FlexDivColumn>
              </Grid>
             <Grid item xs={12} md={4}>
                <FlexDivColumn>
                  <Typography sx={{ mb: 1 }}>
                    Search for {searchByValue?.label}
                  </Typography>
                  <CMTextField onChange={debouncedOnChange} placeholder='Search Item' />
                </FlexDivColumn>
              </Grid>
              <Grid item xs={12} md={4}>
                <FlexDivColumn>
                  <Typography sx={{ mb: 1 }}>
                    Status
                  </Typography>
                  <CMAutoComplete
                    options={props?.isBooking?statusBookingOptions:(props.isHotels?hotelsOptions:statusOptions)}
                    name={"as"}
                    value={dropdownStatus}
                    onChange={handleChange}
                    onBlur={(e: any) => { }}
                    size="small" disabled={false}/>
                </FlexDivColumn>
              </Grid>
              {/* <Grid item xs={12} md={3}>
                <FlexDivColumn>
                  <Typography>
                    Export
                  </Typography>
                  <FlexDivStartCenter onClick={exportPdf} style={{ marginTop: "6px", height: "30px" }}>
                    <CsvIcon width='30px' height={'30px'} />
                  </FlexDivStartCenter>
                </FlexDivColumn>
              </Grid> */}
            </Grid>

          </Box>
        </CardContent>
      </Card>}
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "20px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                  <b>{column.label}</b> 
                  </TableCell>
                ))}
             {!props.HideAction &&   <TableCell
                  key={'action'}
                >
                 <b>Action</b> 
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: number) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id + "-" + index}>
                    {columns.map((column: any) => {
                      // const value = row[column.id];
                      console.log(column,"column");
                      
                      return (

                        <TableCell sx={{maxWidth:150,wordBreak:"break-all"}} key={column.id} align={column.align}>
                         {(column?.key !=='status' || props.noswitch) ? (column?.key==="icon" || column?.key==="hotel_image"? <img alt="" src={imageUrl + row[column.key] } width={"40px"}/> :(props.decryptedList?.length && props.decryptedList.includes(column?.key))?decryptData(row[column.key]): row[column.key]) :<CMToggleSwitch name={column.key} checked={(row[column.key]+"")==="1"?true:false} onChange={(e: any) => changeBlock(row.id, e)}/>}

                        </TableCell>
                        
                      );
                    })}
                    <TableCell key={"actionkey"}>
                      <FlexDiv>
                        {props.showBlock ? <Typography >
                         
                            <CMToggleSwitch name="block" checked={row.blocked} onChange={(e: any) => changeBlock(row.id, e)} />
                          
                        </Typography> : null}
                        {props.showView ? <Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title="View">
                            <Link to={props.editLink + "/" + row.id}>
                              <VisibilityIcon style={mouseCursor} color="secondary" />
                            </Link>
                          </Tooltip>
                        </Typography> : null
                        }

                        { props.showViewModel ? <Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title="View Details">
                            <VisibilityIcon style={mouseCursor} onClick={()=>ViewModel(row)} color="secondary" />
                          </Tooltip>
                        </Typography> :null}

                       {(parseInt(row.admin_created)?superAdmin:true) && props.editAccess && (props.basedonStatus?(props.basedonStatus && Number(row.status)!==2):true)?<Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title="Edit">
                            <Link to={props.editLink + "/" + row.id}>
                              <ModeEditIcon style={mouseCursor} color="secondary" />
                            </Link>
                          </Tooltip>
                        </Typography>:null}

                        {props.extraLink1 ? <Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title={props.link1Title}>
                            <Link to={props.extraLink1 + row.id}>
                              <Settings style={mouseCursor} color="success" />
                            </Link>
                          </Tooltip>
                        </Typography> : null}

                        { row.removed ? <Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title="Rollback">
                            <UndoIcon style={mouseCursor} onClick={(e) => confirmRollback(row)} color="success" />
                          </Tooltip>
                        </Typography> : null}

                        {row.removed ? <Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title="Delete Permanently">
                            <HighlightOffIcon style={mouseCursor} onClick={(e) => confirmDelete(row, true)} color="error" />
                          </Tooltip>
                        </Typography> : null}

                        {(!row.removed  && props.deleteAccess) ? <Typography sx={{ marginLeft: "10px" }}>
                          <Tooltip title="Delete">
                            <HighlightOffIcon style={mouseCursor} onClick={(e) => confirmDelete(row)} color="error" />
                          </Tooltip>
                        </Typography> : null}
                      </FlexDiv>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
              {
                !rows.length ?
                  <TableCell align='center' colSpan={columns.length+1}>
                    No Records Found
                  </TableCell> : null
              }

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 10, 25, 100]}
          component="div"
          count={rowCount}
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
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CMButton color="secondary" value="Cancel" onClick={() =>  setOpenModal(false)} disabled={loading} />
          <CMButton color="error" value="Delete" onClick={deleteItem} loading={loading} />
        </DialogActions>
      </Dialog>

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={perModal}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure want to delete this item permanently, once deleted cannot be reversed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CMButton color="secondary" value="Cancel" onClick={() => setPermModal(false)} disabled={loading} />
          <CMButton color="error" value="Delete" onClick={deleteItemPermenant} loading={loading} />
        </DialogActions>
      </Dialog>



      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={rollbackModal}
      >
        <DialogTitle>Rollback Confirmation</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure want to rollback this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <CMButton color="secondary" value="Cancel" onClick={() => setOpenRollbackModal(false)} disabled={loading} />
          <CMButton color="success" value="Rollback" onClick={rollbackItem} loading={loading} />
        </DialogActions>
      </Dialog>

{openViewModal && <CMModel modelCmpnt={props.modelCmpnt} open={openViewModal} serviceForChecked={props.serviceChecked} buttons={props.buttons} rows={viewrow} columns={props.fullcolumns? props.fullcolumns : props.columns}  close={()=>{setOpenViewModal(false)}}  loading={loading} ViewHeader={props.ViewHeader}  noswitch={props.noswitch}/>
}
    </React.Fragment>
  )
}