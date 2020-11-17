import React from 'react';
import { Link } from 'react-router-dom';

import Layout from 'utils/layout';

const Home = () => (
  <Layout location='home'>
    <h2>Home works</h2>
    <Link to='/app'>App</Link>
  </Layout>
);

export default Home;
