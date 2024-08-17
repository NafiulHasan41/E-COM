import { Rating } from '@smastrom/react-rating';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '@smastrom/react-rating/style.css';


const ProductCard = ({product}) => {
  
    return (
        <div className=" relative flex flex-col items-center justify-center w-full max-w-sm p- mx-auto">
        <div 
          className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" 
          style={{ backgroundImage: `url(${product?.productImage})` }}
        ></div>
  
        <div className="w-56 -mt-14 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            {product?.productName}
          </h3>
  
          <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span className="font-bold text-gray-800 dark:text-gray-200">${product?.price}</span>
             <Link  >
             <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
              Details
            </button>
             </Link>
          </div>
          <div className='flex justify-center m-1'>
             <Rating style={{ maxWidth: 150, color: 'red' }} value={product?.ratings} readOnly />
         </div>
        </div>
        <div className='text-white text-[12px] md:text-[16px] absolute top-3 right-3 bg-yellow-400/60 p-1 rounded-md'>
            {product?.productCreationDate}
        </div>
        <div className=' text-white text-[10px] md:text-[12px] absolute top-3 left-3 bg-gray-500/90 p-1 rounded-md'>
           {product?.category}
        </div>
      </div>
    );
};
ProductCard.propTypes = {
    
  product: PropTypes.object.isRequired,
};

export default ProductCard;