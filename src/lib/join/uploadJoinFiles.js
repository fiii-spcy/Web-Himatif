import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const getFileExtension = (file) => {
  const name = file?.name || "";
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

export async function uploadJoinFiles({
  storage,
  joinRequestId,
  photoFile,
  cvFile,
  submittedByUid,
}) {
  const basePath = `join_requests/${joinRequestId}`;

  const photoExt = getFileExtension(photoFile) || "jpg";
  const normalizedPhotoExt = photoExt === "jpeg" ? "jpg" : photoExt;

  const photoRef = ref(storage, `${basePath}/photo.${normalizedPhotoExt}`);
  await uploadBytes(photoRef, photoFile, {
    contentType: photoFile.type || `image/${normalizedPhotoExt}`,
    customMetadata: submittedByUid
      ? { submittedByUid: String(submittedByUid) }
      : undefined,
  });
  const photoUrl = await getDownloadURL(photoRef);

  let cvUrl = null;
  if (cvFile) {
    const cvRef = ref(storage, `${basePath}/cv.pdf`);
    await uploadBytes(cvRef, cvFile, {
      contentType: cvFile.type || "application/pdf",
      customMetadata: submittedByUid
        ? { submittedByUid: String(submittedByUid) }
        : undefined,
    });
    cvUrl = await getDownloadURL(cvRef);
  }

  return { photoUrl, cvUrl };
}

