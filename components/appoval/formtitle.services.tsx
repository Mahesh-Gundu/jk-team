export const getOptions = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    label: "HOD"
                },
                {
                    id: 2,
                    label: "Accounts HOD"
                },
                {
                    id: 3,
                    label: "DGM (HR & IR)"
                },
                {
                    id: 4,
                    label: "Sr. G M (HR & IR)"
                },
                {
                    id: 5,
                    label: "Executive V P (Works)"
                }

            ])
        })
    })
}


export const getData = () => {
    let localData:any = localStorage.getItem("dummyData")? JSON.parse(localStorage.getItem("dummyData") || '' ) : [];
    console.log(localData,"localdata");
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                [...localData]
            )
        })
    })
}
export const getToggle = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    label: 'Salary Advance'
                },
                {
                    id: 2,
                    label: 'Marriage Advance'
                }
            ])
        })
    })
}

export const getfieldData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    field_name: 'Salary Advance',
                    placeholder: 'Salary Advance',
                    type: "Text",
                    validation: true,
                    minlength:"3",
                    maxlength:"100",
                    minrange:"",
                    maxrange:"",
                    minsize:"",
                    maxsize:""
                },
                {
                    field_name: 'Medical Advance',
                    placeholder: 'Medical Advance', 
                    type: "Range",
                    validation: false,
                    minlength:"",
                    maxlength:"",
                    minrange:"3",
                    maxrange:"6",
                    minsize:"",
                    maxsize:""
                },
                {
                    field_name: 'Education Advance',
                    placeholder: 'Education Advance',
                    type: "File",
                    validation: true,
                    minlength:"",
                    maxlength:"",
                    minrange:"",
                    maxrange:"",
                    minsize:"10",
                    maxsize:"100"
                },
                {
                    field_name: 'Festival Advance',
                    placeholder: 'Festival Advance',
                    type: "Date",
                    validation: true,
                    minlength:"",
                    maxlength:"",
                    minrange:"",
                    maxrange:"",
                    minsize:"",
                    maxsize:""
                },
                {
                    field_name: 'Marriage Advance',
                    placeholder: 'Marriage Advance',
                    type: "Dropdown",
                    validation: true,
                    minlength:"",
                    maxlength:"",
                    minrange:"",
                    maxrange:"",
                    minsize:"",
                    maxsize:""
                },
                {
                    field_name: 'Vehicle Advance',
                    placeholder: 'Vehicle Advance',
                    type: "Text",
                    validation: false,
                    minlength:"",
                    maxlength:"",
                    minrange:"",
                    maxrange:"",
                    minsize:"",
                    maxsize:""
                },
                {
                    field_name: 'Society Loan',
                    placeholder: 'Society Loan',
                    type: "Dropdown",
                    validation: true,
                    minlength:"",
                    maxlength:"",
                    minrange:"",
                    maxrange:"",
                    minsize:"",
                    maxsize:""
                },
            ])
        })
    })
}

export const postData = (value:any) => {
    console.log(value,"postDataValue");
    // return value 
}









