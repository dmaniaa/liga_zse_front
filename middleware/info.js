export default async function ({ $auth }) {
  await $auth.fetchUser()
}
