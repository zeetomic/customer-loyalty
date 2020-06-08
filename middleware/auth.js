export default function ({store, redirect}) {
  if(!store.state.user.token) {
    redirect('/login');
    this.$toast.error('Unauthorize');
  }
}