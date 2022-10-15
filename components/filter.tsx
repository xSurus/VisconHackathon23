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
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import {Grid} from "@mui/material";
import axios from 'axios';

interface DialogSelectProps {
    categories: FilterElement[],
    setCategories: React.Dispatch<React.SetStateAction<FilterElement[]>>,
}

export type FilterElement = {
    cat: string,
    checked: boolean
}

export default function DialogSelect(props: DialogSelectProps) {

    const {categories, setCategories} = props;

    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleChange = (event: SelectChangeEvent<typeof categories>) => {
        const {
            target: {value},
        } = event;
        //@ts-ignore
        let changed = value.pop();
        //@ts-ignore
        let updated = value.map(x => {
            if (x.cat === changed) {
                return {cat: x.cat, checked: !x.checked};
            } else {
                return {cat: x.cat, checked: x.checked};
            }
        })
        //onsole.log(changed);
        //console.log(value);
        setCategories(updated);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <Grid>
            <Grid item>
                <Button style={{color: 'black', backgroundColor: 'rgba(0,0,0,0.15)', fontSize: '1em'}}
                        onClick={handleClickOpen}><FilterAltIcon/> Filter</Button>
            </Grid>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{left: 10, top: 50}}>
                <Grid container justifyContent={'center'} alignItems={'center'} direction={'column'} sx={{marginTop: '2em', marginBottom: '2em'}}>
                    <DialogTitle>Filter by (multichoice)</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel htmlFor="demo-dialog-native" sx={{
                                    '& .MuiInputBase-input:focus': {
                                        backgroundColor: 'white',
                                    },
                                }}>Categories</InputLabel>
                                <Select
                                    labelId="categories"
                                    id="categories"
                                    multiple
                                    value={props.categories}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag"/>}
                                    renderValue={(selected) => selected.filter(x => x.checked).map(x => x.cat).join(', ')}
                                >
                                    {props.categories?.map((category) => (
                                        <MenuItem key={category.cat} value={category.cat}>
                                            <Checkbox checked={category.checked}/>
                                            <ListItemText primary={category.cat}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </Grid>
    );
}