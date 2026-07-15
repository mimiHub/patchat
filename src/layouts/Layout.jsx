import Nav from "./Nav/Nav";
import Toolbar from "./Toolbar/Toolbar";

function Layout({ children }) {
  return (
    <div className="main-container">
      <Nav />
      <div className="content-area">
        <Toolbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;