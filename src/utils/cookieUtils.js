// Cookie helper functions
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // More lenient cookie settings for development
  const isProduction = window.location.protocol === "https:";

  if (isProduction) {
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  } else {
    // Development settings - more permissive
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/;samesite=lax`;
  }

  console.log(`Cookie set: ${name}`, { value, expires: expires.toUTCString() });
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  console.log(`Getting cookie: ${name}`, { allCookies: document.cookie });

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
      console.log(`Cookie found: ${name}`, value);
      return value;
    }
  }
  console.log(`Cookie not found: ${name}`);
  return null;
};

export const deleteCookie = (name) => {
  console.log(`Deleting cookie: ${name}`);
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  // Also try with different path variations to ensure deletion
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=${window.location.hostname}`;
};

// Helper function to get token from both cookies and localStorage
export const getToken = () => {
  return getCookie("token") || localStorage.getItem("token");
};
