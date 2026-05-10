import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useJoinForm } from "../../hooks/useJoinForm";
import { useToast } from "../../hooks/useToast";
import { getJoinStepFieldKeys } from "../../lib/join/validateJoinForm";
import JoinStepper from "./JoinStepper";
import JoinField from "./JoinField";
import JoinTextArea from "./JoinTextArea";
import JoinDivisionChips from "./JoinDivisionChips";
import JoinFilePicker from "./JoinFilePicker";
import ToastViewport from "./ToastViewport";
import JoinSuccess from "./JoinSuccess";

const DIVISIONS = [
  "PSDM",
  "RISTEK",
  "HUMAS",
  "MEDKOM",
  "KEWIRAUSAHAAN",
  "SOSIAL",
];

const STEPS = [
  "Personal Information",
  "Academic Information",
  "Organization Interest",
  "Upload Files",
];

export default function JoinHIMATIFModal({ open, onClose }) {
  const { toasts, pushToast, removeToast } = useToast();
  const {
    stepIndex,
    values,
    errors,
    touched,
    isSubmitting,
    stepValid,
    next,
    back,
    setField,
    touchField,
    reset,
    submit,
  } = useJoinForm();

  const [successRegistrationNumber, setSuccessRegistrationNumber] =
    useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const isSuccess = useMemo(() => !!successRegistrationNumber, [successRegistrationNumber]);
  const stepFieldKeys = useMemo(
    () => getJoinStepFieldKeys(stepIndex),
    [stepIndex]
  );

  useEffect(() => {
    if (!open) return;
    setSuccessRegistrationNumber(null);
    setSubmitError("");
    reset();
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!values.photo || !values.photo.type.startsWith("image/")) {
      setPhotoPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(values.photo);
    setPhotoPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [values.photo]);

  const shownError = (key) => {
    if (!errors[key]) return null;
    if (!stepFieldKeys.includes(key)) return null;
    if (touched[key]) return errors[key];
    if (!stepValid) return errors[key];
    return null;
  };

  const handleSubmit = async () => {
    setSubmitError("");
    try {
      const result = await submit();
      if (result?.registrationNumber) {
        setSuccessRegistrationNumber(result.registrationNumber);
        pushToast({
          type: "success",
          title: "Success",
          message: "Registration submitted successfully",
        });
      }
    } catch (err) {
      const code = err?.code || err?.message;
      if (code === "DUPLICATE_NIM") {
        pushToast({
          type: "error",
          title: "Registration exists",
          message: "You have already registered",
        });
        setSubmitError("You have already registered.");
        return;
      }
      const message =
        err?.message ||
        "Registration failed. Please try again.";
      pushToast({ type: "error", title: "Error", message });
      setSubmitError(message);
    }
  };

  const closeAndReset = () => {
    setSuccessRegistrationNumber(null);
    setSubmitError("");
    reset();
    onClose?.();
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="fixed inset-0 overflow-y-auto"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="section-shell py-10 md:py-14">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-brand-gray">
                      Registration
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold text-gradient-strong">
                      JOIN HIMATIF
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray">
                      Complete the form in four steps. Uploads are secure and
                      your request will be stored in Firestore.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-gray transition-colors hover:border-white/20 hover:text-white"
                    aria-label="Close join modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-10">
                  {!isSuccess ? (
                    <JoinStepper stepIndex={stepIndex} steps={STEPS} />
                  ) : null}
                </div>

                <div className="mt-8">
                  {!isSuccess ? (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                      <div className="grid gap-6 md:grid-cols-2">
                        {stepIndex === 0 ? (
                          <>
                            <div className="md:col-span-2">
                              <JoinField
                                label="Full Name"
                                value={values.fullName}
                                onChange={(v) => setField("fullName", v)}
                                onBlur={() => touchField("fullName")}
                                placeholder="e.g. Nur Aulia Pratama"
                                error={shownError("fullName")}
                                required
                              />
                            </div>

                            <div>
                              <JoinField
                                label="NIM"
                                value={values.nim}
                                onChange={(v) => setField("nim", v)}
                                onBlur={() => touchField("nim")}
                                inputMode="numeric"
                                placeholder="e.g. 2024XXXX"
                                error={shownError("nim")}
                                required
                              />
                            </div>

                            <div>
                              <JoinField
                                label="Email"
                                value={values.email}
                                onChange={(v) => setField("email", v)}
                                onBlur={() => touchField("email")}
                                type="email"
                                placeholder="name@example.com"
                                error={shownError("email")}
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <JoinField
                                label="WhatsApp Number"
                                value={values.phone}
                                onChange={(v) => setField("phone", v)}
                                onBlur={() => touchField("phone")}
                                inputMode="tel"
                                placeholder="e.g. +62812xxxxxxx"
                                error={shownError("phone")}
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <JoinField
                                label="Batch / Year"
                                value={values.batch}
                                onChange={(v) => setField("batch", v)}
                                onBlur={() => touchField("batch")}
                                placeholder="e.g. 2026"
                                error={shownError("batch")}
                                required
                              />
                            </div>
                          </>
                        ) : null}

                        {stepIndex === 1 ? (
                          <>
                            <div className="md:col-span-2">
                              <JoinField
                                label="Study Program"
                                value={values.studyProgram}
                                onChange={(v) => setField("studyProgram", v)}
                                onBlur={() => touchField("studyProgram")}
                                placeholder="e.g. Teknik Informatika"
                                error={shownError("studyProgram")}
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <JoinField
                                label="Semester"
                                value={values.semester}
                                onChange={(v) => setField("semester", v)}
                                onBlur={() => touchField("semester")}
                                placeholder="e.g. 3"
                                error={shownError("semester")}
                                required
                              />
                            </div>
                          </>
                        ) : null}

                        {stepIndex === 2 ? (
                          <>
                            <div className="md:col-span-2">
                              <JoinDivisionChips
                                value={values.division}
                                    onChange={(v) => {
                                      setField("division", v);
                                      touchField("division");
                                    }}
                                error={shownError("division")}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <JoinTextArea
                                label="Motivation to join"
                                value={values.motivation}
                                onChange={(v) => setField("motivation", v)}
                                onBlur={() => touchField("motivation")}
                                placeholder="Tell us why you want to join HIMATIF."
                                rows={5}
                                error={shownError("motivation")}
                                required
                                maxLength={1000}
                              />
                            </div>
                          </>
                        ) : null}

                        {stepIndex === 3 ? (
                          <>
                            <div className="md:col-span-2">
                              <JoinFilePicker
                                label="Profile Photo"
                                required
                                accept=".jpg,.jpeg,.png"
                                file={values.photo}
                                    onFileChange={(f) => {
                                      setField("photo", f);
                                      touchField("photo");
                                    }}
                                error={shownError("photo")}
                                previewUrl={photoPreviewUrl}
                                    onClear={() => {
                                      setField("photo", null);
                                      touchField("photo");
                                    }}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <JoinFilePicker
                                label="CV (optional)"
                                required={false}
                                accept=".pdf"
                                file={values.cv}
                                    onFileChange={(f) => {
                                      setField("cv", f);
                                      touchField("cv");
                                    }}
                                error={shownError("cv")}
                                previewUrl={null}
                                    onClear={() => {
                                      setField("cv", null);
                                      touchField("cv");
                                    }}
                              />
                            </div>

                            {submitError ? (
                              <div className="md:col-span-2 rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
                                <p className="text-sm font-semibold text-red-200">
                                  {submitError}
                                </p>
                              </div>
                            ) : null}
                          </>
                        ) : null}
                      </div>

                      <div className="sticky bottom-0 mt-8 border-t border-white/10 bg-brand-black/60 py-6 backdrop-blur-xl">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <button
                            type="button"
                            onClick={back}
                            disabled={stepIndex === 0 || isSubmitting}
                            className="btn-magnetic bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-brand-gray transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Back
                          </button>

                          <div className="flex gap-3">
                            {stepIndex < 3 ? (
                              <button
                                type="button"
                                onClick={next}
                                disabled={!stepValid || isSubmitting}
                                className="btn-magnetic bg-brand-darkRed/20 px-8 py-3 text-sm font-semibold text-white/95 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Next
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!stepValid || isSubmitting}
                                className="btn-magnetic bg-brand-darkRed/20 px-8 py-3 text-sm font-semibold text-white/95 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isSubmitting ? (
                                  <span className="inline-flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Submitting
                                  </span>
                                ) : (
                                  "Submit"
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="mt-4 text-xs leading-relaxed text-brand-gray">
                          By submitting, you agree to send your registration request
                          to HIMATIF. Your data will be reviewed by the admin team.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <JoinSuccess
                      registrationNumber={successRegistrationNumber}
                      onDone={closeAndReset}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ToastViewport toasts={toasts} onRemove={removeToast} />
    </>
  );
}

