import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { ClearToken } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import ReceiptsHeader from '../Header/ReceiptsHeader';
import { btnLoadingStop } from '@/store/slices/btn-loading-slice';

const Navbar = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ClearToken());
    dispatch(btnLoadingStop());
    router.push('/');
  };

  return (
    <div className="container-lg px-0">
      <div className="">
        <nav className="d-flex">
          <div className="container-lg mt-2 d-flex flex-wrap justify-content-center ">
            <ReceiptsHeader />
          </div>

          <div className="text-end mt-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="success-light"
                id="dropdown-basic"
                className="border"
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ color: '#CDAB6E', fontSize: 30 }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item className="d-flex justify-content-center">
                  Welcome!!
                </Dropdown.Item>
                <Dropdown.Item className="d-flex justify-content-center">
                  <button className="logout-button " onClick={handleClick}>
                    Logout
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
        <hr className=" my-1" />
      </div>
    </div>
  );
};

export default Navbar;
