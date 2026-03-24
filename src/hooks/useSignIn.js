import { useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const result = mutate({
      variables: { credentials: { password, username } },
    });

    // console.log('result: ', result)
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
