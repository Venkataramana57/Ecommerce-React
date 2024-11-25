import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({product}) => {
  return(
    <Container>
      {product && !editable && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          <Card sx={{ maxWidth: 800 }}>
            <CardMedia
              component="img"
              alt={product.title}
              height="300"
              image={'https://via.placeholder.com/800x300'}
              sx={{ borderRadius: 1 }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Price: ${product.price.$numberDecimal}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Quantity Available: {product.quantity}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  )
}

export default Product;