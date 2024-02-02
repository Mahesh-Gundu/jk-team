import { Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

function DropdownView(props: any) {
    console.log(props,"props")
    const row:any = props.rowData;
    let data:any=[];
    data.push(row)
    // console.log(row,a,"row",data[0].field_name,data[0].options)
    return (
        <>
            {data.length && data?.map((row: any, index: number) => {
                return (
                    <> 
                        <Grid container spacing={4} >
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <b>Field Name</b>
                                <p>{row.field_name}</p>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <b>Options</b>
                                <div className='d-flex flex-wrap'>
                                    {row?.options?.map((options: any, index: number) => (
                                        <div className='d-flex align-items-center m-2'>
                                            <span style={{ marginLeft: '5px', marginRight:'5px' }}>{options.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </>
                )
            })}
        </>
    );
}
export default DropdownView;









