import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const FileUploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      file: null,
    },
    onSubmit: async (values) => {
      const { title, description, file } = values;

      if (!title.trim() || !description.trim()) {
        toast.error('Title and Description are required.', {
          position: 'top-center',
        });
        return;
      }

      if (file) {
        formik.setSubmitting(true);

        try {
          const formData = new FormData();
          formData.append('files', file);

          const response = await axios.post('http://localhost:8080/v1/upload/s3', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Log file details to the console
          // console.log('File details:', response.data);

          // Store only the file name in local storage
          localStorage.setItem('uploadedFileName', file.name);

          // Set success message and show a toast in the center of the screen
          toast.success('File uploaded successfully!', {
            position: 'top-center',
          });

          // Reset the form
          formik.resetForm();
        } catch (error) {
          console.error('Error uploading file:', error);

          // Set error message and show a toast in the center of the screen
          toast.error('Error uploading file. Please try again.', {
            position: 'top-center',
          });
        } finally {
          formik.setSubmitting(false);
        }
      }
    },
  });

  const handleFileDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    formik.setFieldValue('file', null);
  };

  const handleFileSelect = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('file', file);
    setSelectedFiles([...selectedFiles, file]);
  };

  const handleAddMoreFiles = () => {
    // Add logic to handle adding more files if needed
  };

  return (
    <Box
      style={{
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
        marginBottom: '10%',
      }}
    >
      <Typography variant="h4" gutterBottom>
        File Upload
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title :"
          fullWidth
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          margin="normal"
        />

        <TextField
          label="Description :"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          margin="normal"
        />

<div style={{ marginBottom: '20px' }}>
  <label>
    <input
      type="file"
      name="file"
      onChange={handleFileSelect}
      accept=".pdf, .doc, .docx, .jpeg"
      style={{ display: 'none' }}
    />
    <Button
      variant="outlined"
      component="span"
      style={{ marginBottom: '20px' }}
    >
      + Select File
    </Button>
  </label>
</div>

        {selectedFiles.map((file, index) => (
          <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <Typography>{file.name}</Typography>
            <IconButton
              color="secondary"
              onClick={() => handleFileDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!formik.values.file || formik.isSubmitting}
          style={{ marginBottom: '20px' }}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </form>

      {/* React-Toastify Container */}
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default FileUploadPage;



// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   IconButton,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useFormik } from 'formik';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// const FileUploadPage = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       files: [],
//     },
//     onSubmit: async (values) => {
//       const { title, description, files } = values;

//       if (!title.trim() || !description.trim() || files.length === 0) {
//         toast.error('Title, Description, and File are required.', {
//           position: 'top-center',
//         });
//         return;
//       }

//       formik.setSubmitting(true);

//       try {
//         const filePromises = files.map((file) => {
//           return toBase64(file).then((base64Data) => {
//             return {
//               name: file.name,
//               type: file.type,
//               data: base64Data,
//             };
//           });
//         });

//         const filesWithBase64Data = await Promise.all(filePromises);

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('files', JSON.stringify(filesWithBase64Data));

//         const response = await axios.post('http://localhost:8080/v1/upload/s3', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         console.log('File details:', response.data);

//         toast.success('Files uploaded successfully!', {
//           position: 'top-center',
//         });

//         formik.resetForm();
//       } catch (error) {
//         console.error('Error uploading files:', error);

//         toast.error('Error uploading files. Please try again.', {
//           position: 'top-center',
//         });
//       } finally {
//         formik.setSubmitting(false);
//       }
//     },
//   });

//   const handleFileDelete = (index) => {
//     const updatedFiles = [...selectedFiles];
//     updatedFiles.splice(index, 1);
//     formik.setFieldValue('files', updatedFiles);
//     setSelectedFiles(updatedFiles);
//   };

//   const handleFileSelect = (event) => {
//     const files = event.currentTarget.files;
//     const updatedFiles = [...selectedFiles, ...Array.from(files)];
//     formik.setFieldValue('files', updatedFiles);
//     setSelectedFiles(updatedFiles);
//   };

//   const toBase64 = (blob) => {
//     const reader = new FileReader();
//     return new Promise((res, rej) => {
//       reader.readAsDataURL(blob);
//       reader.onload = function () {
//         res(reader.result);
//       };
//     });
//   };

//   return (
//     <Box
//       style={{
//         marginLeft: '10%',
//         marginRight: '10%',
//         marginTop: '10%',
//         marginBottom: '10%',
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         File Upload
//       </Typography>

//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Title :"
//           fullWidth
//           name="title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           margin="normal"
//         />

//         <TextField
//           label="Description :"
//           fullWidth
//           multiline
//           rows={4}
//           name="description"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           margin="normal"
//         />

//         <div style={{ marginBottom: '20px' }}>
//           <label>
//             <input
//               type="file"
//               onChange={handleFileSelect}
//               accept=".pdf, .doc, .docx, .jpeg"
//               style={{ display: 'none' }}
//               multiple
//             />
//             <Button
//               variant="outlined"
//               component="span"
//               style={{ marginBottom: '20px' }}
//             >
//               + Select Files
//             </Button>
//           </label>
//         </div>

//         {selectedFiles.map((file, index) => (
//           <div
//             key={index}
//             style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
//           >
//             <Typography>{file.name}</Typography>
//             <IconButton
//               color="secondary"
//               onClick={() => handleFileDelete(index)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         ))}

//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           type="submit"
//           disabled={formik.isSubmitting}
//           style={{ marginBottom: '20px' }}
//         >
//           {formik.isSubmitting ? <CircularProgress size={24} /> : 'Upload'}
//         </Button>
//       </form>

//       {/* React-Toastify Container */}
//       <ToastContainer position="top-center" />
//     </Box>
//   );
// };

// export default FileUploadPage;






// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   IconButton,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useFormik } from 'formik';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// const FileUploadPage = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       files: [],
//     },
//     onSubmit: async (values) => {
//       const { title, description, files } = values;

//       if (!title.trim() || !description.trim() || files.length === 0) {
//         toast.error('Title, Description, and File are required.', {
//           position: 'top-center',
//         });
//         return;
//       }

//       formik.setSubmitting(true);

//       try {
//         const filePromises = files.map((file) => {
//           return toBase64(file).then((base64Data) => {
//             return {
//               name: file.name,
//               type: file.type,
//               data: base64Data,
//             };
//           });
//         });

//         const filesWithBase64Data = await Promise.all(filePromises);

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('files', JSON.stringify(filesWithBase64Data));

//         const response = await axios.post('http://localhost:8080/v1/upload/s3', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         console.log('File details:', response.data);

//         toast.success('Files uploaded successfully!', {
//           position: 'top-center',
//         });

//         formik.resetForm();
//       } catch (error) {
//         console.error('Error uploading files:', error);

//         toast.error('Error uploading files. Please try again.', {
//           position: 'top-center',
//         });
//       } finally {
//         formik.setSubmitting(false);
//       }
//     },
//   });

//   const handleFileDelete = (index) => {
//     const updatedFiles = [...selectedFiles];
//     updatedFiles.splice(index, 1);
//     formik.setFieldValue('files', updatedFiles);
//     setSelectedFiles(updatedFiles);
//   };

//   const handleFileSelect = (event) => {
//     const files = event.currentTarget.files;
//     const updatedFiles = [...selectedFiles, ...Array.from(files)];
//     formik.setFieldValue('files', updatedFiles);
//     setSelectedFiles(updatedFiles);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     const updatedFiles = [...selectedFiles, ...Array.from(files)];
//     formik.setFieldValue('files', updatedFiles);
//     setSelectedFiles(updatedFiles);
//   };

//   const toBase64 = (blob) => {
//     const reader = new FileReader();
//     return new Promise((res, rej) => {
//       reader.readAsDataURL(blob);
//       reader.onload = function () {
//         res(reader.result);
//       };
//     });
//   };

//   return (
//     <Box
//       style={{
//         marginLeft: '10%',
//         marginRight: '10%',
//         marginTop: '10%',
//         marginBottom: '10%',
//       }}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <Typography variant="h4" gutterBottom>
//         File Upload
//       </Typography>

//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Title :"
//           fullWidth
//           name="title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           margin="normal"
//         />

//         <TextField
//           label="Description :"
//           fullWidth
//           multiline
//           rows={4}
//           name="description"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           margin="normal"
//         />

//         <div style={{ marginBottom: '20px' }}>
//           <label>
//             <input
//               type="file"
//               onChange={handleFileSelect}
//               accept=".pdf, .doc, .docx, .jpeg"
//               style={{ display: 'none' }}
//               multiple
//             />
//             <Button
//               variant="outlined"
//               component="span"
//               style={{ marginBottom: '20px' }}
//             >
//               + Select Files
//             </Button>
//           </label>
//         </div>

//         {selectedFiles.map((file, index) => (
//           <div
//             key={index}
//             style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
//           >
//             <Typography>{file.name}</Typography>
//             <IconButton
//               color="secondary"
//               onClick={() => handleFileDelete(index)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </div>    
//         ))}

//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           type="submit"
//           disabled={formik.isSubmitting}
//           style={{ marginBottom: '20px' }}
//         >
//           {formik.isSubmitting ? <CircularProgress size={24} /> : 'Upload'}
//         </Button>
//       </form>

//       {/* React-Toastify Container */}
//       <ToastContainer position="top-center" />
//     </Box>
//   );
// };

// export default FileUploadPage;