import Cookie from 'js-cookie';

export const getBoth = async function({req, redirect, $axios}) {
  let token = '';
  if (process.server) {
    const Cookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("token="));
    if (!Cookie) return;
    token = Cookie.split("=")[1];
  }
  if (process.client) {
    token = Cookie.get("token");
  }
  await $axios.setToken(token, 'Bearer');
  try {
    let merchant = await $axios.get('/get-all-merchants');
    let branch = await $axios.get('/branches-created-by');
    let portfolio = await $axios.get('/portforlio');
    return {
      merchant: merchant.data,
      branch: branch.data,
      portfolio: portfolio.data
    }
  }
  catch {
    redirect('/login');
  }
}