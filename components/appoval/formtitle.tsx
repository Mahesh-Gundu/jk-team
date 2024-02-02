import { Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Add, Remove, Edit, Delete } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { FaPeopleLine } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdEditCalendar } from "react-icons/md";
import styles from './formtitle.module.scss';
import { getOptions, getfieldData } from './formtitle.services';
import { AppContext } from '../common/Helpers/Context/AppContext';
import { useRouter } from 'next/router';
import { setIn } from 'formik';

const Approval = (props: any) => {

    const [isAddClicked, setAddClicked] = useState(false);
    const [isDeleteClicked, setDeleteClicked] = useState(false);
    const [isEditClicked, setEditClicked] = useState(false);
    const [typeOptions, setTypeOptions] = useState<any>([])
    const [data, setData] = useState<any>([])
    const { globalData, setGlobalData } = useContext(AppContext)
    const [section, setSection] = useState<any>()
    const [response, setResponse] = useState<any>()
    const { push } = useRouter();
    const [indexValue,setIndexValue]=  useState<any>({"1":1})


    const [dataOption, setDataOption] = useState<any>([])

    // const handleToggleClick = () => {
    //     setToggleOn(!isToggleOn);
    // };
    // const [selectedValue, setSelectedValue] = useState('');
    // const [description,setDescription] = useState('')

    // const handleChange = (event: any) => {
    //     setSelectedValue(event.target.value);
    // };
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
            const defObj = { label: res[0].fieldname, type: res[0].type, toggle: res[0].validation, placeholder: "Enter " + res[0].placeholder, name: res[0].name }
            setData([...data,
            {
                id: 1,
                approval: "sequential",
                layout: "2 Box Layout",
                multiple: false,
                heading: "",
                options: [{ data_options: 1 }],
                section1: [{ label: res[0].fieldname, type: res[0].type, toggle: res[0].validation, placeholder: "Enter " + res[0].placeholder, name: res[0].name}],
            }
            ])
            setSection(defObj)
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
        setAddClicked(true);
        const lastKey = Object.keys(indexValue).pop();
        setIndexValue({...indexValue,[Number(lastKey)+1]:1})
        console.log(lastKey,[Number(lastKey)+1],"postkey");
        
        setData([...data, {
            id: Number(lastKey)+1,
            layout: "2 Box Layout",
            multiple: false,
            approval: "sequential",
            heading: "",
            options: [{ data_options: 1 }],
            section1: [{ label: response[0].fieldname, type: response[0].type, toggle: response[0].validation, placeholder: "Enter " + response[0].placeholder, name: response[0].name}]
        }])
        console.log(data, "dttaaaaa")
        
    };

    console.log(indexValue,"postI");
    

    const handleDeleteClick = (i: any) => {
        setDeleteClicked(true);
        let arr = [...data]
        arr.length > 1 ? arr.splice(i, 1) : null
        setData(arr)

    };

    const handleEditClick = () => {
        setEditClicked(true);

    };
    const addDropdown = (id: any, index: any) => {
        let arr = [...data]
        arr[id].options.push({ data_options: 1 })
        setData([...arr])
    }
    const removeDropdown = (id: any, index: any) => {

        let arr = [...data];
        if (arr[id].options.length > 1) {
            arr[id].options.splice(index, 1)
        }
        setData([...arr])

    }
    const addInputDropdown = (id: any, index: any,cardid:any) => {
        // console.log(cardid,"postCardId");
        
        // const lastKey:any = Object.keys(indexValue).pop();
        // const lastValue:any = Object.values(indexValue).pop();
        const fieldId = indexValue[cardid]+1;
        console.log(fieldId,"postI","----",cardid);
        
        setIndexValue({...indexValue,[cardid]:fieldId})
        let arr = [...data]
        arr[id].section1.push({ label: response[0].fieldname, type: response[0].type, toggle: response[0].validation, placeholder: "Enter " + response[0].placeholder, name: response[0].name+cardid+fieldId })
        setData([...arr])
        // setIndexValue(indexValue+1)

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
        arr[i].options[index].data_options = e.target.value;
        setData([...arr])

    }
    const handleSelectChange1 = (i: any, index: any, e: any,cardid:any) => {
        const fieldId = indexValue[cardid]+1;
        console.log(fieldId,"postI","----",cardid);
        
        setIndexValue({...indexValue,[cardid]:fieldId})
        let arr = [...data];
        const selectData = response.find((m: any) => m.fieldname === e.target.value)
        arr[i].section1[index].type = selectData?.type;
        arr[i].section1[index].label = selectData?.fieldname;
        arr[i].section1[index].name = selectData?.name+cardid+fieldId ;
        arr[i].section1[index].toggle = selectData?.validation;
        arr[i].section1[index].placeholder = "Enter " + selectData?.placeholder;
        setData([...arr])
    }
    const multipleChange = (i: any, event: any) => {
        let arr = [...data];
        arr[i].multiple = !arr[i].multiple
        setData([...arr])
    }
    const getPreview = (inputValue: any) => {
        setGlobalData({
            ...globalData,
            user: { formDetails: inputValue, data: data }
        })
        let localData:any = localStorage.getItem("dummyData")? JSON.parse(localStorage.getItem("dummyData") || '' ) : [];
        localData.push({user: { formDetails: inputValue, data: data }})
        localStorage.setItem('dummyData',JSON.stringify(localData))
        push("/form")


    }

    return (
        <>
            <Container>
                <div className="row">
                    <div className="col-lg-3 col-sm-12">
                        <div className={styles.cards} >
                            <h5 className="card-title">Admin Menu</h5>
                            <p className={styles.attendanceContainer}>
                                <MdEditCalendar className={styles.iconStyle} />
                                <span className={styles.textStyle}>Attendance Manual</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BiBarChartAlt2 className={styles.iconStyle} />
                                <span className={styles.textStyle}>Company Status</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>Department</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>Designation</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <HiBuildingOffice2 className={styles.iconStyle} />
                                <span className={styles.textStyle}>Office Branch</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <FaPeopleLine className={styles.iconStyle} />
                                <span className={styles.textStyle}>Relation</span>
                            </p>

                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>role</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>team leave request</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>Team Regularization request</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>Technology</span>
                            </p>
                            <p className={styles.attendanceContainer}>
                                <BsBuilding className={styles.iconStyle} />
                                <span className={styles.textStyle}>Tenant</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-9 col-sm-12">

                        <div className={styles.cardbody} >
                            <div >
                                <div className={styles.buttonContainer1}>
                                    <h5 className={styles.cardtitle}>Form Title</h5>
                                    <Button onClick={() => getPreview(inputValue)}>
                                        Submit
                                    </Button>
                                </div>
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


                            </div>
                        </div>
                        {data?.length && data?.map((e: any, i: any) => (<div>
                            <div className={styles.buttonContainer}>
                                <Button className={styles.button} onClick={() => handleAddClick(i)}>
                                    Add
                                </Button>


                                <div className={styles.buttonSpace} />

                                <Button className={styles.button} onClick={() => handleDeleteClick(i)}>
                                    Delete
                                </Button>


                                <div className={styles.buttonSpace} />

                                <Button className={styles.button} onClick={handleEditClick}>
                                    Edit
                                </Button>
                            </div>

                            <div>
                                <div className={styles.approvalName}>
                                    <TextField
                                        id="fieldName"
                                        className={styles.customInput}
                                        placeholder="Enter Field Name"
                                        InputProps={{ disableUnderline: true }}
                                        // value={val.label}
                                        onChange={(e) => handleInput(i, e)}
                                    />
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
                            <div>
                                <div className={styles.card}>
                                    <div className={styles.row}>
                                        <div className={styles.approvalName}>
                                            <p>Approval</p>
                                            <div className={styles.buttonContainer}>
                                                <div className={styles.btn_length}>
                                                    <Checkbox
                                                        checked={e.multiple}
                                                        onChange={(event: any) => multipleChange(i, event)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                    <p>Multiple</p>
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
                                            <Select className={styles.customSelect} value={val.data_options} onChange={(event: any) => handleSelectChange(i, index, event)}>

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
                                            <div>
                                                <Button className={styles.buttonplus} onClick={() => addDropdown(i, index)}>
                                                    < Add className={styles.buttonadd} />
                                                </Button>
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

                                                <Select className={styles.customSelect} value={val.label} onChange={(event: any) => handleSelectChange1(i, index, event,e.id)}>
                                                    {typeOptions.map((t: any) => (
                                                        <MenuItem value={t.fieldname}>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {t.fieldname}
                                                            </Typography>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className={styles.labelAndToggleContainer}>
                                                <label htmlFor="toggleContainer"><b>Required</b></label>
                                                <Switch
                                                    checked={val.toggle}
                                                    onChange={() => handleSwitchChange(i, index)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    className={styles.customSwitch}

                                                />
                                            </div>
                                            <div className={styles.buttontonggle}>
                                                <div>
                                                    <Button className={styles.buttonplus} onClick={() => addInputDropdown(i, index,e.id)}>
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

