import { withUrqlClient } from "next-urql";

export function withMTUrqlClient(page) {
  return withUrqlClient(() => ({
    url: process.env.NEXT_PUBLIC_GQL_ENDPOINT as string,
    fetchOptions: () => {
      const ballotCode =
        typeof sessionStorage !== "undefined"
          ? sessionStorage.getItem("code")
          : undefined;

      return {
        headers: {
          "Ballot-Code": ballotCode,
        },
      };
    },
  }))(page);
}
