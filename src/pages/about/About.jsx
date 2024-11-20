import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import PortraitTwoFemales from '../../assets/images/ourStoryImages/portrait-two-african-females-holding-shopping-bags.png'
import "../about/About.css"
import LocalConvenienceStoreRoundedIcon from '@mui/icons-material/LocalConvenienceStoreRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import TomCruise from "../../assets/images/ourStoryImages/TomCruise.png"
import EmmaWatson from "../../assets/images/ourStoryImages/EmmaWatson.png"
import WillSmith from "../../assets/images/ourStoryImages/WillSmith.png"
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Carousel from 'react-bootstrap/Carousel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Footer from '../../components/footer/Footer';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import TopBar from '../../components/topbar/TopBar';

function About() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='about-container'>
            {/* Sale and language selector */}
            <TopBar/>

            {/* Navbar */}
            <Navbar />
            <hr />

            {/* Our story details */}
            <div className='our-story-container'>
                <div className='our-story-content'>
                    <h3 className='our-story-title'>Our Story</h3>
                    <p className='our-story-description'>
                        Launced in 2015, Exclusive is South Asia’s premier online shopping
                        makterplace with an active presense in Bangladesh. Supported
                        by wide range of tailored marketing, data and service solutions,
                        Exclusive has 10,500 sallers and 300 brands and serves 3
                        millioons customers across the region.
                    </p>
                    <br />

                    <p className='our-story-description'>
                        Exclusive has more than 1 Million products to offer, growing at a
                        very fast. Exclusive offers a diverse assotment in categories
                        ranging  from consumer.
                    </p>
                </div>

                <div className='our-story-image-container'>
                    <img src={PortraitTwoFemales} alt="PortraitTwoFemales" className='our-story-image' />
                </div>
            </div>

            {/* Statistics */}
            <div className='statistics-container'>
                <div className='statistic-item'>
                    <LocalConvenienceStoreRoundedIcon />
                    <h3>10.5k</h3>
                    <p>Sellers active our site</p>
                </div>

                <div className='statistic-item'>
                    <MonetizationOnRoundedIcon />
                    <h3>33k</h3>
                    <p>Monthly Produduct Sale</p>
                </div>

                <div className='statistic-item'>
                    <LocalMallRoundedIcon />
                    <h3>45.5k</h3>
                    <p>Customer active in our site</p>
                </div>

                <div className='statistic-item'>
                    <ShowChartRoundedIcon />
                    <h3>25k</h3>
                    <p>Annual gross sale in our site</p>
                </div>
            </div>

            {/* Team Members */}
            <Carousel activeIndex={index} indicators={true} controls={false} onSelect={handleSelect} className='team-members-carousel-container' interval={3000}>
                {/* First Slide */}
                <Carousel.Item>
                    <div className='team-members-container'>
                        <div className='team-member'>
                            <img src={TomCruise} alt="Tom Cruise" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Tom Cruise</h3>
                                <p>Founder & Chairman</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                        <div className='team-member'>
                            <img src={EmmaWatson} alt="Emma Watson" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Emma Watson</h3>
                                <p>Managing Director</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                        <div className='team-member'>
                            <img src={WillSmith} alt="Will Smith" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Will Smith</h3>
                                <p>Product Designer</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                {/* Second Slide */}
                <Carousel.Item>
                    <div className='team-members-container'>
                        <div className='team-member'>
                            <img src={TomCruise} alt="Tom Cruise" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Tom Cruise</h3>
                                <p>Founder & Chairman</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                        <div className='team-member'>
                            <img src={EmmaWatson} alt="Emma Watson" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Emma Watson</h3>
                                <p>Managing Director</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                        <div className='team-member'>
                            <img src={WillSmith} alt="Will Smith" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Will Smith</h3>
                                <p>Product Designer</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>

                {/* Third Slide */}
                <Carousel.Item>
                    <div className='team-members-container'>
                        <div className='team-member'>
                            <img src={TomCruise} alt="Tom Cruise" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Tom Cruise</h3>
                                <p>Founder & Chairman</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                        <div className='team-member'>
                            <img src={EmmaWatson} alt="Emma Watson" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Emma Watson</h3>
                                <p>Managing Director</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                        <div className='team-member'>
                            <img src={WillSmith} alt="Will Smith" className='team-member-image' />
                            <div className='team-members-details'>
                                <h3>Will Smith</h3>
                                <p>Product Designer</p>
                                <div className='team-member-social-links'>
                                    <TwitterIcon /><InstagramIcon /><LinkedInIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

            {/* Advantages */}
            <div className='advantages-container'>
                <div className='advantages-item'>
                    <LocalShippingIcon className='benefit-icon' />
                    <h4 className='advantages-title'>FREE AND FAST DELIVERY</h4>
                    <p className='advantages-description'>Free delivery for all orders over $140</p>
                </div>

                <div className='advantages-item'>
                    <SupportAgentIcon className='benefit-icon' />
                    <h4 className='advantages-title'>24/7 CUSTOMER SERVICE</h4>
                    <p className='advantages-description'>Friendly 24/7 customer support</p>
                </div>

                <div className='advantages-item'>
                    <VerifiedUserIcon className='benefit-icon' />
                    <h4 className='advantages-title'>MONEY BACK GUARANTEE</h4>
                    <p className='advantages-description'>We return money within 30 days</p>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default About