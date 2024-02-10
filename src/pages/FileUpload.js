import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      file: null,
    },
    onSubmit: async (values) => {
      const { title, description, file } = values;

      if (!title.trim() || !description.trim() || !file) {
        toast.error('Title, Description, and File are required.', {
          position: 'top-center',
        });
        return;
      }

      formik.setSubmitting(true);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/v1/upload/s3', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Log file details to the console
        // console.log('File details:', response.data);

        // Set success message and show a toast in the center of the screen
        toast.success('File uploaded successfully!', {
          position: 'top-center',
        });

        // Reset the form
        formik.resetForm();
        setSelectedFiles([]);
      } catch (error) {
        console.error('Error uploading file:', error);

        // Set error message and show a toast in the center of the screen
        toast.error('Error uploading file. Please try again.', {
          position: 'top-center',
        });
      } finally {
        formik.setSubmitting(false);
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
    setSelectedFiles([file]);
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

export default FileUpload;
