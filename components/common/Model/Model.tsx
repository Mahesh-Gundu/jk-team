import { Modal } from 'react-bootstrap';
import InputForm from './InputForm';
import DropdownBody from './Dropdown/Dropdown';
import DropdownForm from './DropdownForm';
import DropdownView from './DropdownView';
import ValidationForm from './Validation/Validation';
import EmployeeAdd from './Employeeform';

function PopupModal(props: any) {
  const ModelBodyComponent = props.modelCmpnt;
  const onSubmit = (val: any) => {
    console.log(val, "555555555555")
    if (props.add) {
      props.add(val);
    }
    else if (props.edit) {
      props.edit(val);
    }
    else {
      props.delete(val);
    }
    console.log(val);
    props.onHide()
  }
  const getAddDetails = (val: any) => {
    console.log(val, "******")
  }

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} >
        <Modal.Header closeButton >
          <h5><b>{props.header}</b></h5>
        </Modal.Header>
        <Modal.Body>
          {/* <ModelBodyComponent rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} />  */}


          {props?.Cmpnt === "master" ?
            <InputForm rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} /> :
            props?.Cmpnt === "dropdown" ?
              <DropdownForm rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} /> :
              props.Cmpnt === "dropdownView" ?
                <DropdownView rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} /> :
                props.Cmpnt === "validation" ?
                  <ValidationForm rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} /> :
                  props.Cmpnt === "employee" ?
                  <EmployeeAdd rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} /> :
                    null}


        </Modal.Body>
      </Modal>
    </>
  );
}

export default PopupModal;