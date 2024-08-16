import { Rating } from '@smastrom/react-rating';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '@smastrom/react-rating/style.css';


const ProductCard = ({shoe}) => {
    return (
        <div className=" relative flex flex-col items-center justify-center w-full max-w-sm p-1  mx-auto">
        <div 
          className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" 
          style={{ backgroundImage: `url(${shoe?.image_url})` }}
        ></div>
  
        <div className="w-56 -mt-14 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            Title
          </h3>
  
          <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span className="font-bold text-gray-800 dark:text-gray-200">$12</span>
             <Link to={`/shoeDetails/${shoe?._id}`} >
             <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
              Details
            </button>
             </Link>
          </div>
          <div className='flex justify-center m-1'>
             <Rating style={{ maxWidth: 150, color: 'red' }} value={3} readOnly />
         </div>
        </div>
        <div className='text-[12px] md:text-[16px] absolute top-3 right-3'>
            Added Date
        </div>
        <div className=' text-[10px] md:text-[12px] absolute top-3 left-3'>
           Category
        </div>
      </div>
    );
};
ProductCard.propTypes = {
    
    shoe: PropTypes.object.isRequired,
};

export default ProductCard;