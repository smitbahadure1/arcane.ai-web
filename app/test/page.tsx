import { auth } from "@/lib/supabase";

export default async function TestPage() {
  const { user, error } = await auth.getCurrentUser();

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Authentication Test</h1>
      {error ? (
        <div style={{ color: '#ff6b6b' }}>
          <p>Error: {error.message}</p>
        </div>
      ) : user ? (
        <div style={{ color: '#51cf66' }}>
          <p>✅ Authenticated as: {user.email}</p>
          <p>User ID: {user.id}</p>
          <a href="/dashboard" style={{ color: '#74c0fc', textDecoration: 'underline' }}>
            Go to Dashboard (Blue Meshy Background)
          </a>
        </div>
      ) : (
        <div style={{ color: '#ffd43b' }}>
          <p>⚠️ Not authenticated</p>
          <a href="/signin" style={{ color: '#74c0fc', textDecoration: 'underline' }}>
            Go to Sign In
          </a>
        </div>
      )}
    </div>
  );
}
