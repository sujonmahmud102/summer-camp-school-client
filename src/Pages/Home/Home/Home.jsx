import { Helmet } from "react-helmet";
import HomeSlider from "../HomeSlider/HomeSlider";
import PolularClasses from "../PopularClasses/PolularClasses";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import PopularInstrutor from "./PopularInstructor/PopularInstrutor";


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | Champion Sports School</title>
            </Helmet>
            <HomeSlider></HomeSlider>
            <PolularClasses></PolularClasses>
            <WhyChooseUs></WhyChooseUs>
            <PopularInstrutor></PopularInstrutor>
        </>
    );
};

export default Home;