export const getEnvironment = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'staging') return 'staging';
  if (process.env.NODE_ENV === 'development') return 'development';
  return 'production';
};

export const isStaging = () => getEnvironment() === 'staging';
export const isDevelopment = () => getEnvironment() === 'development';
export const isProduction = () => getEnvironment() === 'production';