const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://siansa.univ-antananarivo.mg/api";

export const API = {
  preinscription: `${API_BASE_URL}/Preinscription`,
  utilisateur: `${API_BASE_URL}/Utilisateur`,
  payment: `${API_BASE_URL}/Payment`,
  authentication: `${API_BASE_URL}/Authentication`,
};
