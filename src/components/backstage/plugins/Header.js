import React from 'react';
import { Lead, Headline } from 'components';

import Logo from './Logo';
import Attribution from './Attribution';

const Header = ({
  plugin: {
    frontmatter: {
      humanName,
      logoImage,
      heading,
      lead,
      attribution,
      intro,
    },
  },
}) => (
  <header className="text-center pb-4 mb-4 md:pt-8 md:pb-24 border-b-2 border-gray-100">
    <Logo sharpImage={logoImage.childImageSharp} alt={`${humanName} logo`} />
    <div className="mb-4">
      <Headline>{heading}</Headline>
    </div>
    <div className="mb-4">
      <Lead>{lead}</Lead>
    </div>
    <Attribution attribution={attribution} />
    {intro &&
      <div className="mb-4 mt-8 text-center">
        <p className="prose prose-primary mr-auto ml-auto">
          {intro}
        </p>
      </div>
    }
  </header>
);

export default Header;
