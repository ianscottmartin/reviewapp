// Layout.js
import NavBar from "./NavBar";

const withNavbar = (WrappedComponent) => {
  return (props) => (
    <div>
      <NavBar />
      <WrappedComponent {...props} />
    </div>
  );
};

export default withNavbar;
