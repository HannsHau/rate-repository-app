import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

//const useRepository = (id) => {
const useRepository = (variables) => {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  //const repository = data?.repository;
  return { repository: data?.repository, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepository;
