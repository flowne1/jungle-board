const allowedOrigins = [
  "https://front-end-3rgo.onrender.com",
  // 필요에 따라 더 많은 도메인을 추가할 수 있습니다.
];

const corsOptions = {
  //   origin: function (origin, callback) {
  //     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  origin: true,
  credentials: true,
};

module.exports = corsOptions;
