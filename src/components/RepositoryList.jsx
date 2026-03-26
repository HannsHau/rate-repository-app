import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  navigate,
  order,
  setOrder,
}) => {
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
      ListHeaderComponent={() => (
        <>
          <Picker
            selectedValue={order}
            onValueChange={(itemValue, itemIndex) => {
              console.log('itemValue: ', itemValue, itemValue.orderBy, itemValue.orderDirection)
              setOrder(itemValue);
            }}
          >
            <Picker.Item
              label="Latest repositories"
              value="CREATED_AT_DESC"
            />
            <Picker.Item
              label="Highest rated repositories"
              value="RATING_AVERAGE_DESC"
            />
            <Picker.Item
              label="Lowest rated repositories"
              value="RATING_AVERAGE_ASC"
            />
          </Picker>
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressFunction(item.id, navigate)}>
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

const getOrderObject = (order) => {

  switch (order) {
    case "CREATED_AT_DESC":
      return {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
      };
  case "RATING_AVERAGE_DESC":
    return {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    };
  case "RATING_AVERAGE_ASC":
    return {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    };
  default:
    console.log("order unknown, return default: ", order);
    return {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    };
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState("CREATED_AT_DESC");
  const { repositories } = useRepositories(getOrderObject(order));
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
