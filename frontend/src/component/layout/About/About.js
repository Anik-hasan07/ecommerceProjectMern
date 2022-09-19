import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from '@mui/material';
import king from "../../../images/anik03.jpg"

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/anik_hasan_akash03/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={king}
              alt="Founder"
            />
            <Typography>Anik hasan</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @anikhasan. Only with the
              purpose to fullfill the Practicum defense.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/watch?v=Zzs6kLlkAUQ"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/anik_hasan_akash03/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;