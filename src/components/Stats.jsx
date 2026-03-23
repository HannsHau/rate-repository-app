import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  flexItemText: {
    flexGrow: 1,
  },
});

const getNumber = (value) => {
  if (value > 1000) return <Text fontWeight="bold" style={{textAlign: "center"}} >{Math.round(value / 100) / 10} k</Text>;
  else return <Text fontWeight="bold" style={{textAlign: "center"}} >{value}</Text>;
};

const Stats = ({ stars, forks, review, rating }) => {
  return (
    <View style={styles.flexContainer}>
        <View style={styles.flexItemText}>
          {getNumber(stars)}
          <Text style={{textAlign: "center"}} >Stars</Text>
        </View>
        <View style={styles.flexItemText}>
          {getNumber(forks)}
          <Text style={{textAlign: "center"}} >Forks</Text>
        </View>
        <View style={styles.flexItemText}>
          {getNumber(review)}
          <Text style={{textAlign: "center"}} >Reviews</Text>
        </View>
        <View style={styles.flexItemText}>
          {getNumber(rating)}
          <Text style={{textAlign: "center"}} >Rating</Text>
        </View>
    </View>
  );
};

export default Stats;
