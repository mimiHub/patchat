import Nav from "./Nav/Nav";

function Layout({ children }) {
  return (
    <div className="main-container">
      <Nav />
      {children}
    </div>
  );
}

export default Layout;
