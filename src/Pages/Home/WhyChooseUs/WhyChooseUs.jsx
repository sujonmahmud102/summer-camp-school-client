import { BiStopwatch, BiBulb, BiExclude } from "react-icons/bi";

const WhyChooseUs = () => {
    return (
        <div className='p-10 bg-base-200'>
            <h1 className="text-center text-5xl font-bold">Why Choose Us</h1>

            <div className='flex items-center justify-between gap-5 my-8'>

                <div className='border hover:border-blue-400 text-center w-2/5 h-80 p-8 rounded-md bg-white'>
                    <div className="flex justify-center text-primary text-6xl">
                        <BiStopwatch></BiStopwatch>
                    </div>
                    <h3 className='mb-3 text-2xl hover:text-primary'>Self Reliant Individuals</h3>
                    <p className='text-sm'>
                        Our talent search methods encompass a range of strategies, including scouting local and regional competitions, partnering with schools and sports clubs, and conducting talent identification camps. We actively engage with coaches, physical education teachers, and community leaders to identify individuals who demonstrate exceptional athletic skills and a passion for their chosen sport.
                    </p>
                </div>

                <div className='border hover:border-red-400 text-center w-2/5 h-80 p-8 rounded-md bg-white'>
                    <div className="flex justify-center text-error text-6xl">
                        <BiBulb></BiBulb>
                    </div>
                    <h3 className='mb-3 text-2xl hover:text-error'>Talent Search Methods</h3>
                    <p className='text-sm'>
                        At our sports summer camp, we believe in nurturing self-reliant individuals who are equipped with the skills and mindset to succeed both on and off the field. We understand the importance of instilling independence and self-sufficiency in our campers. Through engaging activities and empowering experiences, we encourage campers to take ownership of their learning, develop problem-solving abilities, and build confidence in their abilities.
                    </p>
                </div>


                <div className='border hover:border-green-400 text-center w-2/5 h-80 p-8 rounded-md bg-white'>
                    <div className="flex justify-center text-green-400 text-6xl">
                        <BiExclude></BiExclude>
                    </div>
                    <h3 className='mb-3 text-2xl hover:text-green-400'>Value Based Education</h3>
                    <p className='text-sm'>
                        Through a holistic approach, we integrate value-based education into every aspect of our program. Our experienced coaches and mentors serve as role models, demonstrating and teaching the importance of fair play, respect, and sportsmanship. We create a supportive and inclusive environment where campers learn to value diversity, empathy, and cooperation.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default WhyChooseUs;