import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextareaAutosize, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import Image from 'next/image';
import { Offer, Supplier } from "../../../util/schemas";
import { PostOffer } from "../../../services/api-requests";
import Filter from "../../../components/filter";
import {PostQuery} from "../../../pages/api/offer";


const CreateVoucher = () =>{
    const [offer, setValues] = React.useState<PostQuery>({
        supplier_id: 99,
	    name: "",
        description:"",
	    price: 0,
        stock:0,
	    categories: []
    })

    const [open, setOpen] = React.useState(false);
    const allCategories = [
        'Pog',
        'PogPog'
    ];

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleCategoryChange = (event: SelectChangeEvent<typeof offer.categories>) => {
        const {
            target: {value},
        } = event;
        setValues({...offer, ['categories']: typeof value === 'string' ? value.split(',') : value}
            
        );
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const [imagePath, setImagePath] = React.useState<string>("/public/brain.png");

    const handleChange = (prop: keyof PostQuery) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...offer, [prop]:event.target.value});
        console.log(offer);
    }

    

    const handleSubmit = () =>{
        if(offer.name===""){
            alert("please set a title");
        }else if(offer.description===""){
            alert("write a description");
        }else if(offer.price<0){
            alert("enter a non-negative price");

        }else{
            
            PostOffer(offer);
        }

    }

    return (
        
        <Box 
        sx={{m:5, ml:40, mr:40}}
      component="form"
      noValidate
      autoComplete="off"
    >
        <div style={{justifyContent:'space around'}}>
        <Stack direction='row' >
        {//<Image style={{margin:5}} height={80} width={60}  src="/public/static/brain.png"/>
        }
        
        <FormControl required sx={{ m: 2, width: '50ch' }} >
          <InputLabel> Title </InputLabel>
          <OutlinedInput
            defaultValue={"Title"}
            value={offer.name}
            label="Title"
            onChange = {handleChange('name')}

          />
        </FormControl>
        <Button style={{color: 'black', backgroundColor: 'rgba(0,0,0,0.15)', fontSize: '1em'}} onClick={handleClickOpen}> Categories</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select all applying categories</DialogTitle>
                <DialogContent>
                    
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel htmlFor="demo-dialog-native">Categories</InputLabel>
                            <Select
                                labelId="categories"
                                id="categories"
                                multiple
                                value={offer.categories}
                                onChange={handleCategoryChange}
                                input={<OutlinedInput label="categories"/>}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {allCategories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        <Checkbox checked={offer.categories.indexOf(category) > -1}/>
                                        <ListItemText primary={category}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            
        </Stack>
        

        <TextField required sx={{ m: 2}} 
        variant="outlined" 
        multiline 
        minRows={4} 
        maxRows={8} 
        value={offer.description}
        onChange={handleChange('description')}
        label="Description" 
        fullWidth
        aria-label="description" 
        placeholder='Description'/>
        
        
        <FormControl required sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Amount </InputLabel>
          <OutlinedInput
            value={offer.stock}
            label="Amount"
            onChange = {handleChange('stock')}
          />
        </FormControl>

        <FormControl required sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Price per Voucher </InputLabel>
          <OutlinedInput
            value={offer.price}
            endAdornment={<InputAdornment position="end">CHF</InputAdornment>}
            label="Price per Voucher"
            onChange = {handleChange('price')}
          />
        </FormControl>

        <Button sx={{m:3}} component="label">
            Upload image
            <input form="voucher" hidden accept="image/*"  type="file" />
        </Button>

        <Button onClick={handleSubmit} sx={{m:3}} variant="contained">
            Sumbmit
        </Button>

        </div>
      
    </Box>
    )
}

export default CreateVoucher;