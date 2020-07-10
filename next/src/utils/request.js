export const send = async (path = "", data = {}) => {
  const apiPath = `/api/${path}`;
  const apiURL = process.browser
    ? apiPath
    : `${process.env.LOCAL_URL}${apiPath}`;

  const response = await fetch(apiURL, {
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

export const receive = method => async (req, res) => {
  const { connect, disconnect } = await import("../database/db");

  try {
    const { method: httpMethod, body: data = {} } = req;
    await connect();

    if (httpMethod !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${httpMethod} Not Allowed`);
    } else if (!method) {
      res
        .status(404)
        .json({ error: "Unknown path" })
        .end();
      return;
    } else {
      // If we have an appropriate DB path, execute it and return results.
      const payload = await method(data);
      res.status(200).json({ payload });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot process request" });
  } finally {
    await disconnect();
  }
};
