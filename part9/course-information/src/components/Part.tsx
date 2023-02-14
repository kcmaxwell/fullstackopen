import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const renderPart = (): JSX.Element => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <div>
              <b>
                {part.name} Exercises: {part.exerciseCount}
              </b>
            </div>
            <div>
              <i>{part.description}</i>
            </div>
          </>
        );
      case 'group':
        return (
          <>
            <div>
              <b>
                {part.name} Exercises: {part.exerciseCount}
              </b>
            </div>
            <div>Project exercises: {part.groupProjectCount}</div>
          </>
        );
      case 'background':
        return (
          <>
            <div>
              <b>
                {part.name} Exercises: {part.exerciseCount}
              </b>
            </div>
            <div>
              <i>{part.description}</i>
            </div>
            <div>Submit to {part.backgroundMaterial}</div>
          </>
        );
      case 'special':
        return (
          <>
            <div>
              <b>
                {part.name} Exercises: {part.exerciseCount}
              </b>
            </div>
            <div>
              <i>{part.description}</i>
            </div>
            <div>Required skills: {part.requirements.join(', ')}</div>
          </>
        );
      default:
        assertNever(part);
        return <></>;
    }
  };

  return (
    <div>
      <p>{renderPart()}</p>
    </div>
  );
};

export default Part;
