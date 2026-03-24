import { TextInput, View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useFormik } from "formik";
import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flexGrow: 0,
    padding: 10,
    margin: 10,
    color: "#f6f6f6",
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
  error: {
    color: "#d73a4a",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LogInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry="true"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          color="textWhite"
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          Log In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("Username: ", username);

    try {
      const { data } = await signIn({ username, password });
      console.log(data.authenticate);
    } catch (e) {
      console.log(e);
    }

    
  };

  return <LogInForm onSubmit={onSubmit} />;
};

export default SignIn;
