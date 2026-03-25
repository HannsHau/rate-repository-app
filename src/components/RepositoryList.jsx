import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onPressFunction = (repositoryId, navigate) => {
    console.log("onPressFunction : ", repositoryId);
    navigate(`/repository/${repositoryId}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressFunction(item.id, navigate)}  >
          <RepositoryItem
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            stargazersCount={item.stargazersCount}
            forksCount={item.forksCount}
            reviewCount={item.reviewCount}
            ratingAverage={item.ratingAverage}
            ownerAvatarUrl={item.ownerAvatarUrl}
            details={false}
          />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  return <RepositoryListContainer repositories={repositories} navigate={navigate}/>;
  // const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  // return (
  //   <FlatList
  //     data={repositoryNodes}
  //     ItemSeparatorComponent={ItemSeparator}
  //     renderItem={({ item }) => (
  //       <RepositoryItem
  //         fullName={item.fullName}
  //         description={item.description}
  //         language={item.language}
  //         stargazersCount={item.stargazersCount}
  //         forksCount={item.forksCount}
  //         reviewCount={item.reviewCount}
  //         ratingAverage={item.ratingAverage}
  //         ownerAvatarUrl={item.ownerAvatarUrl}
  //       />
  //     )}
  //   />
  // );
};

export default RepositoryList;
