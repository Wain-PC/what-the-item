const send = async (path = "", data = {}) => {
  const response = await fetch(`/admin/${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const { payload, error } = await response.json();
    if (error) {
      throw new Error(error);
    }

    return payload;
  }
  throw new Error("Unable to contact API");
};

// eslint-disable-next-line import/prefer-default-export
export { send };
