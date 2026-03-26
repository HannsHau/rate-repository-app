import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderDirection, orderBy }) => {
  console.log("orderDirection: ", orderDirection, " , orderBy: ", orderBy);
  // eslint-disable-next-line no-unused-vars
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderDirection: orderDirection, orderBy: orderBy },
    fetchPolicy: "cache-and-network",
  });

  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;
