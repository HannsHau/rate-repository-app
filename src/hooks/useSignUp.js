import { useMutation } from "@apollo/client/react";
import { CREATEUSER } from "../graphql/mutations";

const useSignUp = () => {
  // alternative const [mutate, { data: mutationData, loading, error }] = useMutation(CREATEUSER);
  const [mutate, result] = useMutation(CREATEUSER);


  const signUp = async ({ username, password }) => {
    const result = await mutate({
      variables: { user: { username, password } },
    });

    const data = result.data;
    console.log('data useSignUp: ', data)

    return result;
  };

  return [signUp, result];
};

export default useSignUp;
