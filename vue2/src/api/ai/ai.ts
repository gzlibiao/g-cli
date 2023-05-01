import { registryHttpUrl, get } from "@/plugins/axios";

const http = registryHttpUrl("/test");

export function chatAI(text: string) {
  return get(`/api/chatgpt?msg=${text}`);
}

// axios(config)
//   .then(function(response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
