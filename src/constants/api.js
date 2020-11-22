let apiPath = "http://stage.bibli.co.il/api";
if (process.env.NODE_ENV === "development")
  apiPath = "http://localhost/bibli/api";

export default apiPath;
