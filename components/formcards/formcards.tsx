import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid} from '@mui/material';
import { useRouter } from 'next/router';
import style from './formcards.module.scss'
import { AppContext } from '../common/Helpers/Context/AppContext';
import { getData } from '../appoval/formtitle.services';
import ModeIcon from '@mui/icons-material/Mode';
import ClearIcon from '@mui/icons-material/Clear';
const ImgMediaCard = () => {
    const { globalData, setGlobalData } = React.useContext(AppContext)
    const [values, setvalues] = React.useState<any>()
    const router = useRouter();
    const handleSubmit = () => {
        router.push('/admin');
    }
    const handleChange = (val: any) => {
        console.log(val, "1113213");
        setGlobalData(val)

        router.push('./contact')
    }
    const handleChange1 = (index: any) => {
        console.log(index,"1113213");
        // setGlobalData(val)
        let localData: any = localStorage.getItem("dummyData") ? JSON.parse(localStorage.getItem("dummyData") || '') : [];
        let val = localData[index]
        console.log(val,"1113213")

        router.push('./contact')
    }
    React.useEffect(() => {
        getData().then((res: any) => {
            setvalues(res)
        })
    }, [])

    const handleDelete =(index:any) =>{
        let localData: any = localStorage.getItem("dummyData") ? JSON.parse(localStorage.getItem("dummyData") || '') : [];
        localData.splice(index,1)
        localStorage.setItem('dummyData', JSON.stringify(localData))
        location.reload();

    }
    return (
        <>
            <Container>
                <Card sx={{ mt: 5, mb: 2, height: "100px" }} >
                    <h1 className={style.cardtitleone}><b className={style.listfontsize}>Form List</b></h1>
                </Card>
                <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }} >
                    <Button variant="contained" onClick={handleSubmit}>
                        Add
                    </Button>
                </div>
                <Card className={style.containeradj}>
                    <CardContent>
                        <Container>
                            <div>
                                <Box sx={{ flexGrow: 1 }} >
                                    <Grid container spacing={8} style={{ display: 'flex', justifyContent: "center" }}>
                                        {values?.length && values?.map((e: any, i: any) => (
                                            <Grid className={style.cardpadding} item xs={12} sm={6} md={4}>
                                                <div>
                                                    <Card sx={{ maxWidth: 300, mt: 5, mb: 0 }} className={style.cardborder}>
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            {/* <Button style={{width:'5px'}} onClick={()=>handleChange1(i)}>
                                                                <ModeIcon />
                                                            </Button> */}
                                                            <Button onClick={()=>handleDelete(i)}>
                                                                <ClearIcon/>
                                                            </Button>
                                                        </div>
                                                        <CardContent onClick={() => handleChange(e)}>
                                                            <div className={style.imgtestmonial}>
                                                                <img src="./user.svg" alt="Sonia Blake" className={style.testimg} />
                                                            </div>
                                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                                <b>{e?.user?.formDetails?.form_description}</b>
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                    <h2 ><b className={style.cardtitle}>{e?.user?.formDetails?.form_title}</b></h2>
                                                </div>
                                            </Grid>))}
                                    </Grid>
                                </Box>
                            </div>
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default ImgMediaCard
