import React from 'react'

const Account = () => {
  return (
    <>
    <main className="main">
  <div className="user-view">
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <a href="#">
            
            Settings
          </a>
        </li>
        <li>
          <a href="#">
          
            My bookings
          </a>
        </li>
        <li>
          <a href="#">
           
            My reviews
          </a>
        </li>
        <li>
          <a href="#">
          
            Billing
          </a>
        </li>
      </ul>
      <div className="admin-nav">
        <h5 className="admin-nav__heading">Admin</h5>
        <ul className="side-nav">
          <li>
            <a href="#">
              
              Manage tours
            </a>
          </li>
          <li>
            <a href="#">
             
              Manage users
            </a>
          </li>
          <li>
            <a href="#">
             
              Manage reviews
            </a>
          </li>
          <li>
            <a href="#">
             
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div className="user-view__content">
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" for="name">Name</label>
            <input id="name" className="form__input" type="text" value="Jonas Schmedtmann" required />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" for="email">Email address</label>
            <input id="email" className="form__input" type="email" value="admin@natours.io" required />
          </div>
          <div className="form__group form__photo-upload">
            <img className="form__user-photo" src="img/user.jpg" alt="User photo" />
            <a className="btn-text" href="">Choose new photo</a>
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green">Save settings</button>
          </div>
        </form>
      </div>
      <div className="line">&nbsp;</div>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-settings">
          <div className="form__group">
            <label className="form__label" for="password-current">Current password</label>
            <input id="password-current" className="form__input" type="password" placeholder="••••••••" required minlength="8" />
          </div>
          <div className="form__group">
            <label className="form__label" for="password">New password</label>
            <input id="password" className="form__input" type="password" placeholder="••••••••" required minlength="8" />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" for="password-confirm">Confirm password</label>
            <input id="password-confirm" className="form__input" type="password" placeholder="••••••••" required minlength="8" />
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green">Save password</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
    </>
  )
}

export default Account;