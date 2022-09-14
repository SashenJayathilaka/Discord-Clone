import React, { useState } from "react";
import Login from "./login";
import Singing from "./singin";

function MainContain() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      {isSignIn ? (
        <Login setIsSignIn={setIsSignIn} />
      ) : (
        <Singing setIsSignIn={setIsSignIn} />
      )}
    </div>
  );
}

export default MainContain;
