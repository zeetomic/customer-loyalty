import Cookie from 'js-cookie';

export const getBoth = async function({req, redirect, $axios}) {
  let token;
  if (process.server) {
    const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("token="));
    if (!jwtCookie) return;
    token = jwtCookie.split("=")[1];
  }
  if (process.client) {
    token = Cookie.get("token");
  }
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  try {
    let merchant = await $axios.get('/get-all-merchants', config)
    let branch = await $axios.get('/branches-created-by', config)
    let portfolio = await $axios.get('/portforlio', config)
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