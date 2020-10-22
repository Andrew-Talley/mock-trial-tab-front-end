import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { mySQLPool } from "helpers/mysql";

const options: InitOptions = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers.Credentials({
      name: "Custom Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        return new Promise((res, rej) => {
          mySQLPool.getConnection((err, connection) => {
            if (err) {
              rej(err);
            }
            connection.query(
              `
              SELECT id, name, admin, team_num
                FROM User
              WHERE username = ? AND password = ?
            `,
              [credentials.username, credentials.password],
              (err, data) => {
                connection.release();
                if (err) {
                  rej(err);
                } else if (data.length === 0) {
                  res(null);
                } else {
                  const [user] = data;
                  if (!user) {
                    res(null);
                  } else {
                    console.log(user);
                    return res({
                      name: user.name,
                      email: `${user.id}-${user.admin === 1}-${user.team_num}`,
                    });
                  }
                }
              }
            );
          });
        });
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
