export const generateFormFields = (formFieldsValues:any) =>{
    console.log(formFieldsValues,"formfieldvalues")
    let formFields = formFieldsValues;
    return new Promise((resolve)=>{
        let fields:any = [];
        formFields.forEach((element:any) => {
            // if(element.type==='dropdown')
            // fields.push(element.options())
        });
        if(fields.length){
            Promise.all(fields).then(function(values) {
                console.log({values})
                let fields =[];
                let fieldValues = JSON.parse(JSON.stringify(formFields))
                fieldValues.forEach((element:any,index:number) => {
                    if(element.type==='dropdown')
                    {
                        fieldValues[index]['options'] = values[fields.length]
                        fields.push('')
                    }
                });
                resolve(fieldValues)
            });
        }else{
            resolve(formFields);
        }
    })
    
}