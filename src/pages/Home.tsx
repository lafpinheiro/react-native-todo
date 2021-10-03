import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task:Task = { 
      id: new Date().getTime(), 
      title: newTaskTitle, 
      done: false};
    setTasks([ ...tasks, task]);
  }
1
  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map( item => ( {...item} ));
    let foundTask = updatedTasks.find(item => item.id === id)
    if (!foundTask)
      return;

    foundTask.done = !foundTask.done;
    setTasks( updatedTasks );
  }

  function handleRemoveTask(id: number) {
    setTasks( tasks.filter( (item) => (item.id !== id) ) );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})