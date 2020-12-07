<template>
  <div class="flex w-screen h-screen justify-center items-center">
    <div class="w-2/5">
      <h1 class="pb-4 text-5xl text-gray-400 font-bold">TodosApp</h1>

      <form class="pb-6 flex" @submit.prevent="submit">
        <div class="pr-2 flex-1">
          <input v-model="newTodoName" class="px-5 py-2 w-full rounded bg-gray-300" type="text" placeholder="Wpisz nowe zadanie...">
        </div>
        <button class="px-5 py-2 bg-blue-500 text-white rounded">Dodaj</button>
      </form>

      <div id="todosContainer">
        <div class="pb-2 flex justify-between uppercase tracking-wider text-sm font-bold text-gray-400">
          <div>Lista zadań</div>
          <div>Ukończono: <span :class="{'text-green-500': doneTodosPercentage === 100}">{{doneTodosPercentage}}%</span></div>
        </div>
        <TodoBlock 
          v-for="(todo, index) in todos" 
          :key="`tood-${index}`" 
          :todo="todo"
          @stateChanged="handleStateChanged" 
          class="mb-2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import TodoBlock from '@/components/TodoBlock.vue';
import { Todo } from "@/types/Todo";
import wretch from 'wretch';

type StateChangedEventData = {
  todo: Todo;
  done: boolean;
}

export default defineComponent({
  components: {
    TodoBlock
  },
  setup() {
    const todos: Ref<Todo[]> = ref([]);
    const newTodoName: Ref<string> = ref('');
    const doneTodosPercentage: ComputedRef<number> = computed(() => {
      const doneTodosCount = todos.value.filter(todo => todo.done).length;

      return Math.round(doneTodosCount ? doneTodosCount / todos.value.length * 100 : 0);
    });
    
    async function submit() {
      try {
        const response: Todo = await wretch('http://localhost:3000/api/todo')
          .post({ name: newTodoName.value })
          .json();
        alert(response);

        todos.value.push(response);
        newTodoName.value = '';
      } catch (error) {
        alert('Error');
      }
    }

    function handleStateChanged(data: StateChangedEventData) {
      data.todo.done = data.done;
    }

    return {
      newTodoName,
      handleStateChanged,
      doneTodosPercentage,
      todos,
      submit
    }
  }
})
</script>