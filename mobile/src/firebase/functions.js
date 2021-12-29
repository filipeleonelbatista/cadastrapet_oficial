
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export async function uploadImageAsync(uri, path) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  
  const fileRef = ref(getStorage(), `${path}/${Math.random()*999999}.jpg`);
  await uploadBytes(fileRef, blob);

  blob.close();

  return await getDownloadURL(fileRef);
}