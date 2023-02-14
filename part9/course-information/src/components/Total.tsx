import { CoursePart } from '../types';

interface TotalProps {
  courseParts: CoursePart[];
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.courseParts.reduce((acc, part) => acc + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
