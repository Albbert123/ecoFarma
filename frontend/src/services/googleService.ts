export const loginWithGoogle = () => {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get("returnTo") || "/";
  console.log("params.get('returnTo')", params.get("returnTo"));
  window.location.href = `http://localhost:8000/auth/google/login?returnTo=${encodeURIComponent(returnTo)}`;
};
