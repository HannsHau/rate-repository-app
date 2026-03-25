import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {

  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network"  });

  const repository = data?.repository;
  return { repository, loading };
};

export default useRepository;
