import React from 'react';
import classNames from 'classnames/bind';
import BoldrLogo from '../BoldrLogo';


const Hero = props => (
  <div className="hero">
    <div className="wrap">
    <BoldrLogo />
       <h1 className="hero__tag">
         Bold<span style={ { color: 'rgb(229, 0, 80)' } }>r</span>
       </h1>
     </div>
  </div>
);

export default Hero;
