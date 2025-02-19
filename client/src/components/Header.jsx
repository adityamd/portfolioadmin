import React from 'react'

const Header = () => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className="navBar">
            <div className="smallBtn floatRight">
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Header