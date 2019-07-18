import React from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';

import { helpOutline } from '../../utils/images/images';

import theme from '../../assets/styles/toolTipStyles.scss';

import levelTheme from '../../assets/styles/levelTipStyle.scss';

theme.tooltipInner = 'tooltipInner';
levelTheme.tooltipInner = 'tooltipInner';
levelTheme.tooltip = 'tooltip';

const TooltipLink = Tooltip(Link);

/**
 * Reusable Tooltip component
 *
 * @param {string} tip - The words
 *
 * @returns {JSX}
 */
const Tip = (tip, type) => (
  <TooltipLink
    theme={type === undefined ? theme : levelTheme}
    tooltipPosition="top"
    tooltipShowOnClick
    tooltip={tip}
  >
    {type === undefined ? <img src={helpOutline} alt="help icon" /> : type}
  </TooltipLink>
);

export default Tip;
