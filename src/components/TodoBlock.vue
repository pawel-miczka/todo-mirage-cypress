<template>
  <div 
    class="todoBlock px-5 py-4 w-full rounded" 
    :class="todo.done ? ['bg-green-200', 'text-green-700'] : ['bg-white text-black']"
    @click="toggleState"
  >
    {{ todo.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Todo } from '@/types/Todo';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  setup(props, { emit }) {
    function toggleState() {
      emit('state-changed', { todo: props.todo, done: !props.todo.done});
    }

    return {
      toggleState
    }
  }
})
</script>