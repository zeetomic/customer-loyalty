import Cookie from 'js-cookie';

export const dashboard = async function({req, redirect, $axios}) {
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
    let profile = await $axios.get('/userprofile');
    let report = await $axios.get("/get-transactions-report");
    let merchant = await $axios.get('/get-merchant');
    let branch = await $axios.get('/branches-created-by');
    let portfolio = await $axios.get('/portforlio');
    return {
      merchant: merchant.data,
      branch: branch.data,
      portfolio: portfolio.data,
      profile: profile.data,
      report: report.data
    }
  }
  catch {
    redirect('/login');
  }
}