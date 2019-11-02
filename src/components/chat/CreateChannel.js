import React, { useState } from 'react'
import { Fab, Modal, Button, TextField  } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CHANNEL } from '../../gql/channel/index';

const CreateChannel = () => {
  const [createChannel] = useMutation(CREATE_CHANNEL);
  const [isOpen, setOpen] = useState(false)
  const [name, setName] = useState('')

  const handleCreateChannel = (e) => {
    e.preventDefault()
    createChannel({variables: {name: name }})
    setName('')
  }

  const handleOpen = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fab color="primary" aria-label="add">
      <AddIcon onClick={e => handleOpen(e)}/>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <div>
          <h2>Create new channel</h2>
          <TextField
            label="Channel name"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={e => handleCreateChannel(e)}>
            Confirm!
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </Fab>
  )
}

export default CreateChannel