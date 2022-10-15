import { Button, InputLabel, OutlinedInput, TextareaAutosize, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import Image from 'next/image';
import { Offer, Supplier } from "../../../util/schemas";
import { PostOffer } from "../../../services/api-requests";


const CreateVoucher = () =>{
    const [offer, setValues] = React.useState<Offer>({
        id: 0,
	    name: "",
        description:"",
	    price_per_voucher: 0,
	    /** Can vanish in the future */
	    supplier: ({} as Supplier),
	    /** Can be empty of course, check */
	    categories: []
    })
    const [imagePath, setImagePath] = React.useState<string>("/public/brain.png");

    const handleChange = (prop: keyof Offer) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...offer, [prop]:event.target.value});
    }

    const handleSubmit = () =>{
        if(offer.name===""){
            alert("please set a title");
        }else if(offer.description===""){
            alert("write a description");
        }else if(offer.price_per_voucher<0){
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
        <Image style={{margin:5}} height={80} width={60}  src="/public/static/brain.png"/>

        <FormControl required sx={{ m: 2, width: '50ch' }} >
          <InputLabel> Title </InputLabel>
          <OutlinedInput
            defaultValue={"Title"}
            value={offer.name}
            label="Title"
            onChange = {handleChange('name')}

          />
        </FormControl>
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
        
        {/*
        <FormControl required sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Amount </InputLabel>
          <OutlinedInput
            value={offer.amount}
            label="Amount"
            onChange = {handleChange('amount')}
          />
        </FormControl>
    */}
        <FormControl required sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Price per Voucher </InputLabel>
          <OutlinedInput
            value={offer.price_per_voucher}
            endAdornment={<InputAdornment position="end">CHF</InputAdornment>}
            label="Price per Voucher"
            onChange = {handleChange('price_per_voucher')}
          />
        </FormControl>

        <Button sx={{m:3}} component="label">
            Upload image
            <input form="voucher" hidden accept="image/*"  type="file" />
        </Button>

        <Button type="submit" onClick={handleSubmit} sx={{m:3}} variant="contained">
            Sumbmit
        </Button>

        </div>
      
    </Box>
    )
}

export default CreateVoucher;