import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Divider,
  List,
  ListItem,
  Typography,
  colors
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/InboxOutlined';
import SendIcon from '@mui/icons-material/SendOutlined';
import DraftsIcon from '@mui/icons-material/DraftsOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import FlagIcon from '@mui/icons-material/OutlinedFlag';
// import Label from '@mui/material/Label';

const styles = {
  root: {
    height: '100%',
    backgroundColor: 'white'
  },
  toolbar: {
    padding: '16px 24px'
  },
  addIcon: {
    marginRight: '8px'
  },
  button: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: 'normal'
  },
  folderIcon: {
    marginRight: '8px',
    color: 'currentColor'
  },
  totalItems: {
    marginLeft: '8px'
  },
  newItems: {
    marginLeft: 'auto'
  },
  active: {
    fontWeight: 'bold',
    color: 'blue',
    '& $folderIcon': {
      color: 'blue'
    }
  }
};

function EmailFolders({ onFolderOpen, className, ...rest }) {
  const [active, setActive] = useState('inbox');
  const folders = [
    // ... (your folder data remains the same)
  ];

  const handleSelect = (folder) => {
    setActive(folder.id);

    if (onFolderOpen) {
      onFolderOpen(folder.id);
    }
  };

  return (
    <div
      {...rest}
      style={styles.root}
      className={clsx(className)}
    >
      <div style={styles.toolbar}>
        <Button
          color="primary"
          fullWidth
          variant="contained"
        >
          <AddIcon style={styles.addIcon} />
          Compose message
        </Button>
      </div>
      <Divider />
      <List>
        {folders.map((folder) => (
          <ListItem
            key={folder.title}
          >
            <Button
              style={clsx(styles.button, {
                [styles.active]: active === folder.id
              })}
              fullWidth
              onClick={() => handleSelect(folder)}
            >
              {folder.icon}
              {folder.title}
              {folder.total_items > 0 && (
                <Typography
                  style={styles.totalItems}
                  variant="body2"
                >
                  (
                    {folder.total_items > 99 ? '99+' : folder.total_items}
                  )
                </Typography>
              )}
              {folder.new_items && (
                <Label
                  style={styles.newItems}
                  color={colors.red[600]}
                  shape="rounded"
                  variant="contained"
                >
                  {folder.new_items}
                </Label>
              )}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

EmailFolders.propTypes = {
  className: PropTypes.string,
  onFolderOpen: PropTypes.func
};

export default EmailFolders;
