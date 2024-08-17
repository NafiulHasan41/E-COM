import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import MultiRangeSlider from "multi-range-slider-react";
import { HiMenuAlt3 } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import ProductCard from "../../Components/ProductCard";
import axios from "axios";
import Swal from "sweetalert2";




const Home = () => {


  
    


    // for mobile and tablet filter 
    const [dropDown, setDropDown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropDown(false);
            }
        };

        if (dropDown) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [dropDown]);










 // for pagination
    
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
   const [count, setCount] = useState(0);

//     for search
const [search, setSearch] = useState('');
const [searchText, setSearchText] = useState('');

const handleSearch = e => {
    e.preventDefault()

    setSearch(searchText)
  }

//   price range 

const [minValue, set_minValue] = useState(0);
const [maxValue, set_maxValue] = useState(10000);
const handleInput = (e) => {
	set_minValue(e.minValue);
	set_maxValue(e.maxValue);
};



//     for BrandName
      const [brand , setBrand] = useState('');
//   for category
      const [ category, setCategory] = useState('')

   

    //  for sorting 
    const [sort, setSort] = useState('')






    // custom sidebar

    const customSidebar = () => {
       return <>
           {/* whole sidebar */}

           <div className=" w-[200px] mx-auto  p-2 space-y-3">

            {/* Price range */}
            <div>
            <span className="text-black font-semibold">Price Range</span>
            <MultiRangeSlider
			min={0}
			max={10000}
			step={1}
			ruler={false}
			label={true}
			preventWheel={false}
			minValue={minValue}
			maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
			}}
		/>
            </div>



            {/* Category Name */}
            <div className=" text-white border-b-2 pb-2 border-black ">
                                        {/* if problem happen for this class in MUI then I will change it */}
                                        <FormControl className=" " >
                                            <FormLabel id="demo-radio-buttons-group-label"><span className="text-black font-semibold">Category Name</span></FormLabel>
                                            <RadioGroup value={category} onChange={e=> {
                                                setCategory(e.target.value)
                                                setCurrentPage(1)
                                                }}
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group" class=" grid grid-cols-1 text-black font-semibold  ">
                                                <FormControlLabel value='' control={<Radio />} label="None" />
                                                <FormControlLabel value='Computers' control={<Radio />} label="Computers" />
                                                <FormControlLabel value='Phones' control={<Radio />} label="Phones" />
                                                <FormControlLabel value='Electronics' control={<Radio />} label="Electronics" />
                                                <FormControlLabel value='Wearables' control={<Radio />} label="Wearables" />
                                                <FormControlLabel value='Home Entertainment' control={<Radio />} label="Home Entertainment" />
                                               
                                               
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
              {/* Brand Name */}
              <div className=" text-white  ">
                                        {/* if problem happen for this class in MUI then I will change it */}
                                        <FormControl className=" " >
                                            <FormLabel id="demo-radio-buttons-group-label"><span className="text-black font-semibold">Brand Name</span></FormLabel>
                                            <RadioGroup value={brand} onChange={e=> {
                                                setBrand(e.target.value)
                                                setCurrentPage(1)
                                                }}
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group" class=" grid grid-cols-1 text-black font-semibold  ">
                                                <FormControlLabel value='' control={<Radio />} label="None" />
                                                <FormControlLabel value='Apple' control={<Radio />} label="Apple" />
                                                <FormControlLabel value='Alienware' control={<Radio />} label="Alienware" />
                                                <FormControlLabel value='Nike' control={<Radio />} label="Nike" />
                                                <FormControlLabel value='Samsung' control={<Radio />} label="Samsung" />
                                                <FormControlLabel value='Toyota' control={<Radio />} label="Toyota" />
                                               
                                            </RadioGroup>
                                        </FormControl>
                                    </div>

           </div>

        </>
    }

 

      // getting data from api 

      const [products, setProducts] = useState([]);
     
  
      // getting data
       useEffect(() => {
  
          const getData = async () => {
              try {
               
                  const { data } = await axios.get(
                      `http://localhost:4000/products?search=${search}&minPrice=${minValue}&maxPrice=${maxValue}&category=${category}&brand=${brand}&sort=${sort}&page=${currentPage}&limit=${itemsPerPage}`);
  
                      setProducts(data);
                    
                     
                      
              }
              catch (error) {
               
                  Swal.fire(error.message)
                 
              }
          }
          getData();
  
       },[search, minValue, maxValue, category, brand, sort, currentPage, itemsPerPage]);

    //    getting pagination size
     
      useEffect(() => {
        const getCount = async () => {
            try {
           
                const { data } = await axios.get(
                    `http://localhost:4000/products_count?search=${search}&minPrice=${minValue}&maxPrice=${maxValue}&category=${category}&brand=${brand}`);
                setCount(data.count);
                
            }
            catch (error) {
                Swal.fire(error.message)
                
            }
        }
        getCount();
      });




          //  handle pagination button

          const numberOfPages = Math.ceil(count / itemsPerPage)
          const pages = [...Array(numberOfPages).keys()].map(element => element + 1)
        
          const handlePaginationButton = value => {
           
            setCurrentPage(value)
          }
        


    return (
        <div className=""> 
        <Helmet>
        <title>E-COM : Home</title>
      </Helmet>

          <div className=" flex flex-col lg:flex-row lg:gap-2 h-screen bg-[#F2F4F8]" >

          <div className="  w-full  lg:w-[400px] bg-white ">
          <form onSubmit={handleSearch}>
              <div className=" flex justify-center my-3">
      <label className="input input-bordered flex items-center w-[250px]  gap-2">
          <input   onChange={e=> setSearchText(e.target.value)}
                                        value={searchText} type="text" className="grow " placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
          </svg>
      </label>
            </div>
          </form>
              <div className="hidden lg:block">
                {customSidebar()}
              </div>
           </div >
           <div className=" w-full   ">

           {/* sorting div */}
           <div className=" flex justify-between lg:justify-end bg-white rounded-xl m-2 lg:m-3">
                 
              <div onClick={() => setDropDown(true)} className="  lg:hidden p-2 flex items-center">
                Filter <div  className="h-7 w-7 md:h-10 md:w-10  flex items-center justify-center">
                        <HiMenuAlt3 />
                    </div>
              </div>
            <div className=" md:font-semibold p-2 flex gap-2 items-center"> Sort By:  <select onChange={e=> {
                                            setSort(e.target.value)
                                            setCurrentPage(1)
                                            }}
                                            value={sort}
                                            name='sort'
                                            id='sort'
                                            className='border  rounded-md text-black bg-gray-200 border-gray-300 '
                                            >
                                            <option value=''>Default</option>
                                            <option value='asc'>Price (Low &gt; High)</option>
                                            <option value='dsc'>Price (High &gt; Low)</option>
                                            <option value='new'>Newest First</option>
                                        </select></div>
           </div>

           {/* showing products and pagination */}
       <div>
           {/* for shoe all cart showing */}
           <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

               { 
                
                // showing cards
                 products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))
                
               }
               

           </div>

           {/* pagination */}
           <div className='flex justify-center mt-12 overflow-x-auto w-full'>
               {/* Previous Button */}
               <button disabled={currentPage===1} onClick={()=> handlePaginationButton(currentPage - 1)}
                   className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md
                   disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500
                   hover:text-white'
                   >
                   <div className='flex items-center -mx-1'>
                       <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 mx-1 rtl:-scale-x-100' fill='none'
                           viewBox='0 0 24 24' stroke='currentColor'>
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                               d='M7 16l-4-4m0 0l4-4m-4 4h18' />
                       </svg>

                       <span className='mx-1'>previous</span>
                   </div>
               </button>
               {/* Numbers */}
               {pages.map(btnNum => (
               <button onClick={()=> handlePaginationButton(btnNum)}
                   key={btnNum}
                   className={`hidden ${
                   currentPage === btnNum ? 'bg-[#a0c5c4] text-white' : ''
                   } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500
                   hover:text-white`}
                   >
                   {btnNum}
               </button>
               ))}
               {/* Next Button */}
               <button disabled={currentPage===numberOfPages} onClick={()=> handlePaginationButton(currentPage + 1)}
                   className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200
                   rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white
                   disabled:cursor-not-allowed disabled:text-gray-500'
                   >
                   <div className='flex items-center -mx-1'>
                       <span className='mx-1'>Next</span>

                       <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 mx-1 rtl:-scale-x-100' fill='none'
                           viewBox='0 0 24 24' stroke='currentColor'>
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                               d='M17 8l4 4m0 0l-4 4m4-4H3' />
                       </svg>
                   </div>
               </button>
           </div>
       </div>
           
           </div>

          </div>

          <>
                {dropDown && (
                    <div ref={dropdownRef} className="fixed top-0 right-0 z-40">
                        <div className="relative">
                            <div className="absolute top-0 right-0 overflow-y-auto h-screen bg-white pt-10">
                                {customSidebar()}
                                <div onClick={() => setDropDown(false)} className="absolute top-5 right-5 z-50">
                                    <ImCancelCircle className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
            
        </div>
        
    );
};

export default Home;