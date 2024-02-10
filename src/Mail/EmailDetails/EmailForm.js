import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function EmailForm({ className, ...rest }) {
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('');
  const sender = {
    avatar: '/images/avatars/avatar_11.png'
  };

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const styles = {
    root: {
      padding: 16,
      display: 'flex',
    },
    avatar: {
      marginRight: 16,
    },
    paper: {
      flexGrow: 1,
      padding: 16,
    },
    textArea: {
      border: 'none',
      outline: 'none',
      resize: 'none',
      width: '100%',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 16,
    },
    sendButton: {
      marginRight: 16,
    },
    fileInput: {
      display: 'none',
    },
  };

  return (
    <div
      {...rest}
      style={styles.root}
      className={clsx(className)}
    >
      <Avatar
        alt="Person"
        style={styles.avatar}
        src={sender.avatar}
      />
      <Paper
        style={styles.paper}
        elevation={1}
      >
        <TextareaAutosize
          style={styles.textArea}
          onChange={handleChange}
          placeholder="Leave a message"
          rows={6}
          value={value}
        />
        <div style={styles.actions}>
          <Button
            style={styles.sendButton}
            color="primary"
            variant="contained"
          >
            Send
          </Button>
          <IconButton onClick={handleAttach}>
            <AddAPhotoIcon />
          </IconButton>
          <IconButton onClick={handleAttach}>
            <AttachFileIcon />
          </IconButton>
        </div>
      </Paper>
      <input
        style={styles.fileInput}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
}

EmailForm.propTypes = {
  className: PropTypes.string
};

export default EmailForm;
