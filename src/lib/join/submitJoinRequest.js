import {
  deleteDoc,
  doc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { uploadJoinFiles } from "./uploadJoinFiles";

class JoinDuplicateError extends Error {
  constructor() {
    super("DUPLICATE_NIM");
    this.code = "DUPLICATE_NIM";
  }
}

export async function submitJoinRequest(values) {
  const nim = String(values.nim || "").trim();
  const year = new Date().getFullYear();

  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  const submittedByUid = auth.currentUser?.uid || null;

  const joinRequestRef = doc(db, "join_requests", nim);
  const sequenceRef = doc(db, "registration_sequences", String(year));

  let registrationNumber = null;

  await runTransaction(db, async (tx) => {
    const existingSnap = await tx.get(joinRequestRef);
    if (existingSnap.exists) {
      throw new JoinDuplicateError();
    }

    const seqSnap = await tx.get(sequenceRef);
    const currentSeq = seqSnap.exists ? seqSnap.data()?.seq ?? 0 : 0;
    const nextSeq = currentSeq + 1;

    registrationNumber = `HIMATIF-${year}-${String(nextSeq).padStart(4, "0")}`;

    tx.set(
      joinRequestRef,
      {
        fullName: String(values.fullName || "").trim(),
        nim,
        email: String(values.email || "").trim(),
        phone: String(values.phone || "").trim(),
        batch: String(values.batch || "").trim(),
        studyProgram: String(values.studyProgram || "").trim(),
        semester: String(values.semester || "").trim(),
        division: values.division,
        motivation: String(values.motivation || "").trim(),
        photoUrl: "",
        cvUrl: null,
        status: "pending",
        registrationNumber,
        submittedByUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: false }
    );

    tx.set(
      sequenceRef,
      {
        seq: nextSeq,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });

  try {
    const { photoUrl, cvUrl } = await uploadJoinFiles({
      storage,
      joinRequestId: nim,
      photoFile: values.photo,
      cvFile: values.cv || null,
      submittedByUid,
    });

    await updateDoc(joinRequestRef, {
      photoUrl,
      cvUrl,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    try {
      await deleteDoc(joinRequestRef);
    } catch (_) {
      // Ignore cleanup failures; surface the original error.
    }
    throw err;
  }

  return { registrationNumber };
}

