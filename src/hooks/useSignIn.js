import { useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client/react";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: { credentials: { password, username } },
    });

    const accessToken = result.data.authenticate.accessToken;
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();

    return result;
  };

  return [signIn, result];
};

export default useSignIn;
