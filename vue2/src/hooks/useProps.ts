import type { PropType, ExtractPropTypes } from "vue";

export const Props = {
  status: {
    type: String,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: false,
    default: null,
  },
} as const;

export type PropsType = ExtractPropTypes<typeof Props>;
export function useProps<T extends PropsType>(defaultPropsValue: T) {
  // Props[]
  // Object.keys(Props).map(o=>({...Props[o],default:Props[o].value}))
  Object.keys(defaultPropsValue).reduce((result, current) => {
    result[current].default = defaultPropsValue[current];
    return result;
  }, Props);

  return {
    Props,
  };
}
