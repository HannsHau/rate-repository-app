import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderDirection, orderBy }) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderDirection: orderDirection, orderBy: orderBy },
    fetchPolicy: "cache-and-network",
  });

  const repositories = data?.repositories;

  return { repositories, loading, error, refetch };
};

export default useRepositories;
