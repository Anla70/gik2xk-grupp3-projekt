/* import React from 'react';
import { IconButton } from '@mui/material';
import { ZoomInIcon } from '@mui/icons-material/ZoomIn';
//import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PropTypes from 'prop-types';
import ZoomedImage from '../components/ZoomedImage';
import Product from './ProductItemLarge';


function ImageModal() {
    const [isZoomed, setIsZoomed] = React.useState(false);
   

    const handleZoomIn = () => {
        setIsZoomed(true);
    };

    const handleZoomOut = () => {
        setIsZoomed(false);
    };

    
    return (
        <>
        
        {!isZoomed && (
            <div>
                <img src={Product.imageUrl} alt="Product" onClick={handleZoomIn} />
                <IconButton aria-label="Zoom In" component="ZoomInIcon" onClick={handleZoomIn}>
                    <ZoomInIcon />
                </IconButton>
            </div>
        )}

        {isZoomed && (
            <ZoomedImage imageUrl={Product.imageUrl} onClose={handleZoomOut} />
        )}
        </>

    );
}

ImageModal.PropTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired,
    // imageUrl: PropTypes.string,
  };

export default ImageModal; */
