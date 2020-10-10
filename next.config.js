module.exports = {
  async redirects() {
    return [
      {
        source: "/tournament/:tournament/ballot/:ballot",
        destination: "/tournament/:tournament/ballot/:ballot/0",
        permanent: true,
      },
    ];
  },
};
