import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import MultiRangeSlider from "multi-range-slider-react";



const Home = () => {
    
    // for pagination
    const [itemsPerPage, setItemsPerPage] = useState(9);
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
                                            <FormLabel id="demo-radio-buttons-group-label"><span className="text-black font-semibold">Brand Name</span></FormLabel>
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







    return (
        <div>
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
              <div className=" block lg:hidden p-2">
                Filter
              </div>
            <div className=" md:font-semibold p-2 flex gap-2"> Sort By:  <select onChange={e=> {
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
           
           </div>

          </div>
            
        </div>
    );
};

export default Home;