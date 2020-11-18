import React from 'react';

import Layout from 'utils/layout';
import HomePageHeader from 'components/organisms/home-page/header/home-page-header';
import HomePageBody from 'components/organisms/home-page/body/home-page-body';

const Home = () => (
  <Layout location='home'>
    <HomePageHeader />
    <HomePageBody />
  </Layout>
);

export default Home;
