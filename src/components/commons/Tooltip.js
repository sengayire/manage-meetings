import React from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';

import helpIcon from '../../assets/images/help_outline_24px.svg';

import theme from '../../assets/styles/toolTipStyles.scss';

theme.tooltipInner = 'tooltipInner';

const TooltipLink = Tooltip(Link);
const Tip = tip => (
  <TooltipLink
    theme={theme}
    tooltipPosition="top"
    tooltipShowOnClick
    tooltip={tip}
  >
    <img src={helpIcon} alt="help icon" />
  </TooltipLink>
);

export default Tip;
