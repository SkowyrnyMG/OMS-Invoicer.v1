import React from 'react';
// import styled from 'styled-components';

import Layout from 'utils/layout';
import FAQPosition from 'components/modules/faq-position/faq-position';

const Helpdesk = () => (
  <Layout>
    <div>
      <h2>FAQ</h2>
    </div>
    <FAQPosition title='How to create new customer?'>
      To create new customer you have to use customer modal. To do that you will
      need to click on main menu on Customers then Add new button. After that
      just fill up all required fields and save your customer.
    </FAQPosition>
    <FAQPosition title='Can I issue an invoice without order?'>
      At this moment you can only issue invoices related to the finished orders.
    </FAQPosition>
    <FAQPosition title='How to add user from VIES database?'>
      To fetch user data from VIES database you simply need to use &quot;Search
      in Vies&quot; from placed in invoice modal. To add customer from VIES you
      will need to instert customer active VAT ID NUMBER into validation field
      and run the search by clicking on magnifier button.
    </FAQPosition>
    <FAQPosition title='How to create new order?'>
      To create new order you will have to add some customers to your database
      first. After you have done that you can use &quot;AddNew&quot; button from
      side menu to open order modal. After that you have to insert already
      exisitng customer into &quot;Type a Customer name&quot; field and accept
      your choice.
    </FAQPosition>
    <FAQPosition title='Why I cannot issue a new invoice?'>
      To create new invoice you have to create and finish some orders first.
      Most of details provided into order are forwarded further to the new
      invoice draft.
    </FAQPosition>
    <FAQPosition title='Can I change registry prefixes after first configuration?'>
      Unfortunately at this moment option like that is not avaliable, but it can
      be added in next version of the app.
    </FAQPosition>
    <FAQPosition title='Where Can I change my company details?'>
      Company and bank details can be changed in Settings module. Just aply your
      changes and click on save button.
    </FAQPosition>
  </Layout>
);

export default Helpdesk;
