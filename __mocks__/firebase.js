export const initializeApp = config => config;

export const storage = () => ({
  ref: pathToFile => ({
    getDownloadURL: () => (new Promise((resolve) => {
      resolve(pathToFile);
    })),
    put: FileObject => (new Promise((resolve, reject) => {
      if (FileObject.name !== 'fail') {
        resolve('uploaded');
      } else {
        reject(Error('failed to upload'));
      }
    })),
  }),
});
