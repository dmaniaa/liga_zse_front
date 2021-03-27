export default async function ({ $auth, redirect }) {
  await $auth.fetchUser()
  if (!$auth.hasScope('admin')) {
    return redirect('/settings/user/info')
  }
}
