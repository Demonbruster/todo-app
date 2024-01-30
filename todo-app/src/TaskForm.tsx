import { useForm } from '@mantine/form'
import axios from "./axiosClient"
import { ActionIcon, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { ITask } from './App'
import { useEffect } from 'react';

type Props = {
  fetchTasks: () => void
  editTask?: ITask
  modalClose?: () => void
}

const TaskForm = ({ fetchTasks, editTask, modalClose }: Props) => {
  const form = useForm({
    initialValues: {
      task: ""
    },
    validate: {
      task: (value) => value === "" || value === undefined && "Please fill task"
    }
  })

  useEffect(() => {
    if (editTask) {
      form.setFieldValue('task', editTask.name)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTask])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitHandler = (formData: unknown) => {
    const { task } = formData as { task: string }

    if (editTask) {
      axios.put("/task/" + editTask._id, {
        name: task
      }).then(() => {
        form.reset()
        fetchTasks()
        modalClose && modalClose()
      })
    }
    else {
      axios.post("/task", {
        task,
      }).then((res) => {
        if (res.data === 'created') {
          form.reset()
          fetchTasks()
        }
      })
    }
  }

  return (
    <form onSubmit={form.onSubmit((va) => onSubmitHandler(va))}>
      <TextInput
        withAsterisk
        label="Task name"
        placeholder="Enter your task name"
        {...form.getInputProps('task')}
        rightSection={
          <ActionIcon type="submit"> <IconPlus /> </ActionIcon>
        }
      />
    </form >
  )
}

export default TaskForm