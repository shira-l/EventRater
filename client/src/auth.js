const auth = {
    isAuthenticated: () => {
      return !!localStorage.getItem('user');
    },
    login: (myUser) => {
      localStorage.setItem('user', 'myUser');
    },
    logout: () => {
      localStorage.removeItem('user');
    }
  };
  
  export default auth;
  