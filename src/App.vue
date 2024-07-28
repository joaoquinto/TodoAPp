<script setup>
import { computed, onMounted, ref } from 'vue'

import CreateTodo from '@/components/inputs/CreateTodo.vue'
import { useThemeStore } from '@/stores/theme.js'
import TodoItem from '@/components/card/TodoItem.vue'

const filterInUse = ref(1)
const todos = ref([])
const counterActiveTodos = computed(() => {
  const activeTodos = todos.value.filter((todo) => todo.completed === false)
  return `${activeTodos.length} items left`
})
const filteredTodos = computed(() => {
  switch (filterInUse.value) {
    case 1:
      return todos.value
    case 2:
      return todos.value.filter((todo) => !todo.completed)
    case 3:
      return todos.value.filter((todo) => todo.completed)
    default:
      return todos.value
  }
})
const themeStore = useThemeStore()
const filterTypes = ref([
  { label: 'All', value: 1 },
  { label: 'Active', value: 2 },
  { label: 'Completed', value: 3 }
])

function setFilterType(type) {
  filterInUse.value = type
}

function clearCompleted() {
  todos.value = todos.value.filter((todo) => !todo.completed)
  setTodosInLocalStorage()
}

function setTodoItem(todo) {
  todos.value.push(todo)
  setTodosInLocalStorage()
}

function setCompletedTodo(INDEX) {
  todos.value.forEach((todo, index) => {
    if (INDEX === index) {
      todo.completed = true
    }
  })
  setTodosInLocalStorage()
}

function setTodosInLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function removeTodo(index) {
  todos.value.splice(index, 1)
  setTodosInLocalStorage()
}

function getTodos() {
  const TODOS = localStorage.getItem("todos")

  if (!TODOS) {
    return
  }

  todos.value = JSON.parse(TODOS)

}

onMounted(() => {
  themeStore.loadThemeByPreferences()
  getTodos()
})
</script>

<template>
  <main class="container" :class="themeStore.whichThemeInUse">
    <header class="header">
      <nav class="nav">
        <h1 class="title">TODO</h1>
        <button class="btn-theme" aria-label="set dark or light mode" @click="themeStore.setTheme">
          <component :is="themeStore.handleIconTheme" />
        </button>
      </nav>
    </header>
    <div class="container-todos">
      <CreateTodo @update:todo="(todo) => setTodoItem(todo)" />
      <ul class="todos">
        <TodoItem
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @update:completed="setCompletedTodo(index)"
          @update:remove="removeTodo(index)"
        />
      </ul>
      <div class="filter-todo" v-if="todos.length > 0">
        <p class="todos-counter">{{ counterActiveTodos }}</p>
        <ul class="filters">
          <li
            class="filter-item"
            v-for="filter in filterTypes"
            :key="filter.value"
            :class="{ active: filterInUse === filter.value }"
            @click="setFilterType(filter.value)"
          >
            {{ filter.label }}
          </li>
        </ul>
        <button class="btn-clear" @click="clearCompleted">Clear completed</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 300px;
    background-image: url('@/assets/img/bg-desktop-light.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    position: absolute;
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  width: 80vw;

  .title {
    color: var(--very-light-gray);
    letter-spacing: 10px;
    font-size: 40px;
  }
}

.container-todos {
  position: relative;
  top: 195px;
  width: 80vw;
}

.filter-todo {
  width: 100%;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--very-light-gray);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 1px solid var(--very-light-grayish-blue);
  .todos-counter {
    font-weight: 700;
    color: var(--dark-grayish-blue);
  }

  .filters {
    display: flex;
    list-style: none;
    gap: 16px;

    .filter-item {
      cursor: pointer;
      color: var(--dark-grayish-blue);
      font-weight: 700;
      &:hover {
        color: var(--very-dark-grayish-blue-light-mode);
      }
      &.active {
        color: var(--active);
      }
    }
  }

  .btn-clear {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-weight: 700;
    color: var(--dark-grayish-blue);
    &:hover {
      color: var(--very-dark-grayish-blue-light-mode);
    }
  }
}

.btn-theme {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

body.dark {
  background-color: var(--very-dark-blue);
  .header {
    background-image: url('@/assets/img/bg-desktop-dark.jpg');
  }

  .filter-todo {
    background-color: var(--very-dark-desaturaed-blue);
    border-top: 1px solid var(--very-dark-grayish-blue-light-mode);

    .todos-counter {
      font-weight: 700;
      color: var(--dark-grayish-blue);
    }

    .filter-item {
      color: var(--dark-grayish-blue);
      &:hover {
        color: var(--very-light-grayish-blue);
      }
    }

    .btn-clear {
      color: var(--dark-grayish-blue);
      &:hover {
        color: var(--very-light-grayish-blue);
      }
    }
  }
}
</style>
