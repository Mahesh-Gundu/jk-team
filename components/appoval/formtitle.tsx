import { Autocomplete, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Add, Remove} from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import styles from './formtitle.module.scss';
import { getOptions, getfieldData } from './formtitle.services';
import { AppContext } from '../common/Helpers/Context/AppContext';
import { useRouter } from 'next/router';

const Approval = (props: any) => {

    const [typeOptions, setTypeOptions] = useState<any>([])
    const [data, setData] = useState<any>([])
    const [error, setError] = useState<any>(false)
    const { globalData, setGlobalData } = useContext(AppContext)
    const [response, setResponse] = useState<any>()
    const { push } = useRouter();
    const [indexValue, setIndexValue] = useState<any>({ "1": 1 })
    const [dataOption, setDataOption] = useState<any>([])
    const [inputValue, setInputValue] = useState<any>({ form_title: "", form_description: "" });
    
    const handleInputChange = (e: any) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })

    };
    useEffect(() => {
        getOptions().then((res: any) => {
            setDataOption(res)
        })
        getfieldData().then((res: any) => {
            setTypeOptions(res)
            let name1 = (res[0].field_name.split(" ")).join('_').toLowerCase()
            setData([...data,
            {
                id: 1,
                approval: "sequential",
                layout: "2 Box Layout",
                multiple: false,
                heading: "",
                options: [{ approval_options: 1 }],
                section1: [{ label: res[0].field_name, type: res[0].type.toLowerCase(), toggle:false, placeholder: "Enter " + res[0].placeholder, name: name1, minlength: res[0].minlength, maxlength: res[0].maxlength, minrange: res[0].minrange, maxrange: res[0].maxrange, minsize: res[0].minsize, maxsize: res[0].maxsize }],
            }
            ])
            setResponse(res)
        })
    }, [])
    const handleChange = (i: any, event: any) => {
        let arr = [...data]
        arr[i].approval = event.target.value
        setData(arr)
    };

    const handleChangeLayout = (i: any, event: any) => {
        let arr = [...data]
        arr[i].layout = event.target.value
        setData(arr)
    }

    const handleAddClick = (i: any) => {
        const lastKey = Object.keys(indexValue).pop();
        setIndexValue({ ...indexValue, [Number(lastKey) + 1]: 1 })
        console.log(lastKey, [Number(lastKey) + 1], "postkey");
        let name1 = (response[0].field_name.split(" ")).join('_').toLowerCase()

        setData([...data, {
            id: Number(lastKey) + 1,
            layout: "2 Box Layout",
            multiple: false,
            approval: "sequential",
            heading: "",
            options: [{ approval_options: 1 }],
            section1: [{
                label: response[0].field_name, type: response[0].type.toLowerCase(), toggle:false, placeholder: "Enter " + response[0].placeholder, name: name1, minlength: response[0].minlength, maxlength: response[0].maxlength, minrange: response[0].minrange, maxrange: response[0].maxrange, minsize: response[0].minsize, maxsize: response[0].maxsize

            }]
        }])
        console.log(data, "dttaaaaa")

    };
    const handleDeleteClick = (i: any) => {
        let arr = [...data]
        arr.length > 1 ? arr.splice(i, 1) : null
        setData(arr)

    };

    const addDropdown = (id: any, index: any) => {
        let arr = [...data]
        arr[id].options.push({ approval_options: 1 })
        setData([...arr])
    }
    const removeDropdown = (id: any, index: any) => {

        let arr = [...data];
        if (arr[id].options.length > 1) {
            arr[id].options.splice(index, 1)
        }
        setData([...arr])

    }
    const addInputDropdown = (id: any, index: any, cardid: any) => {
        const fieldId = indexValue[cardid] + 1;
        let name1 = (response[0].field_name.split(" ")).join('_').toLowerCase()

        setIndexValue({ ...indexValue, [cardid]: fieldId })
        let arr = [...data]
        arr[id].section1.push({ label: response[0].field_name, type: response[0].type.toLowerCase(), toggle: false, placeholder: "Enter " + response[0].placeholder, name: name1 + cardid + fieldId, minlength: response[0].minlength, maxlength: response[0].maxlength, minrange: response[0].minrange, maxrange: response[0].maxrange, minsize: response[0].minsize, maxsize: response[0].maxsize })
        setData([...arr])

    }

    const removeInputDropdown = (id: any, index: any) => {

        let arr = [...data];
        if (arr[id].section1.length > 1) {
            arr[id].section1.splice(index, 1)
        }
        setData([...arr])

    }
    const handleSwitchChange = (i: any, index: any) => {
        let arr = [...data];
        arr[i].section1[index].toggle = !arr[i].section1[index].toggle
        setData([...arr])
    }
    const handleInput = (i: any, e: any) => {
        let arr = [...data];
        arr[i].heading = e.target.value;
        setData([...arr])
    }
    const handleSelectChange = (i: any, index: any, e: any) => {
        let arr = [...data];
        arr[i].options[index].approval_options = e.target.value;
        setData([...arr])

    }
    const handleSelectChange1 = (i: any, index: any, e: any, cardid: any) => {
        const fieldId = indexValue[cardid] + 1;

        setIndexValue({ ...indexValue, [cardid]: fieldId })
        let arr = [...data];
        const selectData = response.find((m: any) => m.field_name === e.target.value)
        let name1 = (selectData?.field_name.split(" ")).join('_').toLowerCase()
        arr[i].section1[index].type = selectData?.type.toLowerCase();
        arr[i].section1[index].label = selectData?.field_name;
        arr[i].section1[index].name = name1 + cardid + fieldId;
        arr[i].section1[index].toggle = false;
        arr[i].section1[index].minlength = selectData?.minlength;
        arr[i].section1[index].maxlength = selectData?.maxlength;
        arr[i].section1[index].minrange = selectData?.minrange;
        arr[i].section1[index].maxrange = selectData?.maxrange;
        arr[i].section1[index].minsize = selectData?.minsize;
        arr[i].section1[index].maxsize = selectData?.maxsize;
        arr[i].section1[index].placeholder = "Enter " + selectData?.placeholder;
        setData([...arr])
    }
    const multipleChange = (i: any, event: any) => {
        let arr = [...data];
        arr[i].multiple = !arr[i].multiple
        setData([...arr])
    }
    const getPreview = (inputValue: any) => {
        if (inputValue.form_title && inputValue.form_description) {
            setGlobalData({
                ...globalData,
                user: { formDetails: inputValue, data: data }
            })
            let localData: any = localStorage.getItem("dummyData") ? JSON.parse(localStorage.getItem("dummyData") || '') : [];
            localData.push({ user: { formDetails: inputValue, data: data } })
            localStorage.setItem('dummyData', JSON.stringify(localData))
            push("/form")
        }
        else {
            setError(true)
        }

    }
    const getCancel = () => {
        push("/form")
    }

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-lg-12 col-sm-12">

                        <div className={styles.cardbody} >
                            <div >
                                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                    <h3 className={styles.cardtitle}><b>Form Title</b></h3>
                                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'end' }} >
                                        <Button style={{ height: '35px', marginRight: '5px', backgroundColor: 'black', color: "#ffffff",border:0}} onClick={getCancel}>
                                            Cancel
                                        </Button>
                                        <Button style={{ height: '35px', marginRight: '5px', backgroundColor: 'primary', color: "#ffffff" }} onClick={() => getPreview(inputValue)}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                <div>
                                    <div className={styles.cardtext}>
                                        <TextField
                                            id="formtitle"
                                            className={styles.inputField}
                                            variant="standard"
                                            placeholder='Form Title'
                                            InputProps={{ disableUnderline: true }}
                                            fullWidth
                                            name="form_title"
                                            value={inputValue.form_title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {(error && !inputValue.form_title) && <span className={styles.errortext}>form title is required!</span>}
                                </div>
                                <div>
                                    <div className={styles.cardtext}>
                                        <TextField
                                            id="formDescription"
                                            className={styles.inputField}
                                            variant="standard"
                                            placeholder='Form Descripion'
                                            InputProps={{ disableUnderline: true }}
                                            fullWidth
                                            name='form_description'
                                            value={inputValue.form_description}
                                            onChange={handleInputChange}
                                            minRows={4}
                                            multiline={true}
                                        />
                                    </div>
                                    {(error && !inputValue.form_description) && <span className={styles.errortext}>form description is required!</span>}
                                </div>


                            </div>
                        </div>
                        {data?.map((e: any, i: any) => (<div>
                            <div className={styles.buttonContainerCircle}>
                                <div>
                                    <Button className={styles.buttonplus} onClick={() => handleAddClick(i)} style={{ marginRight: 10 }}>
                                        < Add className={styles.buttonadd} />
                                    </Button>
                                </div>
                                <div>
                                    <Button className={styles.buttonplus} onClick={() => handleDeleteClick(i)}>
                                        <Remove className={styles.buttonadd} />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className={styles.card}>
                                    <div className={styles.row}>
                                        <div>
                                            <div className={styles.approvalName}>
                                                <div>
                                                    <TextField
                                                        id="fieldName"
                                                        className={styles.customInput}
                                                        placeholder="Enter Card Title"
                                                        InputProps={{ disableUnderline: true }}
                                                        value={e.heading}
                                                        onChange={(e: any) => handleInput(i, e)}
                                                    />
                                                </div>
                                                <RadioGroup row value={e.layout} onChange={(event: any) => handleChangeLayout(i, event)}>
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label={
                                                            <Typography variant="body1" fontWeight="bold">
                                                                2 Box Layout
                                                            </Typography>
                                                        }
                                                        value="2 Box Layout"
                                                        className={styles.sequent}
                                                    />
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label={
                                                            <Typography variant="body1" fontWeight="bold">
                                                                3 Box Layout
                                                            </Typography>
                                                        }
                                                        value="3 Box Layout"
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className={styles.approvalName}>
                                            <p style={{ fontWeight: 800, fontSize: '16px',marginTop:'revert' }}>Approval</p>
                                            <div className={styles.buttonContainer}>
                                                <div className={styles.btn_length}>
                                                    <Checkbox
                                                        checked={e.multiple}
                                                        onChange={(event: any) => multipleChange(i, event)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                    <p className={styles.mtmr}>Multiple</p>
                                                </div>
                                                <RadioGroup row value={e.approval} onChange={(event: any) => handleChange(i, event)}>
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label={
                                                            <Typography variant="body1" fontWeight="bold">
                                                                Sequential
                                                            </Typography>
                                                        }
                                                        value="sequential"
                                                        className={styles.sequent}
                                                    />
                                                    <FormControlLabel
                                                        control={<Radio />}
                                                        label={
                                                            <Typography variant="body1" fontWeight="bold">
                                                                Parallel
                                                            </Typography>
                                                        }
                                                        value="parallel"
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                    {e?.options?.map((val: any, index: any) => (<div className={styles.person}>
                                        <div>
                                            <Select className={styles.dropSelect} value={val.approval_options} onChange={(event: any) => handleSelectChange(i, index, event)}>

                                                {dataOption.map((v: any, index: any) => (
                                                    <MenuItem value={v.id} >
                                                        <Typography variant="body1" fontWeight="bold">
                                                            {v.label}
                                                        </Typography>
                                                    </MenuItem>

                                                ))}
                                            </Select>
                                        </div>
                                        <div className={styles.buttontonggle}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <div>
                                                    <Button className={styles.buttonplus} onClick={() => addDropdown(i, index)}>
                                                        < Add className={styles.buttonadd} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <Button className={styles.buttonplus} onClick={() => removeDropdown(i, index)}>
                                                    <Remove className={styles.buttonadd} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>))}
                                    <div className={styles.horizontalLine}></div>
                                    {e?.section1?.length && e.section1.map((val: any, index: any) => (
                                        <div className={styles.fieldname} key={`sec1-${index}`}>

                                            <div className={styles.textopt}>

                                                <Select className={styles.dropSelect} value={val.label} onChange={(event: any) => handleSelectChange1(i, index, event, e.id)}>
                                                    {typeOptions.map((t: any) => (
                                                        <MenuItem value={t.field_name}>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {t.field_name}
                                                            </Typography>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className={styles.labelAndToggleContainer} style={{marginLeft:'22px'}}>
                                                <label htmlFor="toggleContainer"><b>Required</b></label>
                                                <Switch
                                                    checked={val.toggle}
                                                    onChange={() => handleSwitchChange(i, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    className={styles.customSwitch}

                                                />
                                            </div>
                                            <div className={styles.buttontonggle} style={{marginLeft:'10px'}}>
                                                <div>
                                                    <Button className={styles.buttonplus} onClick={() => addInputDropdown(i, index, e.id)}>
                                                        < Add className={styles.buttonadd} />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button className={styles.buttonplus}>
                                                        <Remove className={styles.buttonadd} onClick={() => removeInputDropdown(i, index)} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>

            </Container>
            

        </>
    )
}

export default Approval
