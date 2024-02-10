import React, { useState } from "react";
import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Popover,
  Paper,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";

const SearchBox = () => {
  return (
    <div
      style={{
        position: "relative",
        right: 1,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: 8,
        padding: 8,
        width: "250px",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "8px",
          border: "2px solid #6466f1",
          borderRadius: "15px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

const NotificationPopover = () => {
  const notifications = [
    {
      id: 1,
      type: 'mail',
      content: 'New mail received!',
    },
    {
      id: 2,
      type: 'update',
      content: 'Software update available.',
    },
    // Add more notification data as needed
  ];

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: (theme) => `rgb(218,208,251)`,
        backdropFilter: 'blur(10px)',
        boxShadow: (theme) => `50px 0 10px rgba(0, 0, 0, 0.2), ${theme.shadows[50]}`,
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '200px',
        overflowY: 'auto',
      }}
    >
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id}>
            <Typography variant="body2">{notification.content}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [isContactsPopoverOpen, setIsContactsPopoverOpen] = useState(false);
  const [isNotificationPopoverOpen, setIsNotificationPopoverOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchIconClick = () => {
    setIsSearchBoxVisible(!isSearchBoxVisible);
    setIsContactsPopoverOpen(false);
    setIsNotificationPopoverOpen(false);
  };

  const handleContactsIconClick = (event) => {
    setIsContactsPopoverOpen(!isContactsPopoverOpen);
    setAnchorEl(event.currentTarget);
    setIsSearchBoxVisible(false);
    setIsNotificationPopoverOpen(false);
  };

  const handleNotificationIconClick = (event) => {
    setIsNotificationPopoverOpen(!isNotificationPopoverOpen);
    setNotificationAnchorEl(event.currentTarget);
    setIsSearchBoxVisible(false);
    setIsContactsPopoverOpen(false);
  };

  const handleOutsideClick = () => {
    setIsSearchBoxVisible(false);
    setIsContactsPopoverOpen(false);
    setIsNotificationPopoverOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton onClick={handleSearchIconClick}>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            {isSearchBoxVisible && <SearchBox />}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <IconButton onClick={handleContactsIconClick}>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationIconClick}>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <Popover
        open={isContactsPopoverOpen}
        anchorEl={anchorEl}
        onClose={() => setIsContactsPopoverOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <UserList />
      </Popover>
      <Popover
        open={isNotificationPopoverOpen}
        anchorEl={notificationAnchorEl}
        onClose={() => setIsNotificationPopoverOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <NotificationPopover />
      </Popover>
      {isSearchBoxVisible && (
        <div
          onClick={handleOutsideClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};

const UserList = () => {
  const users = [
    {
      id: 1,
      name: "Akash",
      avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
      mobileNumber: "+91 7420987728",
      jobTitle: "Software Engineer",
    },
    {
      id: 2,
      name: "Rahul",
      avatar: "/assets/avatars/avatar-carson-darrin.png",
      mobileNumber: "+91 1234567890",
      jobTitle: "IT",
    },
    // Add more user data as needed
  ];

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: (theme) => `rgb(218,208,251)`,
        backdropFilter: "blur(10px)",
        boxShadow: (theme) => `50px 0 10px rgba(0, 0, 0, 0.2), ${theme.shadows[50]}`,
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Avatar
              src={user.avatar}
              alt={`${user.name}'s Avatar`}
              sx={{
                width: 50,
                height: 50,
                marginRight: 2,
              }}
            />
            <div>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2">Mobile Number: {user.mobileNumber}</Typography>
              <Typography variant="body2">Job Title: {user.jobTitle}</Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopNav;






// // Import necessary dependencies and components
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import BellIcon from "@heroicons/react/24/solid/BellIcon";
// import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
// import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
// import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
// import {
//   Avatar,
//   Badge,
//   Box,
//   IconButton,
//   Stack,
//   SvgIcon,
//   Tooltip,
//   useMediaQuery,
//   Popover,
//   Paper,
//   Typography,
//   List,
//   ListItem,
// } from "@mui/material";
// import { alpha } from "@mui/material/styles";
// import { usePopover } from "src/hooks/use-popover";
// import { AccountPopover } from "./account-popover";
// import NotificationPopoverContent from "src/layouts/dashboard/NotificationPopover"; // Adjust the path as needed

// // Define the SearchBox component
// const SearchBox = () => {
//   return (
//     <div
//       style={{
//         position: "relative",
//         right: 1,
//         zIndex: 1000,
//         background: "rgba(255, 255, 255, 0.8)",
//         backdropFilter: "blur(10px)",
//         borderRadius: 8,
//         padding: 8,
//         width: "250px",
//       }}
//     >
//       <input
//         type="text"
//         placeholder="Search..."
//         style={{
//           width: "100%",
//           padding: "8px",
//           border: "2px solid #6466f1",
//           borderRadius: "15px",
//           boxSizing: "border-box",
//         }}
//       />
//     </div>
//   );
// };

// // Define the UserList component
// const UserList = () => {
//   const users = [
//     {
//       id: 1,
//       name: "Akash",
//       avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
//       mobileNumber: "+91 7420987728",
//       jobTitle: "Software Engineer",
//     },
//     {
//       id: 2,
//       name: "Rahul",
//       avatar: "/assets/avatars/avatar-carson-darrin.png",
//       mobileNumber: "+91 1234567890",
//       jobTitle: "IT",
//     },
//     // Add more user data as needed
//   ];

//   return (
//     <Paper
//       sx={{
//         padding: 2,
//         backgroundColor: (theme) => `rgb(218,208,251)`,
//         backdropFilter: "blur(10px)",
//         boxShadow: (theme) => `50px 0 10px rgba(0, 0, 0, 0.2), ${theme.shadows[50]}`,
//         borderRadius: "15px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         maxHeight: "200px",
//         overflowY: "auto",
//       }}
//     >
//       <List>
//         {users.map((user) => (
//           <ListItem key={user.id}>
//             <Avatar
//               src={user.avatar}
//               alt={`${user.name}'s Avatar`}
//               sx={{
//                 width: 50,
//                 height: 50,
//                 marginRight: 2,
//               }}
//             />
//             <div>
//               <Typography variant="h6">{user.name}</Typography>
//               <Typography variant="body2">Mobile Number: {user.mobileNumber}</Typography>
//               <Typography variant="body2">Job Title: {user.jobTitle}</Typography>
//             </div>
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// };

// // Define the TopNav component
// const TopNav = (props) => {
//   const { onNavOpen } = props;
//   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
//   const accountPopover = usePopover();
//   const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
//   const [isContactsPopoverOpen, setIsContactsPopoverOpen] = useState(false);
//   const [isNotificationPopoverOpen, setIsNotificationPopoverOpen] = useState(false);
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleSearchIconClick = () => {
//     setIsSearchBoxVisible(!isSearchBoxVisible);
//     setIsContactsPopoverOpen(false);
//     setIsNotificationPopoverOpen(false);
//   };

//   const handleContactsIconClick = (event) => {
//     setIsContactsPopoverOpen(!isContactsPopoverOpen);
//     setAnchorEl(event.currentTarget);
//     setIsSearchBoxVisible(false);
//     setIsNotificationPopoverOpen(false);
//   };

//   const handleNotificationIconClick = (event) => {
//     setIsNotificationPopoverOpen(!isNotificationPopoverOpen);
//     setNotificationAnchorEl(event.currentTarget);
//     setIsSearchBoxVisible(false);
//     setIsContactsPopoverOpen(false);
//   };

//   const handleOutsideClick = () => {
//     setIsSearchBoxVisible(false);
//     setIsContactsPopoverOpen(false);
//     setIsNotificationPopoverOpen(false);
//   };

//   return (
//     <>
//       <Box
//         component="header"
//         sx={{
//           backdropFilter: "blur(6px)",
//           backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
//           position: "sticky",
//           left: {
//             lg: `${SIDE_NAV_WIDTH}px`,
//           },
//           top: 0,
//           width: {
//             lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
//           },
//           zIndex: (theme) => theme.zIndex.appBar,
//         }}
//       >
//         <Stack
//           alignItems="center"
//           direction="row"
//           justifyContent="space-between"
//           spacing={2}
//           sx={{
//             minHeight: TOP_NAV_HEIGHT,
//             px: 2,
//           }}
//         >
//           <Stack alignItems="center" direction="row" spacing={2}>
//             {!lgUp && (
//               <IconButton onClick={onNavOpen}>
//                 <SvgIcon fontSize="small">
//                   <Bars3Icon />
//                 </SvgIcon>
//               </IconButton>
//             )}
//             <Tooltip title="Search">
//               <IconButton onClick={handleSearchIconClick}>
//                 <SvgIcon fontSize="small">
//                   <MagnifyingGlassIcon />
//                 </SvgIcon>
//               </IconButton>
//             </Tooltip>
//             {isSearchBoxVisible && <SearchBox />}
//           </Stack>
//           <Stack alignItems="center" direction="row" spacing={2}>
//             <Tooltip title="Contacts">
//               <IconButton onClick={handleContactsIconClick}>
//                 <SvgIcon fontSize="small">
//                   <UsersIcon />
//                 </SvgIcon>
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Notifications">
//               <IconButton onClick={handleNotificationIconClick}>
//                 <Badge badgeContent={4} color="success" variant="dot">
//                   <SvgIcon fontSize="small">
//                     <BellIcon />
//                   </SvgIcon>
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             <Avatar
//               onClick={accountPopover.handleOpen}
//               ref={accountPopover.anchorRef}
//               sx={{
//                 cursor: "pointer",
//                 height: 40,
//                 width: 40,
//               }}
//               src="/assets/avatars/avatar-anika-visser.png"
//             />
//           </Stack>
//         </Stack>
//       </Box>
//       <AccountPopover
//         anchorEl={accountPopover.anchorRef.current}
//         open={accountPopover.open}
//         onClose={accountPopover.handleClose}
//       />
//       <Popover
//         open={isContactsPopoverOpen}
//         anchorEl={anchorEl}
//         onClose={() => setIsContactsPopoverOpen(false)}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <UserList />
//       </Popover>
//       <Popover
//         open={isNotificationPopoverOpen}
//         anchorEl={notificationAnchorEl}
//         onClose={() => setIsNotificationPopoverOpen(false)}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <NotificationPopoverContent />
//       </Popover>
//       {isSearchBoxVisible && (
//         <div
//           onClick={handleOutsideClick}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 999,
//           }}
//         />
//       )}
//     </>
//   );
// };

// TopNav.propTypes = {
//   onNavOpen: PropTypes.func,
// };

// // Export the TopNav component as the default export
// export default TopNav;



// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import BellIcon from '@heroicons/react/24/solid/BellIcon';
// // import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
// // import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
// // import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
// // import {
// //   Avatar,
// //   Badge,
// //   Box,
// //   IconButton,
// //   Stack,
// //   SvgIcon,
// //   Tooltip,
// //   useMediaQuery
// // } from '@mui/material';
// // import { alpha } from '@mui/material/styles';
// // import { usePopover } from 'src/hooks/use-popover';
// // import { AccountPopover } from './account-popover';
// // import NotificationsPopover from './NotificationsPopover';
// // import { Link as RouterLink } from 'react-router-dom';


// // const SIDE_NAV_WIDTH = 280;
// // const TOP_NAV_HEIGHT = 64;

// // export const TopNav = (props) => {
// //   const { onNavOpen } = props;
// //   const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
// //   const accountPopover = usePopover();

// //   const [notificationsOpen, setNotificationsOpen] = useState(false);

// //   const handleNotificationsOpen = () => {
// //     setNotificationsOpen(true);
// //     accountPopover.handleClose();
// //   };

// //   return (
// //     <>
// //       <Box
// //         component="header"
// //         sx={{
// //           backdropFilter: 'blur(6px)',
// //           backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
// //           position: 'sticky',
// //           left: {
// //             lg: `${SIDE_NAV_WIDTH}px`
// //           },
// //           top: 0,
// //           width: {
// //             lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
// //           },
// //           zIndex: (theme) => theme.zIndex.appBar
// //         }}
// //       >
// //         <Stack
// //           alignItems="center"
// //           direction="row"
// //           justifyContent="space-between"
// //           spacing={2}
// //           sx={{
// //             minHeight: TOP_NAV_HEIGHT,
// //             px: 2
// //           }}
// //         >
// //           <Stack
// //             alignItems="center"
// //             direction="row"
// //             spacing={2}
// //           >
// //             {!lgUp && (
// //               <IconButton onClick={onNavOpen}>
// //                 <SvgIcon fontSize="small">
// //                   <Bars3Icon />
// //                 </SvgIcon>
// //               </IconButton>
// //             )}
// //             <Tooltip title="Search">
// //               <IconButton>
// //                 <SvgIcon fontSize="small">
// //                   <MagnifyingGlassIcon />
// //                 </SvgIcon>
// //               </IconButton>
// //             </Tooltip>
// //           </Stack>
// //           <Stack
// //             alignItems="center"
// //             direction="row"
// //             spacing={2}
// //           >
// //             <Tooltip title="Contacts">
// //               <IconButton>
// //                 <SvgIcon fontSize="small">
// //                   <UsersIcon />
// //                 </SvgIcon>
// //               </IconButton>
// //             </Tooltip>
// //             <Tooltip title="Notifications">
// //               <IconButton onClick={handleNotificationsOpen}>
// //                 <Badge
// //                   badgeContent={4}
// //                   color="success"
// //                   variant="dot"
// //                 >
// //                   <SvgIcon fontSize="small">
// //                     <BellIcon />
// //                   </SvgIcon>
// //                 </Badge>
// //               </IconButton>
// //             </Tooltip>
// //             <Avatar
// //               onClick={accountPopover.handleOpen}
// //               ref={accountPopover.anchorRef}
// //               sx={{
// //                 cursor: 'pointer',
// //                 height: 40,
// //                 width: 40
// //               }}
// //               src="/assets/avatars/avatar-anika-visser.png"
// //             />
// //           </Stack>
// //         </Stack>
// //       </Box>
// //       <NotificationsPopover
// //   notifications=""
// //   anchorEl={accountPopover.anchorRef.current}
// //   open={notificationsOpen}
// //   onClose={() => setNotificationsOpen(false)}
// // />

// //       <AccountPopover
// //         anchorEl={accountPopover.anchorRef.current}
// //         open={accountPopover.open}
// //         onClose={accountPopover.handleClose}
// //       />
// //     </>
// //   );
// // };

// // TopNav.propTypes = {
// //   onNavOpen: PropTypes.func
// // };
