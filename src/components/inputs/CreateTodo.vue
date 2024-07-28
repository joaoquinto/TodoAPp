<script setup>
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/theme.js'

const themeStore = useThemeStore()

const emit = defineEmits(['update:todo'])

const todoItem = reactive({ description: '', completed: false })

function createTodo() {
  if (!todoItem.description) return

  emit('update:todo', { description: todoItem.description, completed: false })
  todoItem.description = ''
}
</script>

<template>
  <div
    class="create-todo"
    :class="[themeStore.whichThemeInUse]"
    @keyup.enter="createTodo"
    title="press enter to create a todo"
  >
    <div class="todo-checker"></div>
    <input v-model="todoItem.description" placeholder="Create a new todo..." class="todo-input" />
  </div>
</template>

<style scoped>
.create-todo {
  width: 100%;
  height: 53px;
  background-color: var(--very-light-gray);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  gap: 24px;
  margin-bottom: 17px;
}

.todo-checker {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  border: 1px solid var(--very-light-grayish-blue);
}

.todo-input {
  flex: 1;
  border: none;
  background-color: transparent;
  width: 100%;
  height: 53px;
  font-weight: 700;
  color: var(--very-dark-grayish-blue-light-mode);
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: 'Josefin Sans', sans-serif;
  }
}

.create-todo.dark {
  background-color: var(--very-dark-desaturaed-blue);

  .todo-input {
    color: var(--very-light-grayish-blue);
  }
}
</style>
