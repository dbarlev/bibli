let apiPath = "https://www.bibli.co.il/api";
if (process.env.NODE_ENV === "development")
  apiPath = "http://localhost/bibli/bibli/api";

export default apiPath;
