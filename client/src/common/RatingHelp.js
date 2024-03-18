export function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  return totalRating / reviews.length;
}
