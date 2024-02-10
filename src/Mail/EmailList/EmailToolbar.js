import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Checkbox,
  Typography,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';

const styles = {
  root: {
    backgroundColor: 'white',
    padding: '16px',
    height: '68px',
    display: 'flex',
    alignItems: 'center'
  },
  backButton: {
    marginRight: '16px',
    display: 'none'
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    display: 'none'
  },
  search: {
    height: '42px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    flexBasis: '300px',
    marginLeft: 'auto'
  },
  searchIcon: {
    marginRight: '16px',
    color: 'currentColor'
  },
  searchInput: {
    flexGrow: 1
  },
  refreshButton: {
    marginLeft: '16px',
    display: 'none'
  },
  moreButton: {
    marginLeft: '16px'
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    display: 'none'
  },
  paginationDetails: {
    whiteSpace: 'nowrap'
  }
};

function EmailToolbar({
  selectedEmails,
  totalEmails,
  onSelectAll,
  onDeselectAll,
  onBack,
  className,
  ...rest
}) {

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      if (onSelectAll) {
        onSelectAll();
      }
    } else if (onDeselectAll) {
      onDeselectAll();
    }
  };

  return (
    <div
      {...rest}
      style={styles.root}
      className={clsx(className)}
    >
      <Tooltip title="Back">
        <IconButton
          style={styles.backButton}
          onClick={onBack}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <div style={styles.select}>
        <Checkbox
          checked={selectedEmails.length === totalEmails}
          color="primary"
          indeterminate={
            selectedEmails.length > 0 && selectedEmails.length < totalEmails
          }
          onChange={handleCheckboxChange}
        />
        <Typography variant="h6">Select all</Typography>
      </div>
      <Paper
        style={styles.search}
        elevation={1}
      >
        <SearchIcon style={styles.searchIcon} />
        <Input
          style={styles.searchInput}
          disableUnderline
          placeholder="Search email"
        />
      </Paper>
      <Tooltip title="Refresh">
        <IconButton
          style={styles.refreshButton}
          size="small"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="More options">
        <IconButton
          style={styles.moreButton}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <div style={styles.pagination}>
        <Tooltip title="Next page">
          <IconButton size="small">
            <KeyboardArrowLeftIcon />
          </IconButton>
        </Tooltip>
        <Typography
          style={styles.paginationDetails}
          variant="body2"
        >
          1 - 50 of 200
        </Typography>
        <Tooltip title="Previous page">
          <IconButton size="small">
            <KeyboardArrowRightIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

EmailToolbar.propTypes = {
  className: PropTypes.string,
  onBack: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onSelectAll: PropTypes.func,
  selectedEmails: PropTypes.array.isRequired,
  totalEmails: PropTypes.number.isRequired
};

export default EmailToolbar;
