<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['md', 'lg'].includes(value),
  },
})
</script>

<template>
  <div
    class="app-brand-logo"
    :class="`app-brand-logo--${size}`"
    aria-label="Find Movie"
  >
    <div
      class="app-brand-logo__icon"
      role="img"
      aria-hidden="true"
    />
    <p class="app-brand-logo__text">
      <span class="app-brand-logo__find">Find</span>
      <span class="app-brand-logo__movie">Movie</span>
    </p>
  </div>
</template>

<style scoped>
.app-brand-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
}

.app-brand-logo--md {
  width: 56px;
  height: 74px;
  gap: 0.12rem;
}

.app-brand-logo--lg {
  width: 64px;
  height: 82px;
  gap: 0.15rem;
}

.app-brand-logo__icon {
  flex-shrink: 0;
  background-image: url('/logo.webp');
  background-repeat: no-repeat;
  background-position: center top;
  image-rendering: auto;
}

.app-brand-logo--md .app-brand-logo__icon {
  width: 50px;
  height: 52px;
  background-size: 125px auto;
}

.app-brand-logo--lg .app-brand-logo__icon {
  width: 58px;
  height: 60px;
  background-size: 145px auto;
}

.app-brand-logo__text {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.28rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.app-brand-logo--md .app-brand-logo__text {
  font-size: 0.95rem;
}

.app-brand-logo--lg .app-brand-logo__text {
  font-size: 1.05rem;
}

.app-brand-logo__find {
  color: rgb(var(--v-theme-on-surface));
}

.app-brand-logo__movie {
  color: rgb(var(--v-theme-primary));
}
</style>
