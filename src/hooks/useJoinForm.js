import { useCallback, useMemo, useState } from "react";
import {
  getJoinStepFieldKeys,
  isFieldGroupValid,
  validateJoinForm,
} from "../lib/join/validateJoinForm";
import { submitJoinRequest } from "../lib/join/submitJoinRequest";

const initialValues = {
  fullName: "",
  nim: "",
  email: "",
  phone: "",
  batch: "",
  studyProgram: "",
  semester: "",
  division: "",
  motivation: "",
  photo: null,
  cv: null,
};

export function useJoinForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(() => validateJoinForm(values), [values]);

  const touchField = useCallback((key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const setField = useCallback((key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goToStep = useCallback((idx) => {
    setStepIndex(idx);
  }, []);

  const stepFieldKeys = getJoinStepFieldKeys(stepIndex);
  const stepValid = useMemo(
    () => isFieldGroupValid(errors, stepIndex),
    [errors, stepIndex, stepFieldKeys]
  );

  const next = useCallback(() => {
    if (!stepValid) return;
    setStepIndex((s) => Math.min(3, s + 1));
  }, [stepValid]);

  const back = useCallback(() => {
    setStepIndex((s) => Math.max(0, s - 1));
  }, []);

  const reset = useCallback(() => {
    setStepIndex(0);
    setValues(initialValues);
    setTouched({});
    setIsSubmitting(false);
  }, []);

  const submit = useCallback(async () => {
    if (!stepValid) return null;
    setIsSubmitting(true);
    try {
      const result = await submitJoinRequest(values);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [stepValid, values]);

  return {
    stepIndex,
    values,
    errors,
    touched,
    isSubmitting,
    stepValid,
    next,
    back,
    goToStep,
    setField,
    touchField,
    reset,
    submit,
  };
}

