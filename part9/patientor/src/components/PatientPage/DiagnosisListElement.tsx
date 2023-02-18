import React, { useEffect, useState } from 'react';
import { Diagnosis } from '../../types';
import diagnosisService from '../../services/diagnoses';

interface Props {
  code: string;
}

const DiagnosisListElement = ({ code }: Props) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const newDiagnosis = await diagnosisService.getOne(code);
      setDiagnosis(newDiagnosis);
    };
    void fetchDiagnosis();
  }, []);

  if (!diagnosis)
    return (
      <>
        <li>{code}</li>
      </>
    );

  return (
    <>
      <li>
        {code}: {diagnosis.name}
      </li>
    </>
  );
};

export default DiagnosisListElement;
