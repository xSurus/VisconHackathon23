import { Button, InputLabel, OutlinedInput, TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/system";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';

interface State {
    amount: number;
    pricePerVoucher: number;
    title: string;
    minOrder: number;
    description: string;
  }

const CreateVoucher = () =>{
    const [values, setValues] = React.useState<State>({
        amount:0,
        pricePerVoucher:0,
        title:'',
        description:'',
        minOrder:0
    })
    const [error, setError] = React.useState<boolean>(false);

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]:event.target.value});
        if(prop==='minOrder'){
            if((values.minOrder >= 0) && (values.minOrder<=values.amount)){
                setError(true)
            }else{
                setError(false)
            }
        };

    }

    return (
        <Box
        sx={{m:5, ml:40, mr:40}}
      component="form"
      noValidate
      autoComplete="off"
    >
        <div style={{justifyContent:'space around'}}>
        <FormControl required sx={{ m: 2, width: '50ch' }} >
          <InputLabel> Title </InputLabel>
          <OutlinedInput
            defaultValue={"Title"}
            value={values.title}
            label="Title"
            onChange = {handleChange('title')}
          />
        </FormControl>

        <TextField required sx={{ m: 2}} 
        variant="outlined" 
        multiline 
        minRows={4} 
        maxRows={8} 
        label="Description" 
        fullWidth
        aria-label="description" 
        placeholder='Description'/>
        
        
        <FormControl required sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Amount </InputLabel>
          <OutlinedInput
            value={values.amount}
            label="Amount"
            onChange = {handleChange('amount')}
          />
        </FormControl>
        <FormControl required sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Price per Voucher </InputLabel>
          <OutlinedInput
            value={values.pricePerVoucher}
            endAdornment={<InputAdornment position="end">CHF</InputAdornment>}
            label="Price per Voucher"
            onChange = {handleChange('pricePerVoucher')}
          />
        </FormControl>
        <FormControl color={error?"error":"success"} sx={{ m: 2, width: '20ch' }} >
          <InputLabel> Minimum Order </InputLabel>
          <OutlinedInput
            defaultValue={0}
            value={values.minOrder}
            label="Minimum Order"
            onChange = {handleChange('minOrder')}
          />
        </FormControl>
        <Button sx={{m:3}} variant="outlined">
            Save as draft
        </Button>
        <Button sx={{m:3}} variant="contained">
            Sumbmit
        </Button>

        </div>
      
    </Box>
    )
}

export default CreateVoucher;