import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Modal,
  Typography
} from '@mui/material';

const avatarFolder = '/assets/avatars';
const avatarOptions = [
  'avatar-alcides-antonio.png', 
  'avatar-anika-visser.png', 
  'avatar-cao-yu.png', 
  'avatar-carson-darrin.png',
  'avatar-chinasa-neo.png',
  'avatar-fran-perez.png',
  'avatar-iulia-albu.png',
  'avatar-jie-yan-song.png',
  'avatar-marcus-finn.png',
  'avatar-miron-vitold.png',
  'avatar-siegbert-gottfried.png',
  'avatar-seo-hyeon-ji.png',
  'avatar-penjani-inyene.png',
  'avatar-omar-darboe.png',
  'avatar-omar-darboe.png',
  'avatar-nasimiyu-danai.png'
];

export const AccountProfile = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : {};
  const userName = user.firstName || 'User Name';

  const isValidUrl = (url) => url && (url.startsWith('http://') || url.startsWith('https://'));
  const [avatarUrl, setAvatarUrl] = useState(isValidUrl(user.avatar) ? user.avatar : '');
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);

  const handleOpenAvatarModal = () => {
    setAvatarModalOpen(true);
  };

  const handleCloseAvatarModal = () => {
    setAvatarModalOpen(false);
  };

  const handleSelectAvatar = (selectedAvatar) => {
    const newAvatarUrl = `${avatarFolder}/${selectedAvatar}`;
    setAvatarUrl(newAvatarUrl);
    handleCloseAvatarModal();
  
    const updatedUser = { ...user, avatar: newAvatarUrl };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Show success notification
    toast.success('Avatar updated successfully!', { position: 'top-right' });
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              cursor: 'pointer',
            }}
            onClick={handleOpenAvatarModal}
          />
          <Typography gutterBottom variant="h5">
            {userName.toString()}
          </Typography>

          <Typography color="text.secondary" variant="body2">
            INDIA
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" onClick={handleOpenAvatarModal}>
          Choose Avatar
        </Button>
      </CardActions>

      <Modal
        open={isAvatarModalOpen}
        onClose={handleCloseAvatarModal}
        aria-labelledby="avatar-modal-title"
        aria-describedby="avatar-modal-description"
      >
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(3px)',
            webkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            p: 4,
            width: '50vw',
            maxHeight: '50vh',
            overflowY: 'auto'
          }}
        >
          <Typography variant="h6" id="avatar-modal-title" gutterBottom>
            Select Avatar
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {avatarOptions.map((avatar, index) => (
              <Avatar
                key={`${avatar}-${index}`}
                src={`${avatarFolder}/${avatar}`}
                alt={avatar}
                sx={{
                  cursor: 'pointer',
                  m: 2,
                  width: 90,
                  height: 90,
                  transition: 'transform 0.3s ease-in-out',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'ring-animation 1.5s linear infinite',
                    zIndex: -1
                  }
                }}
                onClick={() => handleSelectAvatar(avatar)}
              />
            ))}
          </Box>
        </Box>
      </Modal>
      <style>
        {`
          @keyframes ring-animation {
            0% {
              transform: scale(10);
              background: linear-gradient(to right, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #92288f, #5e2b7e, #007bff);
            }
            100% {
              transform: scale(1.5);
              background: linear-gradient(to right, #007bff, #5e2b7e, #92288f, #bc1888, #cc2366, #dc2743, #e6683c, #f09433);
            }
          }
        `}
      </style>
      <ToastContainer />
    </Card>
  );
};
