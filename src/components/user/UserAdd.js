import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleSubmitFormAdd = async (data) => {
    console.log(data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi('/users', 'POST', data);
      console.log('res=>', res);
      dispatch(actions.controlLoading(false));
      toast.success('User has been created successfully!', {
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
          <h1 className="mt-4">New User</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/users">Users</Link>
            </li>
            <li className="breadcrumb-item active">Add new</li>
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
                    <div className="mb3 mt-3">
                      <label className="form-label">Email:</label>
                      <input
                        {...register('email', {
                          required: 'Email is required.',
                          pattern: {
                            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            message: 'Invalid email address',
                          },
                        })}
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                      {errors.email && (
                        <p style={{ color: 'red' }}>{errors.email.message}</p>
                      )}
                    </div>
                    <div className="mb3 mt-3">
                      <label className="form-label">Password:</label>
                      <input
                        {...register('password', {
                          required: 'Password is required.',
                        })}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                      />
                      {errors.password && (
                        <p style={{ color: 'red' }}>
                          {errors.password.message}
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
                    onClick={handleSubmit(handleSubmitFormAdd)}
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

export default UserAdd;
