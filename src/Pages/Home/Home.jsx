import { Helmet } from "react-helmet-async";
import ProductCard from "../../Components/ProductCard";


const Home = () => {
    return (
        <div>
        <Helmet>
        <title>E-COM : Home</title>
      </Helmet>

            This is the Home Page
            <ProductCard/>
        </div>
    );
};

export default Home;