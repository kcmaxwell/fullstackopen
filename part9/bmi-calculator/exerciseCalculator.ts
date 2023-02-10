type rating = 1 | 2 | 3;
const ratingDescriptions = [
  'You need to exercise more',
  'Doing okay',
  'Excellent exercising',
];

interface exerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateRating = (average: number, target: number): rating => {
  if (average >= target) return 3;
  if (average < target - 1) return 1;
  return 2;
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): exerciseInfo => {
  const average =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / exerciseHours.length;

  const rating = calculateRating(average, target);

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.reduce(
      (acc, curr) => (curr > 0 ? acc + 1 : acc),
      0
    ),
    success: average >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target: target,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
