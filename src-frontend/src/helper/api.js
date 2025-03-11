import axios from "axios";


// Import database connection string from environment file.
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  /** Static function to send HTTP requests  */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**
   * Get all companies.
   * Option to provide search string
   */

  static async getCompanies(filter = {}) {
    const res = await this.request("companies", filter);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**
   * Get all jobs.
   * Option to provide search string
   */

  static async getAllJobs(filter = {}) {
    const res = await this.request("jobs", filter);
    return res.jobs;
  }

  /** Get details on a job by id. */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Post request to register new user */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Post request for user login */

  static async login(credentials) {
    let res = await this.request(`auth/token`, credentials, "POST");
    return res.token;
  }

  /** Get user information for given user */

  static async getUser (username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** Patch details from given user */

  static async patchUser (username, data) {
    let res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }

  /** Apply for a given job */
  static async apply (username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`,{}, "POST");
    return res.applied;
  }


}

export default JoblyApi