const auth = {
    isAuthenticated: () => {
      return !!localStorage.getItem('currentUser');
    },
    login: (myUser) => {
      localStorage.setItem('currentUser', JSON.stringify(myUser));
    },
    logout: () => {
      localStorage.removeItem('currentUser');
    }
  };
  
  export default auth;
  