import React from 'react';
import PropTypes from 'prop-types';
import withRouter from '../components/common/withRouter';
import { Navigate } from 'react-router';

const NonAuthLayout = (props:any) => {
  const isLoggedIn = localStorage.getItem('token');
  if (isLoggedIn) {
    return (
      <Navigate to={"/"} />
    );
  }
  return (
    <React.Fragment>{props.children}</React.Fragment>
  );
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

export default withRouter(NonAuthLayout);
