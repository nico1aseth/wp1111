import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Rating from '../components/rating'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ViewModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title} reviewed by {props.author}
            <Rating value={props.score}></Rating>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Review:
          </Typography>

          <TextField
           style={{ width: 330 }}
            type='text'
            value={props.body}
            variant='outlined'
            inputProps={
              { readOnly: true, }
            }
          /> 
        </Box>
      </Modal>
    </div>
  );
}


export default ViewModal

