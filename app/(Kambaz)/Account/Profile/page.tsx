"use client";
import * as client from "../client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    setProfile(updatedProfile);
  };

  const fetchProfile = async () => {
    const srv = await client.profile().catch(() => null);
    if (srv && srv._id) {
      dispatch(setCurrentUser(srv));
      setProfile(srv);
      return;
    }
    if (currentUser) {
      setProfile(currentUser);
      return;
    }
    router.replace("/Account/Signin");
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.replace("/Account/Signin");
  };

  useEffect(() => { fetchProfile(); /* run once */ }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            defaultValue={profile.username}
            placeholder="Username"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="text"
            defaultValue={profile.password}
            placeholder="Password"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            defaultValue={profile.firstName}
            placeholder="First name"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            defaultValue={profile.lastName}
            placeholder="Last name"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            defaultValue={profile.dob}
            placeholder="Date of birth"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            defaultValue={profile.email}
            placeholder="Email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            defaultValue={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
            Update
          </button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
