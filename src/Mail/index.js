import React, { useState } from 'react';
import clsx from 'clsx';
import Page from 'src/components/Page';
import EmailFolders from './EmailFolders';
import EmailList from './EmailList';
import EmailDetails from './EmailDetails';

const useStyles = {
  root: {
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    transition: 'transform 0.5s ease',
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transition: 'transform 0.5s ease',
        transform: 'translateX(0)',
      },
    },
  },
  openFolder: {
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        transform: 'translateX(-100%)',
      },
    },
  },
  emailFolders: {
    flexBasis: 280,
    flexShrink: 0,
    flexGrow: 0,
    borderRight: '1px solid #e0e0e0',
  },
  emailList: {
    flexGrow: 1,
  },
  emailDetails: {
    flexGrow: 1,
  },
};

function Mail() {
  const [emails] = useState([
    {
      id: 1,
      subject: 'Hello',
      message: 'How are you doing?',
      // Add other necessary properties
    },
    // Add more email objects as needed
  ]);

  const [openFolder, setOpenFolder] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleFolderOpen = () => {
    setOpenFolder(true);
    setSelectedEmail(null);
  };

  const handleFolderClose = () => {
    setOpenFolder(false);
  };

  const handleEmailOpen = () => {
    setSelectedEmail(emails[0]);
  };

  const handleEmailClose = () => {
    setSelectedEmail(null);
  };

  return (
    <Page
      style={clsx({
        [useStyles.root]: true,
        [useStyles.openFolder]: openFolder,
      })}
      title="Mail"
    >
      <EmailFolders style={useStyles.emailFolders} onFolderOpen={handleFolderOpen} />
      {selectedEmail ? (
        <EmailDetails
          style={useStyles.emailDetails}
          email={selectedEmail}
          onEmailClose={handleEmailClose}
        />
      ) : (
        <EmailList
          style={useStyles.emailList}
          emails={emails}
          onBack={handleFolderClose}
          onEmailOpen={handleEmailOpen}
        />
      )}
    </Page>
  );
}

export default Mail;
