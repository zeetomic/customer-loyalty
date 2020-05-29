import Cookie from 'js-cookie';

export const report = async function({req, redirect, $axios}) {
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
   let report = await $axios.get("/get-transactions-report", config)
   let branch = await $axios.get("/branches-created-by", config)
    return {
      report: report.data,
      branch: branch.data
    }
  } catch {
    redirect('/login');
  }
  
}