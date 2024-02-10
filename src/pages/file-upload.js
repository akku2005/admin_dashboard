// pages/file-upload.js
import React from 'react';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FileUploadPage from 'src/pages/FileUploadPage.js';

const FileUpload = () => (
  <>
    <Head>
      <title>File Manager | Finteck Kit</title>
    </Head>
    <FileUploadPage />
  </>
);

FileUpload.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default FileUpload;
