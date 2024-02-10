// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card, CardContent, CardActions, Stack, Typography, Button, Divider } from '@mui/material';
// import DoneIcon from '@mui/icons-material/Done';
// import {vg} from './overview/iconlyglasstick.png'

// export const OverviewBudget = ({ difference, positive = false, sx, value }) => (
//   <Card elevation={1} variant="outlined">
//     <Stack direction="row" alignItems="center" spacing={2} padding={2}>
//       <img src={vg} alt="Task Done Icon" width="48" />
//       <div>
//         <Typography variant="body2" color="textSecondary">Done Tasks</Typography>
//         <Typography variant="h4">{value}</Typography>
//       </div>
//     </Stack>
//     <Divider />
//     <CardActions>
//       <Button size="small" color="inherit" endIcon={<DoneIcon />} fullWidth>
//         See all tasks
//       </Button>
//     </CardActions>
//   </Card>
// );

// OverviewBudget.propTypes = {
//   difference: PropTypes.number,
//   positive: PropTypes.bool,
//   sx: PropTypes.object,
//   value: PropTypes.string.isRequired
// };




// // import PropTypes from 'prop-types';
// // import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
// // import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
// // import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
// // import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

// // export const OverviewBudget = (props) => {
// //   const { difference, positive = false, sx, value } = props;

// //   return (
// //     <Card sx={sx}>
// //       <CardContent>
// //         <Stack
// //           alignItems="flex-start"
// //           direction="row"
// //           justifyContent="space-between"
// //           spacing={3}
// //         >
// //           <Stack spacing={1}>
// //             <Typography
// //               color="text.secondary"
// //               variant="overline"
// //             >
// //               Task Done
// //             </Typography>
// //             <Typography variant="h4">
// //               {value}
// //             </Typography>
// //           </Stack>
// //           <Avatar
// //             sx={{
// //               backgroundColor: 'error.main',
// //               height: 56,
// //               width: 56
// //             }}
// //           >
// //             <SvgIcon>
// //               <CurrencyDollarIcon />
// //             </SvgIcon>
// //           </Avatar>
// //         </Stack>
// //         {difference && (
// //           <Stack
// //             alignItems="center"
// //             direction="row"
// //             spacing={2}
// //             sx={{ mt: 2 }}
// //           >
// //             <Stack
// //               alignItems="center"
// //               direction="row"
// //               spacing={0.5}
// //             >
// //               <SvgIcon
// //                 color={positive ? 'success' : 'error'}
// //                 fontSize="small"
// //               >
// //                 {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
// //               </SvgIcon>
// //               <Typography
// //                 color={positive ? 'success.main' : 'error.main'}
// //                 variant="body2"
// //               >
// //                 {difference}%
// //               </Typography>
// //             </Stack>
// //             <Typography
// //               color="text.secondary"
// //               variant="caption"
// //             >
// //               Since last month
// //             </Typography>
// //           </Stack>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // OverviewBudget.prototypes = {
// //   difference: PropTypes.number,
// //   positive: PropTypes.bool,
// //   sx: PropTypes.object,
// //   value: PropTypes.string.isRequired
// // };


import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewBudget = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Budget
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};