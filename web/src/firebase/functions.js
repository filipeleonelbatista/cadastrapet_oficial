import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export async function uploadImageAsync(file, path) {
  if (!file) return;

  const storageRef = ref(
    getStorage(),
    `/${path}/${Date.now()}-${encodeURI(file.name)}`
  );
  await uploadBytesResumable(storageRef, file);

  return getDownloadURL(storageRef);
}
