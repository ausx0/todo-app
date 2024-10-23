import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  Box,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  LinearProgress,
  Menu,
  CardHeader,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { addTodo, deleteTodo, updateTodo } from "../features/todos/todosSlice";
import { selectTodosBySearch } from "../features/todos/todosSelectors";
import { RootState } from "../store";
import { Todo } from "../interfaces";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";

const TodoList: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const todos = useSelector((state: RootState) =>
    selectTodosBySearch(state, searchTerm)
  );

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const completionPercentage = totalTodos
    ? Math.round((completedTodos / totalTodos) * 100)
    : 0;

  const { control, handleSubmit, register, reset } = useForm<Todo>({
    defaultValues: {
      task: selectedTodo?.task || "",
      description: selectedTodo?.description || "",
      priority: selectedTodo?.priority || "medium",
      tags: selectedTodo?.tags || [],
    },
  });

  const handleOpen = () => {
    setOpen(true);
    if (selectedTodo) {
      reset({
        task: selectedTodo.task,
        description: selectedTodo.description,
        priority: selectedTodo.priority,
        tags: selectedTodo.tags || [],
      });
    } else {
      reset({
        task: "",
        description: "",
        priority: "medium",
        tags: [],
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTodo(null);
    reset();
  };

  const onSubmit = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      id: selectedTodo ? selectedTodo.id : Date().toString(),
      completed: selectedTodo ? selectedTodo.completed : false,
      createdAt: selectedTodo ? selectedTodo.createdAt : new Date(),
    };

    if (selectedTodo) {
      dispatch(updateTodo({ ...selectedTodo, ...data }));
    } else {
      dispatch(addTodo(newTodo));
    }

    setSelectedTodo(null);
    handleClose();
    reset();
  };

  const handleContextMenu = (event: React.MouseEvent, todo: Todo) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
    setSelectedTodo(todo);
  };

  const handleMenuClick = (action: string) => {
    if (selectedTodo) {
      if (action === "delete") {
        dispatch(deleteTodo(selectedTodo.id));
        setSelectedTodo(null);
        reset();
      } else if (action === "toggleComplete") {
        dispatch(
          updateTodo({ ...selectedTodo, completed: !selectedTodo.completed })
        );
        setSelectedTodo(null);
      } else if (action === "edit") {
        handleOpen();
      }
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        {t("Todos")}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" align="center">
          {t("Completion")}: {completionPercentage}%
        </Typography>
        <LinearProgress variant="determinate" value={completionPercentage} />
      </Box>

      <TextField
        label={t("SearchTodos")}
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: "100%" }}
      />
      <IconButton
        color="primary"
        aria-label={t("AddTodo")}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        <AddIcon />
      </IconButton>

      <Grid container spacing={2}>
        {todos.map((todo) => {
          console.log(todo.priority); // Log the current todo object
          return (
            <Grid item xs={12} sm={6} md={4} key={todo.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  onContextMenu={(e) => handleContextMenu(e, todo)}
                  sx={{
                    borderLeft: todo.completed
                      ? "5px solid #4caf50"
                      : "5px solid #ff9800",
                  }}
                >
                  <CardHeader
                    action={
                      <IconButton onClick={(e) => handleContextMenu(e, todo)}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Typography variant="h6">{todo.task}</Typography>
                    <Typography variant="body2">
                      {t("Priority")}: {t(todo.priority)}{" "}
                      {/* Translate the priority value */}
                    </Typography>
                    {todo.description && (
                      <Typography variant="body2">
                        {todo.description}
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: todo.completed ? "green" : "red",
                      }}
                    >
                      {todo.completed ? t("Completed") : t("NotCompleted")}
                    </Typography>
                    {todo.tags && todo.tags.length > 0 && (
                      <Box>
                        {todo.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={t(tag)} // Translate each tag value
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMenuClick("edit")}>{t("Edit")}</MenuItem>
        <MenuItem onClick={() => handleMenuClick("toggleComplete")}>
          {selectedTodo?.completed
            ? t("MarkasNotCompleted")
            : t("MarkasCompleted")}
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("delete")}>
          {t("Delete")}
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedTodo ? t("EditTodo") : t("AddNewTodo")}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("task")}
              autoFocus
              margin="normal"
              label={t("Task")}
              fullWidth
              variant="outlined"
              required
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label={t("Description")}
                  fullWidth
                  variant="outlined"
                  required
                />
              )}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="priority-label">{t("Priority")}</InputLabel>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="priority-label"
                    label={t("Priority")}
                    required
                  >
                    <MenuItem value="low">{t("low")}</MenuItem>
                    <MenuItem value="medium">{t("medium")}</MenuItem>
                    <MenuItem value="high">{t("high")}</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="tags-label">{t("Tags")}</InputLabel>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="tags-label"
                    label={t("Tags")}
                    multiple
                    required
                    input={<OutlinedInput label={t("Tags")} />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        {(selected as string[]).map((value) => (
                          <Chip
                            key={value}
                            label={t(value)}
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="urgent">{t("urgent")}</MenuItem>
                    <MenuItem value="home">{t("home")}</MenuItem>
                    <MenuItem value="work">{t("work")}</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
          >
            {selectedTodo ? t("UpdateTodo") : t("AddTodo")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
