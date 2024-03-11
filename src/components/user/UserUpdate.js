import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

const UserUpdate = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('id user => ', params.id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getDetailUser = async () => {
        const res = await requestApi(`/users/${params.id}`, 'GET');
        console.log('res=>', res);
        dispatch(actions.controlLoading(false));
        const fields = ['first_name', 'last_name', 'status'];
        fields.forEach((field) => setValue(field, res.data[field]));
      };
      getDetailUser();
    } catch (error) {
      console.log('error=>', error);
      dispatch(actions.controlLoading(false));
    }
  }, []);

  const handleSubmitFormUpdate = async (data) => {
    console.log(data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/users/${params.id}`, 'PUT', data);
      console.log('res=>', res);
      dispatch(actions.controlLoading(false));
      toast.success('User has been updated successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
      setTimeout(() => navigate('/users'), 3000);
    } catch (error) {
      console.log('error=>', error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Update user</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/users">Users</Link>
            </li>
            <li className="breadcrumb-item active">Update</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-plus me-1"></i>
              Add
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <form>
                  <div className="col-md-6">
                    <div className="mb3 mt-3">
                      <label className="form-label">First name:</label>
                      <input
                        {...register('first_name', {
                          required: 'First name is required.',
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                      />
                      {errors.first_name && (
                        <p style={{ color: 'red' }}>
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb3 mt-3">
                      <label className="form-label">Last name:</label>
                      <input
                        {...register('last_name', {
                          required: 'Last name is required.',
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter last name"
                      />
                      {errors.last_name && (
                        <p style={{ color: 'red' }}>
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-3 mb-3">
                      <label className="form-label">Status:</label>
                      <select {...register('status')} className="form-select">
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit(handleSubmitFormUpdate)}
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserUpdate;
