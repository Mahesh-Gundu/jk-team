import React, { useCallback, useEffect } from 'react';
// import Components
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import withRouter from '../../components/common/withRouter';

const Layout = (props:any) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const toggleMenuCallback = () => {

  };
  //hides right sidebar on body click
  const hideRightbar = useCallback((event:any) => {
    var rightbar = document.getElementById("right-bar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && rightbar.contains(event.target)) {
      return;
    } else {
      //if clicked in outside of rightbar then fire action for hide rightbar
    }
  }, []);

  /*
  layout  settings
  */

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);
  }, [hideRightbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar
          theme={'dark'}
          type={'default'}
          isMobile={isMobile}
        />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Layout);
