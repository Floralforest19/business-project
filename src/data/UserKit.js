const ROOT_URL = "https://frebi.willandskill.eu/";
const API_URL = `${ROOT_URL}api/v1/`;
const AUTH_URL = `${ROOT_URL}auth/`;
const LOGIN_URL = `${ROOT_URL}api-token-auth/`;

export default class {
  async register(
    firstName,
    lastName,
    email,
    password,
    organisationName,
    organisationKind
  ) {
    const url = `${ROOT_URL}auth/users/create/`;
    const payload = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    };
    console.log(payload);
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async activateUser(uid, token) {
    const url = `${AUTH_URL}users/activate/`;
    const payload = {
      uid,
      token,
    };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async login(email, password) {
    const url = `${LOGIN_URL}`;
    const payload = {
      email,
      password,
    };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async getCustomerList() {
    const url = `${API_URL}customers/`;
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    });
  }

  async getCustomer(id) {
      const url = `${API_URL}customers/${id}/`;
      return fetch(url, {
        headers: this.getPrivateHeaders()
      });
  }
  async deleteCustomer(id) {
      const url =`${API_URL}customers/${id}/`;
      return fetch(url, {
          method:"DELETE",
          headers: this.getPrivateHeaders()
      });
  }
  async createCustomer(payload) {
    const url = `${API_URL}customers/`;
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    });
  }
  async getMe () {
      const url = `${AUTH_URL}me/`;
      return fetch(url, {
          method: "GET",
          headers: this.getPrivateHeaders()
      });
  }
  setUser(user) {
      localStorage.setItem("BUSINESS_USER", JSON.stringify(user));
  }
  getUser() {
      return JSON.parse(localStorage.getItem("BUSINESS_USER"));
  }

  setToken(token) {
    localStorage.setItem("BUSINESS_TOKEN", token);
  }

  getToken() {
    return localStorage.getItem("BUSINESS_TOKEN");
  }

  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  getPrivateHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}
