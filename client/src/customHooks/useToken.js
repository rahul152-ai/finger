const useToken = () => {
  const token = localStorage.getItem("auth-token");
  return token;
};
export default useToken;
