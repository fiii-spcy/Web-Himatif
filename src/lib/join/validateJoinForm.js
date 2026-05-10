const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeDigits = (value) =>
  String(value || "").replace(/[^\d]/g, "");

const getFileExtension = (file) => {
  const name = file?.name || "";
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

const isValidPhotoFile = (file) => {
  if (!file) return false;
  const ext = getFileExtension(file);
  const allowedExt = ["jpg", "jpeg", "png"];
  const allowedMime = ["image/jpeg", "image/png"];
  return (
    file.size <= MAX_FILE_SIZE_BYTES &&
    (allowedExt.includes(ext) || allowedMime.includes(file.type))
  );
};

const isValidCvFile = (file) => {
  if (!file) return true; // optional
  const ext = getFileExtension(file);
  const allowedExt = ["pdf"];
  const allowedMime = ["application/pdf"];
  return (
    file.size <= MAX_FILE_SIZE_BYTES &&
    (allowedExt.includes(ext) || allowedMime.includes(file.type))
  );
};

export const JOIN_STEP_FIELDS = [
  ["fullName", "nim", "email", "phone", "batch"],
  ["studyProgram", "semester"],
  ["division", "motivation"],
  ["photo", "cv"],
];

export function validateJoinForm(values) {
  const errors = {};

  const fullName = String(values.fullName || "").trim();
  const nim = String(values.nim || "").trim();
  const email = String(values.email || "").trim();
  const phone = String(values.phone || "").trim();
  const batch = String(values.batch || "").trim();

  const studyProgram = String(values.studyProgram || "").trim();
  const semester = String(values.semester || "").trim();

  const division = values.division;
  const motivation = String(values.motivation || "").trim();

  if (!fullName) errors.fullName = "Full name is required.";

  if (!nim) errors.nim = "NIM is required.";
  else if (!/^\d{3,20}$/.test(nim)) errors.nim = "NIM must be digits only.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email.";

  if (!phone) errors.phone = "WhatsApp number is required.";
  else {
    const digits = normalizeDigits(phone);
    if (digits.length < 9 || digits.length > 15)
      errors.phone = "Enter a valid WhatsApp number.";
  }

  if (!batch) errors.batch = "Batch / Year is required.";

  if (!studyProgram) errors.studyProgram = "Study program is required.";

  if (!semester) errors.semester = "Semester is required.";

  if (!division) errors.division = "Please choose a division.";

  if (!motivation) errors.motivation = "Motivation is required.";

  if (!values.photo) errors.photo = "Profile photo is required.";
  else if (!isValidPhotoFile(values.photo))
    errors.photo =
      "Photo must be JPG/PNG and max 5MB.";

  if (values.cv && !isValidCvFile(values.cv))
    errors.cv = "CV must be PDF and max 5MB.";

  return errors;
}

export function getJoinStepFieldKeys(stepIndex) {
  return JOIN_STEP_FIELDS[stepIndex] || [];
}

export function isFieldGroupValid(errors, stepIndex) {
  const keys = getJoinStepFieldKeys(stepIndex);
  return keys.every((key) => !errors[key]);
}

