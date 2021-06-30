import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

export async function getDeveloper(query, page, perPage) {
  try {
    console.log(`query`, query, page, perPage)
    return await api
      .get(`developers?name=${query}&page=${page}&perPage=${perPage}`)
      .then((response) => {
        return { response: response.data.result };
      });
  } catch (error) {
    return { error: error };
  }
}

export async function getCountDevelopers() {
  try {
    return await api
      .get('count-developers')
      .then((response) => {
        return { response: response.data.result };
      });
  } catch (error) {
    return { error: error };
  }
}

export async function getDeveloperById(id) {
  try {
    return await api.get(`developers/${id}`).then((response) => {
      return { response: response.data.result };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function postDeveloper(data) {
  try {
    return await api.post("developers", data).then((response) => {
      return { response: response.data.result };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function putDeveloper(id, data) {
  try {
    return await api.put(`developers/${id}`, data).then((response) => {
      return { response: response.data.result };
    });
  } catch (error) {
    return { error: error.response };
  }
}

export async function deleteDeveloper(id) {
  try {
    return await api.delete(`developers/${id}`).then((response) => {
      return { response: response.data.result };
    });
  } catch (error) {
    return { error: error.response };
  }
}
