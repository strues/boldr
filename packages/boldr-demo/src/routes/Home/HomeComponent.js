import React from 'react';
import Helmet from 'react-helmet';
import DuckImage from 'styles/assets/Duck.jpg';
import classes from './Home.scss';

export const Home = () =>
  <div>
    <Helmet title={'Home'} />
    <h4>Welcome!</h4>
    <img alt="This is a duck, because Redux!" className={classes.duck} src={DuckImage} />
  </div>;

export default Home;
