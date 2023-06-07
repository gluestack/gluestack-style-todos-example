import React, { useState, useRef, useEffect } from "react";
import { styled, StyledProvider } from "@gluestack-style/react";
import { SafeAreaView } from "react-native";
import { config } from "./gluestack-style.config";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Box from "./ui-components/Box";
import Button from "./ui-components/Button";
import Input from "./ui-components/Input";
import Txt from "./ui-components/Txt";
import Checkbox from "./ui-components/Checkbox";
import HStack from "./ui-components/HStack";
import VStack from "./ui-components/VStack";
import StyledScrollView from "./ui-components/StyleScrollView";
import ProgressBar from "./components/ProgressBar";
import SwipeableContainer from "./components/SwipeableContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import defaultTodos from "./utils/defaultTodos";
import getDay from "./utils/getDay";
import getCompletedTasks from "./utils/getCompletedTasks";
const RootView = styled(GestureHandlerRootView, {});
const StyledSafeArea = styled(SafeAreaView, {});
const App = () => {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState(defaultTodos);
  const [newTask, setNewTask] = useState(false);

  const inputRef = useRef(null);

  const addTodo = () => {
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
      setNewTask(false);
    }
  };

  return (
    <StyledProvider config={config}>
      <StyledSafeArea bg="$black" w="100%">
        <RootView
          w="100%"
          minHeight="100%"
          sx={{
            "@md": {
              justifyContent: "center",
              alignItems: "center",
              bg: "$black",
            },
          }}
        >
          <StyledScrollView
            pt="$6"
            pb="$10"
            bg="$backgroundDark900"
            sx={{
              "@base": {
                w: "100%",
                //   height: "100%",
              },
              "@md": {
                w: 700,
                maxHeight: 500,
                borderRadius: "$sm",
              },
            }}
            flexDirection="column"
          >
            <VStack px="$6">
              <Txt color="$dark900" fontWeight="$bold" fontSize="$xl">
                {getDay()}
              </Txt>
              <HStack my="$4" alignItems="center">
                <ProgressBar
                  completedTasks={getCompletedTasks(todos)}
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
                  imputRef={inputRef}
                />
              ))}
            </VStack>
            <VStack px="$6">
              {newTask ? (
                <HStack minHeight={38} alignItems="center" py="$2">
                  <Checkbox />
                  <Input
                    h={22}
                    pl="$2"
                    color="$textDark50"
                    value={item}
                    placeholder=""
                    onChangeText={(val) => {
                      setItem(val);
                    }}
                    onSubmitEditing={() => {
                      addTodo();
                    }}
                    ref={inputRef}
                  />
                </HStack>
              ) : null}

              <Button
                mb="$32"
                sx={{
                  "@md": {
                    mb: 0,
                  },
                }}
                onPress={() => {
                  if (!newTask) setNewTask(true);
                  setTimeout(() => {
                    inputRef.current.focus();
                  }, 100);
                }}
              >
                <HStack alignItems="center" h="$5">
                  <AntDesignIcon name="plus" size={14} color="#737373" />
                  <Txt ml="$2" fontSize="$sm">
                    Add Task
                  </Txt>
                </HStack>
              </Button>
            </VStack>
          </StyledScrollView>
        </RootView>
      </StyledSafeArea>
    </StyledProvider>
  );
};

export default App;
