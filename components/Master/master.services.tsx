export const getexample = () => {
    return new Promise((resolve, reject) => {
       
            resolve({data:[
                // {
                //     type: "",
                //     field_name: "",
                //     placeholder: "",
                // },
            ]})
      
    })
}


export const getValidationData = () => {
    return new Promise((resolve, reject) => {
       
            resolve([
                {
                    id: 1,
                    label: "Alpha"
                },
                {
                    id: 2,
                    label: "Alpha Numeric"
                },
                {
                    id: 3,
                    label: "Email"
                },
            ])
      
    })
}
export const getTypeData = () => {
    return new Promise((resolve, reject) => {
       
            resolve({type:[
                {
                    id: 1,
                    label: "Text"
                },
                {
                    id: 2,
                    label: "Range"
                },
                {
                    id: 3,
                    label: "File"
                },
                {
                    id: 4,
                    label: "Dropdown"
                },
                {
                    id: 5,
                    label: "Date"
                },
                
            ]})
      
    })
}
