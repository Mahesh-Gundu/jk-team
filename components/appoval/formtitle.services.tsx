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
                    id: 0,
                    label: false
                },
                {
                    id: 1,
                    label: true
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
                    fieldname: 'Salary Advance',
                    placeholder: 'Salary Advance',
                    type: "text",
                    validation: true,
                    name: 'salary_advance'
                },
                {
                    fieldname: 'Medical Advance',
                    placeholder: 'Medical Advance', 
                    type: "dropdown",
                    validation: false,
                    name: 'medical_advance'
                },
                {
                    fieldname: 'Education Advance',
                    placeholder: 'Education Advance',
                    type: "file",
                    validation: true,
                    name: 'education_advance'
                },
                {
                    fieldname: 'Festival Advance',
                    placeholder: 'Festival Advance',
                    type: "date",
                    validation: true,
                    name: 'festival_advance'
                },
                {
                    fieldname: 'Marriage Advance',
                    placeholder: 'Marriage Advance',
                    type: "dropdown",
                    validation: true,
                    name: 'marriage_advance'
                },
                {
                    fieldname: 'Vehicle Advance',
                    placeholder: 'Vehicle Advance',
                    type: "text",
                    validation: false,
                    name: 'vehicle_advance'
                },
                {
                    fieldname: 'Society Loan',
                    placeholder: 'Society Loan',
                    type: "dropdown",
                    validation: true,
                    name: 'society_loan'
                },
            ])
        })
    })
}

export const postData = (value:any) => {
    console.log(value,"postDataValue");
    // return value 
}









