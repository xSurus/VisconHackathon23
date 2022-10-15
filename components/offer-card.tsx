import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';

interface CompanyVoucherProps {
    companyName: string,
    voucherPrice: number,
    companyImageUrl: string
}

const OfferCard = (props: CompanyVoucherProps) => {

    const {companyName, voucherPrice, companyImageUrl} = props;

    return (
        <Card elevation={3}>
            <CardActionArea href="https://google.com">
                <CardMedia
                    component="img"
                    width="100%"
                    image={companyImageUrl}
                    alt={companyName}
                    sx={{maxHeight: '8em'}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{}}>
                        {`${companyName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed est finibus eros iaculis
                        pellentesque.
                        Nulla facilisi. Quisque a quam ac nisi tristique laoreet. Aliquam eget eros vitae turpis
                        sagittis rutrum vitae et justo.
                        Morbi et nisl euismod, dignissim urna vel, rhoncus magna. Curabitur justo neque, cursus eu lorem
                        id, vehicula sagittis ligula.
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${voucherPrice}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default OfferCard;