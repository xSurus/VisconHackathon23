import {  Grid, Paper, styled } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
const VoucherList = () => {


    return (
        <Grid container justifyContent={'center'}>
            {Array.from(Array(30)).map((_, index) => (
            <Grid item padding= {5} height={50} xs={2} sm={4} md={4} key={index}>
                <Item>{index}</Item>
            </Grid>
            ))}

            
        </Grid>

    )
}


export default VoucherList;