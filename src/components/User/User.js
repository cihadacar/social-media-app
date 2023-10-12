import React from "react";

function User() {
    return (
        <div>
            User !! {localStorage.getItem("currentUserId")}
        </div>
    );
}

export default User;