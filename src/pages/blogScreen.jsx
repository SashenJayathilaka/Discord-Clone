import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Header from "../components/Header";
import ProfileSide from "../components/ProfileSide";
import ProfileUpdate from "../components/ProfileUpdate";
import { auth } from "../firebase/firebase";

function BlogScreen() {
  const { id } = useParams();
  const history = useHistory();
  const [user] = useAuthState(auth);
  const [speed, setSpeed] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
    history.push(`/`);
  };

  useEffect(() => {
    setSpeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div>
      <Header
        userName={user?.displayName}
        userPhoto={user?.photoURL}
        speed={speed}
        logout={logout}
      />

      {isOpen ? (
        <ProfileUpdate />
      ) : (
        <main
          className={
            isOpen
              ? `grid grid-cols-2 bg-gray-700`
              : `grid grid-cols-3 bg-gray-700`
          }
        >
          <ProfileSide
            userName={user?.displayName}
            userEmail={user?.email}
            speed={speed}
            logout={logout}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
          <Feed />
        </main>
      )}
    </div>
  );
}

export default BlogScreen;
