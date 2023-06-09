import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";


const HomeSlider = () => {
    return (
        <div>
            <Carousel
                infiniteLoop={true}
                emulateTouch={true}
                showStatus={false}
                showThumbs={false}
            >
                <div>
                    <div className="hero h-[600px]" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/group-kids-forest-by-bonfire-with-mushmellows_1303-9501.jpg?w=996&t=st=1686329568~exp=1686330168~hmac=09e5e2da01e27b88db8063fab35d10a8ff1722f7e6a0e207d5cb17c32aa74bde)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-lg">
                                <h1 className="mb-5 text-5xl font-bold uppercase">Unleash the Adventure!</h1>
                                <p>
                                    Join us for an unforgettable summer of outdoor exploration, creative workshops, and exciting games at our Kids Summer Camp.

                                    {/* todo add a button */}
                                    Enroll now!
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
                <div>
                    <div className="hero h-[600px]" style={{ backgroundImage: 'url(https://joinsportscamps.files.wordpress.com/2014/08/youth-summer-sports-camp-west-essex-county-nj.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-lg">
                                <h1 className="mb-5 text-5xl font-bold uppercase">Fun-filled Learning!</h1>
                                <p>
                                    Discover the joy of learning through hands-on experiments, art classes, and interactive storytelling at our Kids Summer Camp.

                                    {/* todo add a button */}
                                    Register today. !
                                </p>
                            </div>
                        </div>

                    </div>


                </div>
                <div>
                    <div className="hero h-[600px]" style={{ backgroundImage: 'url(https://kidsstoppress.com/wp-content/uploads/2021/09/1555495807.BestSportsSummerCampInIndia-Kidsstoppress-1.jpg)' }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-lg">
                                <h1 className="mb-5 text-5xl font-bold uppercase">Friendship and Laughter!</h1>
                                <p>
                                    Create lifelong friendships and share laughter-filled moments at our Kids Summer Camp. Secure your spot and embrace the summer of fun and friendship

                                    {/* todo add a button */}
                                    Register today. !
                                </p>
                            </div>
                        </div>

                    </div>


                </div>

            </Carousel>
        </div>
    );
};

export default HomeSlider;