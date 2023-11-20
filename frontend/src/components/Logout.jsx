const Logout = ({ setUser }) => {
  function logOutUser() {
    setUser('');
    window.localStorage.clear();
  }

  return (
    <button
      type="button"
      onClick={() => {
        logOutUser();
      }}
    >
      Log Out
    </button>
  );
};

export default Logout;
