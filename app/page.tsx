import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          <h1 className="text-xl font-bold">MediaWorld</h1>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="profil"
                    className="h-8 w-8 rounded-full"
                  />
                )}

                <span className="text-sm">
                  {session.user.name}
                </span>

                <form
                  action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }}
                >
                  <button className="border px-3 py-1 rounded">
                    Çıkış Yap
                  </button>
                </form>
              </>
            ) : (
              <form
                action={async () => {
                  "use server"
                  await signIn("google", { redirectTo: "/" })
                }}
              >
                <button className="bg-white text-black px-4 py-2 rounded">
                  Giriş Yap
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {session?.user ? (
          <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-8">
            <h2 className="text-3xl font-bold">Hoş geldin</h2>

            <div className="mt-6 space-y-3 text-lg">
              <p>
                <span className="text-white/60">Ad:</span>{" "}
                {session.user.name ?? "Yok"}
              </p>

              <p>
                <span className="text-white/60">E-posta:</span>{" "}
                {session.user.email ?? "Yok"}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold">Giriş yapılmadı</h2>
            <p className="mt-4 text-white/70">
              Devam etmek için yukarıdan giriş yap.
            </p>
          </div>
        )}
      </section>

    </main>
  )
}