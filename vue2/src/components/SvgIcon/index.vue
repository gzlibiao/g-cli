<template>
  <svg v-on="$listeners" v-bind="$attrs" :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: () => ""
  }
});

const iconName = computed(() => {
  return `#icon-${props.icon}`;
});
const svgClass = computed(() => {
  return props.className ? "svg-icon " + props.className : "svg-icon";
});
</script>
<style scoped lang="scss">
.svg-icon {
  fill: currentColor;
  cursor: pointer;
}
</style>
