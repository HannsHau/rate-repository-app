import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import Review from "./Review"
import RepositoryList from "./RepositoryList";
import RepositorySingle from "./RepositorySingle";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/createReview" element={<Review />} />
        <Route path="/repository/:id" element={<RepositorySingle />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
