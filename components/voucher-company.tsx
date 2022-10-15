import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import type { Voucher } from '../util/schemas';
import Home from '../pages';
type Props = {companyName : string, voucherPrice : number}

// const useStyles = makeStyles({
//   card: {
//     Width: 400,
//     maxHeight: 400,
//     margin: 10,
//     borderRadius: 10,
//   },
// })


const CompanyVoucher = (props : Props) =>  {

  return (
    <Card>
      <CardActionArea href="https://google.com">
        <CardMedia
          component="img"
          width="100%"
          image="/migros.svg.png"
          alt={props.companyName}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {`${props.companyName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed est finibus eros iaculis pellentesque. 
          Nulla facilisi. Quisque a quam ac nisi tristique laoreet. Aliquam eget eros vitae turpis sagittis rutrum vitae et justo. 
          Morbi et nisl euismod, dignissim urna vel, rhoncus magna. Curabitur justo neque, cursus eu lorem id, vehicula sagittis ligula. 
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${props.voucherPrice}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CompanyVoucher;