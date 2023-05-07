import { getCurrentInstance } from "vue";
import { useRouter as router, useRoute as route} from "@/router";

export function useContext() {
  const { proxy } = getCurrentInstance() as { proxy: Vue };
  return { router: useRouter(), route: useRoute(), ctx: proxy };
}

export function useRouter(){
  return router();
}

export function useRoute(){
  return route();
}
