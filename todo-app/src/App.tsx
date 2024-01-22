import { useEffect, useState } from 'react'
import { ActionIcon, Alert, Box, Container, Grid, LoadingOverlay, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import axios from "./axiosClient"
import { IconPlus, IconTrash } from "@tabler/icons-react"

interface ITask {
  _id: string
  name: string
  isCompleted: boolean
  targetDate: Date
}


function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [listOfTasks, setListOfTasks] = useState<ITask[]>([]);
  
  // Get all tasks 
  const fetchTasks = () => axios.get("/task").then(res => {
    setListOfTasks(res.data)
    return res.data
  })
  
  // Delete task by Id
    const deleteTask = (id: string) => axios.delete("/task/" + id).then(() => fetchTasks())

  const form = useForm({
    initialValues: {
      task: ""
    },
    validate: {
      task: (value) => value === "" || value === undefined && "Please fill task"
    }
  })

  useEffect(() => {
    setIsLoading(true)

    fetchTasks().finally(() => setIsLoading(false))
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitHandler = (formData: unknown) => {
    const { task } = formData as { task: string }
    axios.post("/task", {
      task,
    }).then((res) => {
      if (res.data === 'created') {
        form.reset()
        fetchTasks()
      }
    })
  }

  return (
    <Container size="lg">
      <form onSubmit={form.onSubmit((va) => onSubmitHandler(va))}>
        <Grid>
          <Grid.Col span={{ base: 12 }}>
            <Box py="md" pos="relative">
              <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />
              {listOfTasks.map((t, index) => <Alert key={index} my="xs" title={t.name} variant="light" >
                <ActionIcon onClick={() => deleteTask(t._id)}>
                  <IconTrash />
                </ActionIcon>
              </Alert>)}
            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 12, lg: 8 }}>
            <TextInput
              withAsterisk
              label="Task name"
              placeholder="Enter your task name"
              {...form.getInputProps('task')}
              rightSection={
                <ActionIcon type="submit"> <IconPlus /> </ActionIcon>
              }
            />
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  )
}

export default App
