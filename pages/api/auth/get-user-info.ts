import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mySQLPool } from "helpers/mysql";

export async function getUserData(id) {
  if (!id) return null;
  return new Promise((res, rej) => {
    mySQLPool.getConnection((err, connection) => {
      if (err) {
        rej(err);
      }
      connection.query(
        `
        SELECT tournament_id, team_num, name, admin
          FROM User
        WHERE id = ?
      `,
        [id],
        (err, results) => {
          connection.release();
          if (err) {
            rej(err);
          } else if (!results || results.length !== 1) {
            res(null);
          } else {
            const [result] = results;

            res({
              tournament: result.tournament_id,
              teamNumber: result.team_num,
              name: result.name,
              admin: result.admin === 1,
            });
          }
        }
      );
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const data = await getUserData(session?.user?.email);
  res.send({ user: data });
};
