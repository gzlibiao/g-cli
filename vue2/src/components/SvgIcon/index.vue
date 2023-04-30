<template>
    <div>

        <svg class="svg-icon" :class="[iconClass,iconName,svgClass]">
            <use :xlink:href="'moon'"></use>
        </svg>
        {{iconClass}}
    </div>
</template>
<script setup lang="ts" name="SvgIcon">
const props = defineProps({
    iconClass: {
        type: String,
        required: true
    },
    className: {
        type: String
    }
});
const {className, iconClass} = toRefs(props);

const iconName = computed(() => {
    return `#icon-${iconClass}`
})

const svgClass = computed(() => {
    return className
})

</script>
<style lang="scss" scoped>
.svg-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  overflow: hidden;
}
</style>
