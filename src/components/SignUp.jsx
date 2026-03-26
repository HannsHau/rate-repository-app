import { TextInput, View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useState } from "react";

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
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username >= 5 character")
    .max(30, "Username <= 30 character"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Username >= 5 character")
    .max(50, "Username <= 50 character"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const LogInForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <>{error && <Text style={styles.error}>{error}</Text>}</>
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
      <TextInput
        style={styles.input}
        placeholder="password confirmation"
        secureTextEntry="true"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        onBlur={formik.handleBlur("passwordConfirm")}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.error}>{formik.errors.passwordConfirm}</Text>
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

const SignUp = () => {
  const signUp = useSignUp();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp[0]({ username, password });
      await signIn[0]({ username, password });
      navigate("/");
    } catch (e) {
      let errorMsg = "";
      if (e.networkError?.result?.errors?.length) {
        errorMsg = e.networkError.result.errors[0].message; // "Variable \"$review\" got invalid value \"55\"..."
      } else if (e.graphQLErrors?.length) {
        errorMsg = e.graphQLErrors[0].message;
      } else if (e.networkError) {
        errorMsg = e.networkError.message;
      } else if (e.message) {
        errorMsg = e.message;
      }
      setError(errorMsg);
    }
  };

  return <LogInForm onSubmit={onSubmit} error={error} />;
};

export default SignUp;
