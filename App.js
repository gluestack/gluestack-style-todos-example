import React, { useState } from "react";
import { styled, StyledProvider } from "@dank-style/react";
import { config } from "./dank.config";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Box = styled(View, {
  w: "$full",
});
const Input = styled(TextInput, {
  outline: "none",
  w: "$full",
});
const Txt = styled(Text, {
  color: "$textDark50",
  fontWeight: "$normal",
});
const Button = styled(Pressable, {
  alignItems: "center",
  justifyContent: "center",
});

const HStack = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  w: "$full",
});
const VStack = styled(View, {
  flexDirection: "column",
  justifyContent: "space-between",
  w: "$full",
});
const RootView = styled(GestureHandlerRootView, {});
const defaultTodos = [
  {
    id: 1,
    task: "Schedule the next meeting.",
    completed: false,
    isOpen: false,
  },
  {
    id: 2,
    task: "Share the agenda with the person.",
    completed: false,
    isOpen: false,
  },
  {
    id: 3,
    task: "Review previous meeting notes..",
    completed: false,
    isOpen: false,
  },
  {
    id: 4,
    task: "Prepare any feedback or updates..",
    completed: false,
    isOpen: false,
  },
  {
    id: 5,
    task: "Review progress on goals and projects.",
    completed: false,
    isOpen: false,
  },
  {
    id: 6,
    task: "Ask challenges and discuss.",
    completed: false,
    isOpen: false,
  },
  {
    id: 7,
    task: "Discuss needs or training opportunities.",
    completed: false,
    isOpen: false,
  },
];

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <Button onPress={onChange}>
      <Icon
        name={checked ? "check-square" : "square-o"}
        size={20}
        color={checked ? "#0077E6" : "#888"}
      />
    </Button>
  );
};
const App = () => {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState(defaultTodos);
  const toggleCheckbox = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  const toggleIsOpen = (side, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isOpen: !todo.isOpen } : todo
    );
    setTodos(updatedTodos);
  };
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const swipeFromRight = (id) => {
    return (
      <Button
        mt="$2"
        h="$10"
        p="$3"
        bg="$error900"
        borderRightRadius="$md"
        onPress={() => handleDelete(id)}
      >
        <Icon name="trash-o" size={12} color="white" />
      </Button>
    );
  };

  const ProgressBar = ({ totalTasks, completedTasks }) => {
    const getProgress = () => {
      if (totalTasks === 0) {
        return 0;
      }
      return (completedTasks / totalTasks) * 100;
    };

    return (
      <Box w="$full" h="$1" bg="$backgroundDark700" borderRadius="$md">
        <Box
          h="100%"
          bg="$primary400"
          borderRadius="$md"
          w={`${getProgress()}%`}
        />
      </Box>
    );
  };
  const getCompletedTasks = () => {
    let complete = 0;
    todos.forEach((item) => {
      if (item.completed) {
        complete++;
      }
    });
    return complete;
  };
  const getDay = () => {
    const currentDate = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = daysOfWeek[currentDate.getDay()];
    return currentDay;
  };
  return (
    <StyledProvider config={config}>
      <RootView w="$full">
        <Box
          sx={{
            "@base": {},
            "@md": {
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          h="$full"
          bg="$black"
        >
          <Box
            py="$7"
            px="$10"
            sx={{
              "@base": {
                h: "%full",
                w: "$full",
              },
              "@md": {
                h: 700,
                w: 700,
                bg: "$backgroundDark900",
              },
            }}
            overflowY="auto"
            flexDirection="column"
          >
            <Txt color="$dark900" fontWeight="$bold" fontSize="$xl">
              {getDay()}
            </Txt>
            <HStack mt="$6" alignItems="center">
              <ProgressBar
                completedTasks={getCompletedTasks()}
                totalTasks={todos.length}
              />
              <Txt ml="$2" fontWeight="$normal" fontSize="$xs">
                {todos.length > 0
                  ? ((getCompletedTasks() / todos.length) * 100).toFixed()
                  : 0}
                %
              </Txt>
            </HStack>

            <VStack mt="$5">
              {todos.map((todo) => (
                <Swipeable
                  key={todo.id}
                  onSwipeableWillOpen={(side) => {
                    toggleIsOpen(side, todo.id);
                  }}
                  onSwipeableClose={(side) => {
                    toggleIsOpen(side, todo.id);
                  }}
                  renderRightActions={() => {
                    return swipeFromRight(todo.id);
                  }}
                >
                  <HStack
                    h="$10"
                    py="$3"
                    sx={{
                      "@base": {
                        bg: todo.isOpen ? "$backgroundDark700" : "$black",
                      },
                      "@md": {
                        bg: todo.isOpen
                          ? "$backgroundDark700"
                          : "$backgroundDark900",
                      },
                    }}
                    key={todo.id}
                    mt="$2"
                  >
                    <Checkbox
                      label={item.task}
                      checked={todo.completed}
                      onChange={() => toggleCheckbox(todo.id)}
                    />
                    <Txt
                      textDecorationLine={
                        todo.completed ? "line-through" : "none"
                      }
                      color="$textDark50"
                      ml="$2"
                      w="$full"
                      fontSize="$sm"
                      fontWeight="$normal"
                    >
                      {todo.task}
                    </Txt>
                  </HStack>
                </Swipeable>
              ))}
            </VStack>
            <HStack alignItems="center" h="$10" py="$3" mt="$2">
              <Checkbox />
              <Input
                pl="$2"
                pb="$1"
                color="$textDark50"
                value={item}
                placeholder="|"
                onChangeText={(val) => {
                  setItem(val);
                }}
              />
            </HStack>

            <Button
              onPress={() => {
                if (item != "")
                  setTodos([
                    ...todos,
                    {
                      id: Math.random(),
                      task: item,
                      completed: false,
                      isOpen: false,
                    },
                  ]);
                setItem("");
                console.log("list is ", todos);
              }}
            >
              <HStack alignItems="center" h="$5" mt="$4">
                <Icon name="plus" size={12} color="white" />
                <Txt ml="$2" fontSize="$sm">
                  Add Task
                </Txt>
              </HStack>
            </Button>
          </Box>
        </Box>
      </RootView>
    </StyledProvider>
  );
};

export default App;
