export const storeText = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

export const storeJson = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const storeLocalData = (key: string, data: any) => {
  if (!data) {
    return false;
  }
  if (typeof data == "object") {
    storeJson(key, data);
  } else {
    storeText(key, data);
  }
};

export const getLocalData = (key: string) => {
  let data = localStorage.getItem(key);
  if (data !== null) {
    try {
      data = JSON.parse(data);
      return data;
    } catch (error) {
      return data;
    }
  } else {
    return false;
  }
};
