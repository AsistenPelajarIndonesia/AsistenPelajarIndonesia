export default defineNuxtRouteMiddleware(async () => {
    const supabase: any = useNuxtApp().$supabase;

    const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error fetching session:', error.message)
  }

  if (!session) {
    // Redirect to the login page if the user is not authenticated
    return navigateTo('/login')
  }
})
