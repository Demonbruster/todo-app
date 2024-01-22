import { ActionIcon, Container, Grid, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import axios from "./axiosClient"
import { IconPlus } from "@tabler/icons-react"


function App() {
  const form = useForm({
    initialValues: {
      task: ""
    },
    validate: {
      task: (value) => value === "" || value === undefined && "Please fill task"
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitHandler = (formData: unknown) => {
    const { task } = formData as { task: string }
    axios.post("/task", {
      task,
    }).then((res) => {
      if (res.data === 'created') {
        form.reset()
      }
    })
  }

  return (
    <Container size="lg">
      <form onSubmit={form.onSubmit((va) => onSubmitHandler(va))}>
        <Grid>
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
