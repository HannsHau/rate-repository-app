import RepositoryItem from "./RepositoryItem"
import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";

const RepositorySingle = () => {
  let params = useParams();
  const { repository } = useRepository(params.id);
  console.log('repository:', repository)
  const props = {...repository, details: true}

  return <RepositoryItem {...props} />
}

export default RepositorySingle