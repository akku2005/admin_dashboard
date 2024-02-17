import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import WidgetsSharpIcon from '@mui/icons-material/WidgetsSharp';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';  // Added missing import
import { TablePagination } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import SvgIcon from '@mui/material/SvgIcon';
import DownloadIconMui from '@mui/icons-material/Download'; // Changed alias to avoid conflict
import DeleteIconMui from '@mui/icons-material/Delete'; // Changed alias to avoid conflict

const DownloadIcon = () => <span>Download Icon</span>;
const DeleteIcon = () => <span>Delete Icon</span>;

const FileUpload = () => {
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('desc');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadArea, setShowUploadArea] = useState(false);

  const handleViewChange = (event, newView) => {
    if (newView) {
      setView(newView);
    }
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleUploadClick = () => {
    setShowUploadArea(true);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleRemoveAllFiles = () => {
    setSelectedFiles([]);
  };

  const containerStyle = {
    boxSizing: 'border-box',
    color: 'rgb(237, 242, 247)',
    border: '1px solid rgb(45, 55, 72)',
    backgroundImage: 'none',
    overflow: 'hidden',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: 'background-color 0s ease 0s, box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  };

  const avatarGroupStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '-8px',
  };

  const avatarStyle = {
    marginLeft: '-8px',
  };

  return (
    <>
      <Box className="css-jddaxh" display="flex" justifyContent="space-between" margin="25px">
        <div>
          <Typography variant="h4" className="MuiTypography-root MuiTypography-h4 css-2ooo8s">
            File Manager
          </Typography>
        </div>
        <Stack className="css-4u2is6">
          <Button variant="contained" color="primary" size="medium" onClick={handleUploadClick}>
            Upload
          </Button>
        </Stack>
      </Box>
      {/* for search bar */}
      <Box margin="0 50px" marginTop="10px">
        <Stack className="css-4u2is6" direction="row" spacing={2} alignItems="center">
          <TextField
            label="Search"
            style={{ width: '80%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view selection"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <WidgetsSharpIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListSharpIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <Select
              native
              value={sort}
              onChange={handleSortChange}
              label="Sort By"
              inputProps={{
                name: 'sort',
                id: 'sort-by',
              }}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      {showUploadArea && (
        <Paper elevation={3} className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiCard-root css-o81zgk">
          <Stack className="css-jyt0o7">
            <Typography variant="h6" className="MuiTypography-root MuiTypography-h6 css-u5c54l">
              Upload Files
            </Typography>
            <div className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeMedium css-1wxn3v1">
              <IconButton>
                <ListSharpIcon />
              </IconButton>
            </div>
          </Stack>
          <div className="MuiDialogContent-root css-1ty026z">
            <div>
              <div className="MuiBox-root css-cmvn1h" role="presentation" tabIndex="0">
                <input accept="" multiple="" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                <Stack className="MuiStack-root css-4u2is6">
                  {/* File Upload Area */}
                  {selectedFiles.map((file, index) => (
                    <AvatarGroup key={index} max={2} style={avatarGroupStyle}>
                      <Avatar alt={file.name} src="#">
                        <ListSharpIcon />
                      </Avatar>
                      <div className="MuiStack-root css-1qvrhbk">
                        <Typography variant="h6" className="MuiTypography-root MuiTypography-h6 css-1rb0bry">
                          {file.name}
                        </Typography>
                        <Typography variant="body2" className="MuiTypography-root MuiTypography-body2 css-uu6788">
                          {(file.size / 1024).toFixed(2)} KB
                        </Typography>
                      </div>
                      <div className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium css-19ybbqy">
                        <IconButton tabIndex="0" type="button" aria-label="Remove" onClick={() => handleRemoveFile(index)}>
                          <ListSharpIcon />
                        </IconButton>
                      </div>
                    </AvatarGroup>
                  ))}
                </Stack>
                <Stack className="MuiStack-root css-56n4uz">
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-colorInherit MuiButton-root MuiButton-text MuiButton-textInherit MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-colorInherit css-1lgejpu"
                    tabIndex="0"
                    type="button"
                    onClick={handleRemoveAllFiles}
                  >
                    Remove All
                  </button>
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall css-13x5u9o"
                    tabIndex="0"
                    type="button"
                  >
                    Upload
                  </button>
                </Stack>
              </div>
            </div>
          </div>
        </Paper>
      )}
      <Paper>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>File</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Uploaded By</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Sample Row */}
                  <TableRow key={1}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar alt="File Icon" src="/assets/icons/icon-png.svg" />
                        <Typography variant="subtitle2" sx={{ marginLeft: 1 }}>
                          hybrid_vw-2023.png
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>422.1 MB</TableCell>
                    <TableCell>
                      <AvatarGroup max={2} style={avatarGroupStyle}>
                        <Avatar src="/assets/avatars/avatar-anika-visser.png" style={avatarStyle} />
                        <Avatar src="/assets/avatars/avatar-another-avatar.png" style={avatarStyle} />
                        {/* Add more avatars as needed */}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell>Jan 21, 2024</TableCell>
                    <TableCell>
                      <IconButton>
                        <SvgIcon component={DownloadIconMui} />
                      </IconButton>
                      <IconButton>
                        <SvgIcon component={DeleteIconMui} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {/* Repeat the above structure for each row */}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Paper>
    
      {/* Repeat similar Paper component structure for other items */}
      <div className="MuiTablePagination-root css-12pctm1">
        <TablePagination
          rowsPerPageOptions={[9, 15, 25]}
          component="div"
          count={25}
          page={0}
          rowsPerPage={9}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </div>
    </>
  );
};

export default FileUpload;
