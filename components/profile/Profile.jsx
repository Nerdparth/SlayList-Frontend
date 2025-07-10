import React, { useEffect } from "react";
import useGetProfileDetails from "../../hooks/profile/profile";

const Profile = () => {
  const {getProfileDetails, getProfileDetailsResponse} = useGetProfileDetails()
  useEffect(() => {
    getProfileDetails()
  }, [])
  console.log(getProfileDetailsResponse)
  return (
    <div className="container">
      <p className="h4 ms-2 text-secondary">My Profile:</p>

      <div className="rounded border border-secondary-subtle col-10 mx-auto my-3 p-4">
        <div className="row align-items-center">
          <div className="col-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"
              className="rounded-circle"
              style={{ width: 150 }}
              alt=""
            />
          </div>
          <div className="col-4">
            <span className="lead fw-normal" style={{ fontSize: 25 }}>
              {getProfileDetailsResponse?.username}
            </span>
            <p
              className="lead text-secondary"
              style={{ fontSize: 20, marginBottom: 5 }}
            >
              {getProfileDetailsResponse?.profession}
            </p>
            <p className="lead text-secondary" style={{ fontSize: 15 }}>
              {getProfileDetailsResponse?.stack}
            </p>
          </div>
        </div>
      </div>
      <p className="h4 ms-2 text-secondary mt-4">Personal Information:</p>
      <div className="rounded border border-secondary-subtle col-10 mx-auto my-3 p-4">
        <div className="row">
          <div className="col-6">
            <label htmlFor="firstName" className="text-secondary mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control text-secondary"
              value={getProfileDetailsResponse?.first_name}
              disabled
            />
          </div>
          <div className="col-6">
            <label htmlFor="lastName" className="text-secondary mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className="form-control text-secondary"
              value={getProfileDetailsResponse?.last_name}
              disabled
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="email" className="text-secondary mt-2 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control text-secondary"
              value={getProfileDetailsResponse?.email}
              disabled
            />
          </div>
          <div className="col-6">
            <label htmlFor="phone" className="text-secondary mt-2 mb-2">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="form-control text-secondary"
              value={getProfileDetailsResponse?.phone}
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <label htmlFor="bio" className="text-secondary mt-2 mb-2">
              Bio:
            </label>
            <input
              type="text"
              id="bio"
              className="form-control text-secondary"
              value={getProfileDetailsResponse?.bio}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
