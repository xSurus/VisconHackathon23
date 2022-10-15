import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from '@emotion/styled'
import type { Voucher } from '../util/schemas';
import Home from '../pages';

type Props = {supplier : string  | undefined, price : number}


const OfferCard = (props : Props) =>  {
  const CompanyOffer = styled(Card)`
    width: 400,
    maxHeight: 400,
    margin: 10,
    borderRadius: 10,
  }
  `
  return (
    <CompanyOffer>
      <CardActionArea href="https://google.com">
        <CardMedia
          component="img"
          width="100%"
          image="/migros.svg.png"
          alt={props.supplier}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {`${props.price}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed est finibus eros iaculis pellentesque. 
          Nulla facilisi. Quisque a quam ac nisi tristique laoreet. Aliquam eget eros vitae turpis sagittis rutrum vitae et justo. 
          Morbi et nisl euismod, dignissim urna vel, rhoncus magna. Curabitur justo neque, cursus eu lorem id, vehicula sagittis ligula. 
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${props.price}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CompanyOffer>
  );
}
export default OfferCard;