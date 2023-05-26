const dev = {
  app_url: 'http://localhost:5173',
};

const prod = {
  app_url: 'https://compliance-portal.herokuapp.com',
};

const local = {
  app_url: 'http://192.168.71.120',
};

let config = dev;

if (process.env.NODE_ENV === 'production') {
  config = prod;
}

if (process.env.NODE_ENV === 'local') {
  config = local;
}

export default config;
