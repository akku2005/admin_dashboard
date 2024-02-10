// import React from 'react';
// import Head from 'next/head';
// import { CacheProvider } from '@emotion/react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
// import { useNProgress } from 'src/hooks/use-nprogress';
// import 'simplebar-react/dist/simplebar.min.css';
// import FileUploader from 'src/pages/file-upload.js';
// import ForgotPasswordPage from 'src/pages/auth/reset-password.js';  // Correct import path
// import Mail from 'src/Mail';

// import { createTheme } from 'src/theme';
// import { createEmotionCache } from 'src/utils/create-emotion-cache';


// const SplashScreen = () => null;

// const clientSideEmotionCache = createEmotionCache();

// const App = (props) => {
//   const {
//     Component,
//     emotionCache = clientSideEmotionCache,
//     pageProps,
//     router
//   } = props;

//   useNProgress();

//   const getLayout = Component.getLayout ?? ((page) => page);

//   const theme = createTheme();

//   return (
//     <CacheProvider value={emotionCache}>
//       <Head>
//         <title>Finteck Kit</title>
//         <meta name="viewport" content="initial-scale=1, width=device-width" />
//       </Head>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <AuthProvider>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <AuthConsumer>
//               {(auth) => {
//                 if (auth.isLoading) {
//                   return <SplashScreen />;
//                 }

//                 return getLayout(
//                   router.pathname === '/file-upload' ? (
//                     <FileUploader
//                       onUpload={(file, name, description) => {
//                         /* handle upload */
//                       }}
//                     />
//                   ) : (
//                     router.pathname === '/auth/reset-password' ? (
//                       <ForgotPasswordPage />
//                     ) : (
//                       <Component {...pageProps} />
//                     )
//                   )
//                 );
//               }}
//             </AuthConsumer>
//           </ThemeProvider>
//         </AuthProvider>
//       </LocalizationProvider>
//     </CacheProvider>
//   );
// };

// export default App;




// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import { CacheProvider } from '@emotion/react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
// import { useNProgress } from 'src/hooks/use-nprogress';
// import 'simplebar-react/dist/simplebar.min.css';
// import FileUploader from 'src/pages/file-upload.js';
// import ForgotPasswordPage from 'src/pages/auth/reset-password.js';
// import FileManager from 'src/pages/FileManager/file-manager';
// import { createTheme } from 'src/theme';
// import { createEmotionCache } from 'src/utils/create-emotion-cache';
// import { DarkModeProvider } from 'src/pages/DarkModeContext.js';

// // Define a SplashScreen component
// const SplashScreen = () => null;

// // Create Emotion cache for client-side rendering
// const clientSideEmotionCache = createEmotionCache();

// // Define the main App component
// const App = (props) => {
//   const {
//     Component,
//     emotionCache = clientSideEmotionCache,
//     pageProps,
//     router
//   } = props;

//   // Custom hook for managing progress
//   useNProgress();

//   // Determine the layout for the page
//   const getLayout = Component.getLayout ?? ((page) => page);

//   // Create MUI theme
//   const theme = createTheme();

//   // State for dark mode
//   const [darkMode, setDarkMode] = useState(false);

//   // Effect to update theme when darkMode changes
//   useEffect(() => {
//     // Create theme based on dark mode state
//     const updatedTheme = createTheme({ darkMode });

//     // Apply the updated theme directly to the body
//     document.body.style.backgroundColor = updatedTheme.palette.background.default;
//     document.body.style.color = updatedTheme.palette.text.primary;
//   }, [darkMode]);

//   return (
//     <DarkModeProvider>
//       <CacheProvider value={emotionCache}>
//         <Head>
//           <title>Finteck Kit</title>
//           <meta name="viewport" content="initial-scale=1, width=device-width" />
//         </Head>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <AuthProvider>
//             <ThemeProvider theme={theme}>
//               {/* Apply global CSS baseline */}
//               <CssBaseline />
//               <AuthConsumer>
//                 {(auth) => {
//                   if (auth.isLoading) {
//                     return <SplashScreen />;
//                   }

//                   return (
//                     <div>
//                       {getLayout(
//                         router.pathname === '/file-upload' ? (
//                           <FileUploader
//                             onUpload={(file, name, description) => {
//                               /* handle upload */
//                             }}
//                           />
//                         ) : (
//                           router.pathname === '/auth/reset-password' ? (
//                             <ForgotPasswordPage />
//                           ) : (
//                             router.pathname === '/file-manager' ? (
//                               <FileManager />
//                             ) : (
//                               <Component {...pageProps} />
//                             )
//                           )
//                         )
//                       )}
//                     </div>
//                   );
//                 }}
//               </AuthConsumer>
//             </ThemeProvider>
//           </AuthProvider>
//         </LocalizationProvider>
//       </CacheProvider>
//     </DarkModeProvider>
//   );
// };

// // Export the App component as the default export
// export default App;


import React from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import Mail from 'src/Mail/index';  // Import the Mail component
import FileUploader from 'src/pages/file-upload.js';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';

const SplashScreen = () => null;

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router
  } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Finteck Kit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthConsumer>
              {(auth) => {
                if (auth.isLoading) {
                  return <SplashScreen />;
                }

                // Check if the current route is the one where you want to display the Mail component
                const isMailRoute = router.pathname === '/mail';

                return (
                  <div>
                    {getLayout(
                      isMailRoute ? (
                        <Mail />
                      ) : (
                        router.pathname === '/file-upload' ? (
                          <FileUploader
                            onUpload={(file, name, description) => {
                              /* handle upload */
                            }}
                          />
                        ) : (
                          <Component {...pageProps} />
                        )
                      )
                    )}
                  </div>
                );
              }}
            </AuthConsumer>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
