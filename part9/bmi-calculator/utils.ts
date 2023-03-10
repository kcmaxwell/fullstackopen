interface BmiValues {
  height: number;
  weight: number;
}

interface ExerciseValues {
  exerciseHours: number[];
  target: number;
}

export const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (height <= 0 || weight <= 0) {
      throw new Error('Height and weight cannot be equal to 0!');
    }

    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const exerciseHours: number[] = [];
  let target = 0;
  args.forEach((arg, index) => {
    if (index < 2) return;

    if (isNaN(Number(arg)))
      throw new Error('Provided values were not numbers!');

    if (index === 2) {
      target = Number(arg);
    } else {
      exerciseHours.push(Number(arg));
    }
  });

  return {
    exerciseHours,
    target,
  };
};

export const isPositiveNumber = (number: number): boolean => {
  if (isNaN(Number(number)) || number <= 0) return false;
  return true;
};

export const handleError = (error: unknown): void => {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};
