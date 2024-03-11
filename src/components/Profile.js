import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';
import requestApi from '../helpers/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [isSelectedFile, setIsSelectedFile] = useState(false);

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi('/users/profile', 'GET')
      .then((res) => {
        console.log('res', res);
        setProfileData({
          ...res.data,
          avatar: process.env.REACT_APP_API_URL + '/' + res.data.avatar,
        });
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log('err=>', err);
        dispatch(actions.controlLoading(false));
      });
  }, []);

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: reader.result,
          file: file,
        });
        setIsSelectedFile(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateAvatar = () => {
    let formData = new FormData();
    formData.append('avatar', profileData.file);

    dispatch(actions.controlLoading(true));
    requestApi(
      '/users/upload-avatar',
      'POST',
      formData,
      'json',
      'mutipart/form-data'
    ).then((res) => {
      console.log('res', res);
      dispatch(actions.controlLoading(false));
      toast.success('Avatar has been updated successfully', {
        position: 'top-center',
        autoClose: 2000,
      });
    });
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Profile</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">Update avatar</li>
          </ol>
          <div className="card mb-4">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <img
                    src={
                      profileData.avatar
                        ? profileData.avatar
                        : '../assets/images/default-avatar.jpg'
                    }
                    className="img-thumbnail rounded mb-2"
                    alt="..."
                  />
                  <div className="input-file float-start">
                    <label
                      htmlFor="file"
                      className="btn-file btn-sm btn btn-primary"
                    >
                      Browse Files
                    </label>
                    <input
                      id="file"
                      type="file"
                      onChange={onImageChange}
                      accept="image/*"
                    />
                  </div>
                  {isSelectedFile && (
                    <button
                      className="btn btn-sm btn-success float-end"
                      onClick={handleUpdateAvatar}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
