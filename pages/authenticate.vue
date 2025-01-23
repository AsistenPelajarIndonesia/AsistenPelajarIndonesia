<template>
  <main
    class="flex h-screen items-center justify-center flex-col gap-4 mx-10 md:mx-5"
  >
    <kbd>401</kbd>
    <h1 class="text-3xl font-bold">
      Akses Tertutup
    </h1>
    <section>
      <SignedOut>
        <div class="flex flex-col md:flex-row items-center justify-center gap-2">
          <SignUpButton>
            <Button class="text-xl p-4 font-bold mr-1"> Daftar </Button>
          </SignUpButton>
          <SignInButton>
            <Button class="text-xl p-4 font-bold" variant="secondary">
              Masuk
            </Button>
          </SignInButton>
        </div>
      </SignedOut>
    </section>
  </main>
</template>
