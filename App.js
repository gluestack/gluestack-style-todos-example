import React, { useState, useRef, useEffect } from "react";
import { styled, StyledProvider } from "@dank-style/react";
import { config } from "./dank.config";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

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

const StyledPressable = styled(Pressable, {});

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
  },
  {
    id: 2,
    task: "Share the agenda with the person.",
    completed: false,
  },
  {
    id: 3,
    task: "Review previous meeting notes..",
    completed: false,
  },

  {
    id: 4,
    task: "Prepare any feedback or updates..",
    completed: false,
  },
  {
    id: 5,
    task: "Review progress on goals and projects.",
    completed: false,
  },
  {
    id: 6,
    task: "Ask challenges and discuss.",
    completed: false,
  },
  {
    id: 7,
    task: "Discuss needs or training opportunities.",
    completed: false,
  },
];

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <Button
      w="$4"
      h="$4"
      bg={checked ? "$primary500" : "transparent"}
      borderWidth={checked ? 0 : 2}
      borderRadius="$sm"
      borderColor="$borderDark500"
      onPress={onChange}
    >
      {checked && (
        <FontAwesome5Icon
          name={checked ? "check" : "check"}
          size={10}
          color="#171717"
        />
      )}
    </Button>
  );
};

const Hoverable = ({ children, ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <StyledPressable
      states={{
        hover,
      }}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      sx={{
        ":hover": {
          bg: "$backgroundDark700",
        },
      }}
      {...props}
    >
      {children}
    </StyledPressable>
  );
};

const SwipeableContainer = ({ todo, todos, setTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const toggleCheckbox = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  const swipeFromRight = (id) => {
    return (
      <Button
        h="$full"
        p="$3"
        bg="$error900"
        borderRightRadius="$md"
        onPress={() => handleDelete(id)}
      >
        <EvilIconsIcon name="trash" size={18} color="white" />
      </Button>
    );
  };
  return (
    <Swipeable
      key={todo.id}
      onSwipeableOpen={(side) => {
        setIsOpen(true);
      }}
      onSwipeableClose={(side) => {
        setIsOpen(false);
      }}
      renderRightActions={() => {
        return swipeFromRight(todo.id);
      }}
    >
      <Hoverable
        px="$6"
        flexDirection="row"
        // h="$10"
        py="$2"
        bg={isOpen ? "$backgroundDark700" : "$backgroundDark900"}
        key={todo.id}
        alignItems="center"
      >
        <Checkbox
          label={todo.task}
          checked={todo.completed}
          onChange={() => toggleCheckbox(todo.id)}
        />
        <Txt
          textDecorationLine={todo.completed ? "line-through" : "none"}
          color="$textDark50"
          ml="$2"
          w="$full"
          lineHeight="$md"
          fontSize="$sm"
          fontWeight="$normal"
        >
          {todo.task}
        </Txt>
      </Hoverable>
    </Swipeable>
  );
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

const App = () => {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState(defaultTodos);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const addTodo = () => {
    inputRef.current.focus();
    if (item != "") {
      setTodos([
        ...todos,
        {
          id: Math.random(),
          task: item,
          completed: false,
        },
      ]);
      setItem("");
    }
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
  const ProgressBar = ({ totalTasks, completedTasks }) => {
    const getProgress = () => {
      if (totalTasks === 0) {
        return 0;
      }
      return (completedTasks / totalTasks) * 100;
    };

    return (
      <HStack w="%full">
        <Box flex={1} h="$1" bg="$backgroundDark700" borderRadius="$md">
          <Box
            h="100%"
            bg="$primary400"
            borderRadius="$md"
            w={`${getProgress()}%`}
          />
        </Box>
        <Txt color="$textDark400" ml="$2" fontWeight="$normal" fontSize="$xs">
          {totalTasks > 0
            ? ((getCompletedTasks() / totalTasks) * 100).toFixed()
            : 0}
          %
        </Txt>
      </HStack>
    );
  };

  return (
    <StyledProvider config={config}>
      <RootView w="$full">
        <Box
          sx={{
            "@base": {
              bg: "$backgroundDark900",
            },
            "@md": {
              justifyContent: "center",
              alignItems: "center",
              bg: "$black",
            },
          }}
          h="$full"
        >
          <Box
            borderRadius="$sm"
            py="$7"
            sx={{
              "@base": {
                h: "%full",
                w: "$full",
              },
              "@md": {
                w: 700,
                bg: "$backgroundDark900",
              },
            }}
            overflowY="auto"
            flexDirection="column"
          >
            <VStack px="$6">
              <Txt color="$dark900" fontWeight="$bold" fontSize="$xl">
                {getDay()}
              </Txt>
              <HStack my="$4" alignItems="center">
                <ProgressBar
                  completedTasks={getCompletedTasks()}
                  totalTasks={todos.length}
                />
              </HStack>
            </VStack>

            <VStack>
              {todos.map((todo, index) => (
                <SwipeableContainer
                  key={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            </VStack>
            <VStack px="$6">
              <HStack alignItems="center" py="$2">
                <Checkbox />
                <Input
                  h="$22"
                  pl="$2"
                  color="$textDark50"
                  value={item}
                  placeholder=""
                  onChangeText={(val) => {
                    setItem(val);
                  }}
                  ref={inputRef}
                />
              </HStack>

              <Button onPress={addTodo}>
                <HStack alignItems="center" h="$5" mt="$4">
                  <AntDesignIcon name="plus" size={14} color="#737373" />
                  <Txt ml="$2" fontSize="$sm">
                    Add Task
                  </Txt>
                </HStack>
              </Button>
            </VStack>
          </Box>
        </Box>
      </RootView>
    </StyledProvider>
  );
};

export default App;
