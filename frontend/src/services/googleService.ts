export const loginWithGoogle = () => {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get("returnTo") || "/";
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login?returnTo=${encodeURIComponent(returnTo)}`;
};
