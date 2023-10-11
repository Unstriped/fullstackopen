const baseUrl = "/api/notes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  const notes = await response.json();
  return notes;
};

const create = async (newObject) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  });
  const result = response.json();

  return result;
};

const update = async (id, newObject) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  });
  const result = await response.json(response);
  return result;
};

export default { getAll, create, update };
