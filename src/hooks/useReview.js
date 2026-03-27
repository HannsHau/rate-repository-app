import { useMutation } from "@apollo/client/react";
import { CREATEREVIEW, DELETE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [createReviewMutation, createResult] = useMutation(CREATEREVIEW);
  const [deleteReviewMutation, deleteResult] = useMutation(DELETE_REVIEW);

  const addReview = async ({ ownerName, rating, repositoryName, text }) => {
    const ratingAsNum = parseInt(rating);
    const result = await createReviewMutation({
      variables: {
        review: {
          ownerName,
          rating: ratingAsNum,
          repositoryName,
          text,
        },
      },
    });

    return result.data?.createReview;
  };

  const deleteReview = async (id) => {
    const result = await deleteReviewMutation({
      variables: { deleteReviewId: id },
    });

    return result.data?.deleteReview;
  };

  return {
    addReview,
    addReviewResult: createResult,
    deleteReview,
    deleteReviewResult: deleteResult,
  };
};

export default useReview;
