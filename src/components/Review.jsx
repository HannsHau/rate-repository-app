import { TextInput, View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import useReview from "../hooks/useReview";
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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "rating needs to be >= 0")
    .max(100, "rating needs to be <= 100"),
  text: yup.string().optional(),
});

export const ReviewInput = ({
  value,
  placeholder,
  onChangeText,
  onBlur,
  touched,
  errors,
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      {touched && errors && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export const ReviewForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <>{error && <Text style={styles.error}>{error}</Text>}</>
      <ReviewInput
        value={formik.values.ownerName}
        placeholder="Repository owner name"
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        touched={formik.touched.ownerName}
        errors={formik.errors.ownerName}
      />
      <ReviewInput
        value={formik.values.repositoryName}
        placeholder="Repository name"
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        touched={formik.touched.repositoryName}
        errors={formik.errors.repositoryName}
      />
      <ReviewInput
        value={formik.values.rating}
        placeholder="Rating between 0 and 100"
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        touched={formik.touched.rating}
        errors={formik.errors.rating}
      />
      <ReviewInput
        value={formik.values.text}
        placeholder="Review"
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        touched={formik.touched.text}
        errors={formik.errors.text}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          color="textWhite"
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [error, setError] = useState("");
  const reviewHook = useReview();
  const navigate = useNavigate();

  console.log(
    "useReview returns:",
    reviewHook,
    "reviewHook:",
    reviewHook,
    typeof reviewHook,
  );
  //const [review] = reviewHook; // Destructure logged value

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    try {
      const createReview = await reviewHook[0]({
        ownerName,
        rating,
        repositoryName,
        text,
        navigate,
      });
      navigate(`/repository/${createReview.repositoryId}`);
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

  return <ReviewForm onSubmit={onSubmit} error={error} />;
};

export default Review;
