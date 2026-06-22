import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  return (
    <main style={{ padding: 20 }}>
      <h1>UNTUNGLAH</h1>

      <p>Test Koneksi Database</p>

      <pre>
        {JSON.stringify(
          {
            success: !error,
            total_users: data?.length || 0,
            error: error?.message
          },
          null,
          2
        )}
      </pre>
    </main>
  )
}
