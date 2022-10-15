import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const allCategories = [
    'Pog',
    'PogPog'
  ];

  return (
    <div>
      <Button onClick={handleClickOpen}><FilterAltIcon /> Filter</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Set Filters</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
              <Select
                 labelId="demo-multiple-checkbox-label"
                 id="demo-multiple-checkbox"
                 multiple
                 value={personName}
                 onChange={handleChange}
                 input={<OutlinedInput label="Tag" />}
                 renderValue={(selected) => selected.join(', ')}
                 MenuProps={MenuProps} />}
              >
                {categories.map((category) => (
                <MenuItem key={category} value={category}>
                <Checkbox checked={categories.indexOf(category) > -1} />
                <ListItemText primary={category} />
            </MenuItem>
          ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}