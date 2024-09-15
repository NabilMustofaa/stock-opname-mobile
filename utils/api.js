const api = (() => {
  const BASE_URL = `https://mfs.nabilmustofa.my.id`
  const USERNAME = `$2y$10$hAl7DYg7trjLS2iCGucDFuZPEUqGQRyyYVVpDF.IaKqHIy10Mww4.`
  const PASSWORD = `$2y$10$kDK4.ZXLSYV2mGrciGvdZ.ZPyX4z2HJ.OlikOyFUOCtRAfIjlXUC2`

  async function fetchWithHeaders(url, options = {}, userToken) {
    try {
      return await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${userToken}`,
        }
      });
    } catch (error) {
      throw new Error(`Error fetching with headers: ${error.message}`);
    }
  }

  async function checkToken({ token }) {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}`, {
        method: 'GET',
      });

      const responseJson = await response.json();

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
  async function getLocations({ token,userToken }) {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}/location`, {
        method: 'GET',
      },userToken);

      const responseJson = await response.json();

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(`Error getting locations: ${error.message}`);
    }
  }

  async function login ({ Operator, Token }) {
    console.log(Operator, Token)
    try {
      const response = await fetch(`${BASE_URL}/api/opname/login/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Operator, Token })
      });

      const responseJson = await response.json();

      console.log(responseJson)

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }

  async function searchProduct({ token,userToken,query }) {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}/search?ProductSearch=${query}`, {
        method: 'GET',
      },userToken);

      const responseJson = await response.json();

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(`Error searching product: ${error.message}`);
    }
  }

  async function historyLocation({ token,userToken,location }) {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}/${location}/history`, {
        method: 'GET',
      },userToken);

      const responseJson = await response.json();

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(`Error getting history location: ${error.message}`);
    }
  }

  async function checkProduct({ token,userToken,location }) {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}/${location}/products`, {
        method: 'GET',
      },userToken);

      const responseJson = await response.json();
      console.log(responseJson)

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(`Error checking product: ${error.message}`);
    }
  }

  async function storeOpname({ token, userToken, location, data }) {
    console.log(data)
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}/${location}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      },userToken);

      const responseJson = await response.json();

      const { status, message } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return message;
    } catch (error) {
      throw new Error(`Error storing opname: ${error.message}`);
    }
  }

  const deleteOpname = async ({ token, userToken, location, id }) => {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/${token}/${location}/products`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: id
        })
      },userToken);

      const responseJson = await response.json();

      const { status, message } = responseJson;

      if (status !== 'success') {
        throw new Error(message);
      }

      return message;
    } catch (error) {
      throw new Error(`Error deleting opname: ${error.message}`);
    }
  }

  async function getCurrentUser({ userToken }) {
    try {
      const response = await fetchWithHeaders(`${BASE_URL}/api/opname/user/current`, {
        method: 'GET',
      },userToken);

      const responseJson = await response.json();

      const { status, data } = responseJson;

      if (status !== 'success') {
        const { message } = responseJson;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      throw new Error(`Error getting current user: ${error.message}`);
    }
  }

  return {
    checkToken,
    getLocations,
    historyLocation,
    checkProduct,
    storeOpname,
    searchProduct,
    deleteOpname,
    login,
    getCurrentUser
  };
})();

export default api;