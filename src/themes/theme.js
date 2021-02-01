import robotoLight from 'themes/fonts/roboto/Roboto-Light.ttf';
import robotoBold from 'themes/fonts/roboto/Roboto-Bold.ttf';
import robotoRegular from 'themes/fonts/roboto/Roboto-Regular.ttf';

export const customFonts = {
  roboto: {
    thin: robotoLight,
    regular: robotoRegular,
    bold: robotoBold,
  },
};

export const breakpoints = {
  regularDesktop: 1700,
  // bigDesktop: 1440,
  // mediumDesktop: 1300,
  // desktop: 1168,
  // bigTablet: 1028,
  // tablet: 767,
  // smallTablet: 680,
  // bigPhoneBreak: 570,
  // bigPhone: 480,
  // phone: 374,
  // smallPhone: 350,
};

export const theme = {
  color: {
    bg: '#F8F8FF',
    bgSecondary: '#FFFFFF',
    mainFont: '#000',
    transparentMain: '#446DF644',
    transparentDark: '#00000055',
    secondaryFont: '#8F8F8F',
    tertiaryFont: '#FFFFFF',
    devider: '#F0F0FD',
    primary: '#446DF6',
    secondary: '#f6c044',
    tertiary: '#f66744',
    success: '#00A896',
    danger: '#F25C54',
    error: '#DA2442',
  },
  fontSize: {
    heading: '64px',
    headingSmall: '34px',
    cta: '24px',
    l: '20px',
    regular: '18px',
    ms: '16px',
    s: '14px',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  shadow: {
    around: '0 0 10px -4px rgba(0, 0, 0, 0.25)',
    bottom: '0 4px 5px rgba(0, 0, 0, 0.1)',
    right: '4px 0 5px rgba(0, 0, 0, 0.1)',
  },
  defaultSizes: {
    appBody: '1268px',
  },
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (max-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),
};
