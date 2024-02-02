import { Button, Fab, Typography } from "@mui/material"
import { FlexDivSpaceCenter } from "../Flex/Flex"
import AddIcon from '@mui/icons-material/Add';
import PopupModal from "../Model/Model";
import React from "react";

interface HeaderProps {
  header: string,
  list?: boolean,
  value?: string,
  onClick?: any,
  link?: string
}

export const PageHeader = (props: HeaderProps) => {
  console.log(props);
  // const [openModal, setOpenModal] = React.useState(false);
  return (
    <FlexDivSpaceCenter style={{ marginBottom: 5, marginTop: 5 }}>
      <Typography variant="h5" sx={{ mb: 0 }}>
       <span> <b>{props.header}</b></span>
      </Typography>
      {
        props.list ?
          <Fab size="small" color="primary" aria-label="add" onClick={props.onClick} value={props.value}>
            <AddIcon />
          </Fab> : null
        // <CMLinkButton link={props.link} icon={<Add/>} value={props.value} /> : null
      }



    </FlexDivSpaceCenter>

  )

//   {openModal && <PopupModal modelCmpnt={props.modelCmpnt} open={openModal}
//     close={()=>{setOpenModal(false)}} 
//     />
// }
}


PageHeader.defaultProps = {
  header: "",
  list: false,
  value: "",
  onclick: "",
}