import React from 'react';

import WideInfoBlock from 'components/modules/wide-info-block/wide-info-block';
import { detailsContent } from './details-content';

const HomePageDetailsSection = () => {
  return (
    <section>
      {detailsContent.map(({ title, icon, body, image }, index) => (
        <WideInfoBlock
          title={title}
          Icon={icon}
          counter={index + 1}
          image={image ?? ''}
          key={title}
        >
          {body}
        </WideInfoBlock>
      ))}
    </section>
  );
};

export default HomePageDetailsSection;
