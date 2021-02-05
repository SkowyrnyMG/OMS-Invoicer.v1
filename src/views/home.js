import React from 'react';

import Layout from 'utils/layout';
import HomePageHeader from 'components/organisms/home-page/header/home-page-header';
import HomePageBody from 'components/organisms/home-page/body/home-page-body';
import Footer from 'components/modules/footer/footer';

const Home = () => (
  <Layout>
    <HomePageHeader />
    <HomePageBody />
    <Footer>lols</Footer>
  </Layout>
);

export default Home;
