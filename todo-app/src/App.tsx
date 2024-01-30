import { useEffect, useState } from 'react'
import { ActionIcon, Alert, Box, Container, Flex, Grid, LoadingOverlay, Modal, Text } from "@mantine/core"
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons-react"
import axios from "./axiosClient"
import TaskForm from './TaskForm';
import { useDisclosure } from '@mantine/hooks';

export interface ITask {
  _id: string
  name: string
  isCompleted: boolean
  targetDate: Date
}


function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [listOfTasks, setListOfTasks] = useState<ITask[]>([]);

  const [task, setTask] = useState<ITask | undefined>(undefined)
  const [opened, { open, close }] = useDisclosure(false);

  // Get all tasks 
  const fetchTasks = () => axios.get("/task").then(res => {
    setListOfTasks(res.data)
    return res.data
  })

  // Delete task by Id
  const deleteTask = (id: string) => axios.delete("/task/" + id).then(() => fetchTasks())

  const completeTask = (id: string) => axios.post("/task/" + id + "/complete").then(() => fetchTasks())

  useEffect(() => {
    setIsLoading(true)

    fetchTasks().finally(() => setIsLoading(false))
  }, [])

  const fetchTaskById = (id: string) => axios.get("/task/" + id).then((res) => {
    setTask(res.data)
  }).catch(err => {
    console.error(err);
  })
  return (
    <Container size="lg">
      <Modal opened={opened} onClose={close} title="Edit task">
        <TaskForm fetchTasks={fetchTasks} editTask={task} modalClose={close} />
      </Modal>
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <Box py="md" pos="relative">
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{ color: 'pink', type: 'bars' }}
            />
            {listOfTasks.map((t, index) => <Alert key={index} my="xs" title={<Text td={t.isCompleted ? "line-through" : undefined}>{t.name}</Text>} variant="light" >
              <Flex justify="space-around" w={100}>
                <ActionIcon onClick={() => deleteTask(t._id)}>
                  <IconTrash />
                </ActionIcon>
                <ActionIcon onClick={() => {
                  setTask(undefined)
                  fetchTaskById(t._id).then(() => {
                    open()
                  })
                }}>
                  <IconEdit />
                </ActionIcon>
                <ActionIcon onClick={() => { completeTask(t._id) }}>
                  <IconCheck />
                </ActionIcon>
              </Flex>
            </Alert>)}
          </Box>
        </Grid.Col>
        <Grid.Col span={{ md: 12, lg: 8 }}>
          <TaskForm fetchTasks={fetchTasks} />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default App
