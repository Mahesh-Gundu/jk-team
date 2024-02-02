import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, useScrollTrigger } from '@mui/material';
import { useRouter } from 'next/router';
import style from './formcards.module.scss'
import { AppContext } from '../common/Helpers/Context/AppContext';
import { getData } from '../appoval/formtitle.services';
const ImgMediaCard =()=> {
    const {globalData,setGlobalData} = React.useContext(AppContext)
    const [values,setvalues] = React.useState<any>()
    const router = useRouter();
    const handleSubmit=()=>{
        router.push('/admin');
    }
    const handleChange =(val:any) =>{
        console.log(val,"1113213");
        setGlobalData(val)
        
        router.push('./contact')
    }
    React.useEffect(()=>{
        getData().then((res:any)=>{
            setvalues(res)
        })
    },[])
    console.log(values,"valuesresponse")
    return (
        <>
            <Container>
                <Card sx={{mt:5, mb:2 , height:"100px"}} >
                            <h1 className={style.cardtitleone}><b className={style.listfontsize}>Form List</b></h1>
                            {/* <h1  className={style.cardtitleone}>Form List</h1> */}
                </Card>
                <div style={{display:'flex',justifyContent:'end',marginBottom:'10px'}} >
                    <Button variant="contained" onClick={handleSubmit}>
                                    Add
                                </Button>
                </div>
                <Card className={style.containeradj}>
                    <CardContent>
                        <Container>
                            <div>
                              <Box sx={{ flexGrow: 1 }} >
                                    <Grid container spacing={8} style={{display:'flex',justifyContent:"center"}}>
                                        {values?.length && values?.map((e: any, i: any) => (
                                        <Grid className={style.cardpadding} item xs={12} sm={6} md={4}>
                                            <div>
                                            <Card sx={{ maxWidth: 300 ,mt:5,mb:0}} className={style.cardborder} onClick={()=>handleChange(e)}>
                                                <CardContent>
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


{/* <Grid className={style.cardpadding} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 300 ,mt:5,mb:0 }} className={style.cardborder} onClick={handleChange}>
                                                <CardContent>
                                                    <div className={style.imgtestmonial}>
                                                        <img src="./user.svg" alt="Sonia Blake" className={style.testimg} />
                                                    </div>
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                   <b>Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica.</b>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <h2 className={style.cardtitle}><b>Title</b></h2>
                                        </Grid>
                                        <Grid className={style.cardpadding} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 300,mt:5,mb:0  }} className={style.cardborder} onClick={handleChange}>
                                                <CardContent>
                                                    <div className={style.imgtestmonial}>
                                                        <img src="./user.svg" alt="Sonia Blake" className={style.testimg} />
                                                    </div>
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                   <b>Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica.</b>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <h2 className={style.cardtitle}><b>Title</b></h2>
                                        </Grid>
                                        <Grid  className={style.cardpaddingone} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 300,mt:5,mb:0  }} className={style.cardborder} onClick={handleChange}>
                                                <CardContent>
                                                    <div className={style.imgtestmonial}>
                                                        <img src="./user.svg" alt="Sonia Blake" className={style.testimg} />
                                                    </div>
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                   <b>Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica.</b>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <h2 className={style.cardtitle}><b>Title</b></h2>
                                        </Grid>
                                        <Grid className={style.cardpaddingone} item  xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 300,mt:5,mb:0  }} className={style.cardborder} onClick={handleChange}>
                                                <CardContent>
                                                    <div className={style.imgtestmonial}>
                                                        <img src="./user.svg" alt="Sonia Blake" className={style.testimg} />
                                                    </div>
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                   <b>Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica.</b>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <h2 className={style.cardtitle}><b>Title</b></h2>
                                        </Grid>
                                        <Grid className={style.cardpaddingone} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 300,mt:5,mb:0  }} className={style.cardborder} onClick={handleChange}>
                                                <CardContent>
                                                    <div className={style.imgtestmonial}>
                                                        <img src="./user.svg" alt="Sonia Blake" className={style.testimg} />
                                                    </div>
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                   
                                                    <b>Lizards are a widespread group of squamate reptiles, with over 6,000
                                                            species, ranging across all continents except Antarctica.</b>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <h2 className={style.cardtitle}><b>Title</b></h2>
</Grid> */}