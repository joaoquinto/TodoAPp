<script setup>
import { useThemeStore } from '@/stores/theme.js'
import CrossIcon from '@/components/icons/CrossIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'

const emit = defineEmits(['update:remove', 'update:completed'])

defineProps({ todo: Object })

const themeStore = useThemeStore()

function completeTodo() {
  emit('update:completed')
}

function removeTodo() {
  emit('update:remove')
}
</script>

<template>
  <li class="todo-item" :class="[themeStore.whichThemeInUse]">
    <button
      class="todo-checker"
      aria-label="complete a todo"
      :class="{ completed: todo.completed }"
      @click="completeTodo"
    >
      <CheckIcon v-if="todo.completed" />
    </button>
    <p class="todo-description" :class="{ completed: todo.completed }">{{ todo.description }}</p>
    <CrossIcon class="cross-icon" @click="removeTodo" />
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  height: 53px;
  padding: 0 24px;
  background-color: var(--very-light-gray);
  list-style: none;

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .cross-icon {
    visibility: hidden;
    cursor: pointer;
    transition: visibility 0.2s;
  }

  &:hover {
    .cross-icon {
      visibility: visible;
    }
  }

  & + & {
    border-top: 1px solid var(--very-light-grayish-blue);
  }
}

.todo-checker {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 1px solid var(--very-light-grayish-blue);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &.completed {
    background: var(--gradient);
  }
}

.todo-description {
  flex: 1;
  border: none;
  background-color: transparent;
  width: 100%;
  font-weight: 700;
  color: var(--very-dark-grayish-blue-light-mode);
  &.completed {
    text-decoration: line-through;
  }
}

.todo-item.dark {
  background-color: var(--very-dark-desaturaed-blue);

  & + & {
    border-top: 1px solid var(--very-dark-grayish-blue-light-mode);
  }

  .todo-description {
    color: var(--very-light-grayish-blue);
  }
}
</style>
