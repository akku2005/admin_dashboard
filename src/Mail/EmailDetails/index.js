import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/ReplyOutlined';
import ReplyAllIcon from '@mui/icons-material/ReplyAllOutlined';
import EmailToolbar from './EmailToolbar';
import EmailForm from './EmailForm';

// Assuming Avatar is in the same directory as EmailDetails
import Avatar from './';

function EmailDetails({
  email,
  onEmailClose,
  className,
  ...rest
}) {
  const styles = {
    root: {
      height: '100%',
      backgroundColor: 'white',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    receiver: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      height: 56,
      width: 56,
      marginRight: 16
    },
    actions: {
      display: 'flex',
      alignItems: 'center'
    },
    content: {
      flexGrow: 1,
      padding: '48px 24px'
    },
    message: {
      marginTop: 16,
      '& > p': {
        fontSize: '1.125rem'  // Adjust font size as needed
      }
    }
  };

  return (
    <div
      {...rest}
      style={styles.root}
      className={clsx('email-details', className)}
    >
      <EmailToolbar onBack={onEmailClose} />
      <Divider />
      <div style={styles.header}>
        <div style={styles.receiver}>
          <Avatar
            style={styles.avatar}
            src={email.receiver.avatar}
          >
            {getInitials(email.receiver.name)}
          </Avatar>
          <div>
            <Typography
              display="inline"
              variant="h5"
            >
              {email.receiver.name}
            </Typography>
            {' '}
            <Link
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {email.receiver.email}
            </Link>
            <Typography variant="subtitle2">
              To:
              {' '}
              <Link color="inherit">shen.zhi@devias.io</Link>
              ,
              {' '}
              <Link color="inherit">contact@devias.io</Link>
            </Typography>
            <Typography variant="body2">
              {moment(email.created_at).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
          </div>
        </div>
        <div style={styles.actions}>
          <Tooltip title="Reply">
            <IconButton
              className="more-button"
              size="small"
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reply all">
            <IconButton
              className="more-button"
              size="small"
            >
              <ReplyAllIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton
              className="more-button"
              size="small"
            >
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Divider />
      <div style={styles.content}>
        <Typography variant="h1">{email.subject}</Typography>
        <div style={styles.message}>
          {email.message.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Divider />
      <EmailForm />
    </div>
  );
}

EmailDetails.propTypes = {
  className: PropTypes.string,
  email: PropTypes.object.isRequired,
  onEmailClose: PropTypes.func
};

export default EmailDetails;
