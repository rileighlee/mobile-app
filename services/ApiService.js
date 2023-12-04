import axios from 'axios';

const BASE_URL = 'https://localhost:7054/api';

const ApiService = {
  getData: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/endpoint`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/User/login`, {
        email: email,
        password: password,
      });
      return response.data.token; // Assuming the token is returned in the response
    } catch (error) {
      throw new Error(error.message);
    }
  },

  postData: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/endpoint`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getMedicineByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/Medicine/GetMedicineByCategory/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllCategoriesWithMedicines: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Category/GetAllCategoriesWithMedicines`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllMedicine: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Medicine/GetAllMedicine`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getMedicineById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/Medicine/GetMedicineById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  checkMedicineInteraction: async (id1, id2) => {
    try {
      const response = await axios.post(`${BASE_URL}/Medicine/CheckInteraction`, {
        id1,
        id2,
      });

      return response.data; // Assuming the response contains interaction details
    } catch (error) {
      throw new Error('Failed to check medicine interaction');
    }
  },

  getUserDetail: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/User/GetUserDetail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user details');
    }
  },

  getMedicineByName: async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/Medicine/SearchMedicine/${name}`);
      return response.data; // Assuming the data returned is an array of medicine matching the name
    } catch (error) {
      throw new Error(`Error searching medicine by name: ${error.message}`);
    }
  },
  
  async registerUser(userData) {
    try {
      const response = await fetch(`${BASE_URL}/User/Registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async ForgotPasswordWithRecoveryPhrase(data) {
    try {
      const response = await axios.post(`${BASE_URL}/User/ForgotPasswordWithRecoveryPhrase`, data);
      if (!response.data) {
        throw new Error('Password reset with recovery phrase failed');
      }
      // Password reset successful, handle accordingly (e.g., show alert)
      Alert.alert('Success', 'Password reset with recovery phrase successful');
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default ApiService;