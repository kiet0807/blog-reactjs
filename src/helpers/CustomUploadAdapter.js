import requestApi from './api';

export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload = () => {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // upload image to server
          const formData = new FormData();
          formData.append('upload', file);
          requestApi(
            '/posts/cke-upload',
            'POST',
            formData,
            'json',
            'multipart/form-data'
          )
            .then((res) =>
              resolve({
                default: `${process.env.REACT_APP_API_URL}/${res.data.url}`,
              })
            )
            .catch((err) => {
              reject(err);
            });
        })
    );
  };
}
