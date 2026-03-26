import { useMutation } from "@apollo/client/react";
import { CREATEREVIEW } from "../graphql/mutations";
//import { useApolloClient } from "@apollo/client/react";

const useReview = () => {
  const [mutate, { data: mutationData, loading, error }] = useMutation(CREATEREVIEW);
  //const apolloClient = useApolloClient();

  const addReview = async ({ ownerName, rating, repositoryName, text}) => {
    const ratingAsNum = parseInt(rating);
    const result = await mutate({
      variables: { review: { 
          ownerName, 
          rating: ratingAsNum,
          repositoryName, 
          text} },
    });

    const createReview = result.data?.createReview;
    //apolloClient.resetStore();

    return createReview;
  };

  return [addReview, { data: mutationData, loading, error }];
};

export default useReview;

