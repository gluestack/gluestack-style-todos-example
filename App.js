import React, { useState, useRef, useEffect } from "react";
import { styled, StyledProvider } from "@gluestack-style/react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { config } from "./gluestack-style.config";
import shortid from "shortid";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {
  HStack,
  VStack,
  Checkbox,
  Input,
  Button,
  Txt,
  StyledScrollView,
} from "./ui-components";
import ProgressBar from "./components/ProgressBar";
import SwipeableContainer from "./components/SwipeableContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getCompletedTasks, getDay, defaultTodos } from "./utils";
const RootView = styled(GestureHandlerRootView, {});
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView, {});
const StyledSafeArea = styled(SafeAreaView, {});
const App = () => {
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState(defaultTodos);
  const [swipedItemId, setSwipedItemId] = useState(null);
  const [lastItemSelected, setLastItemSelected] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const inputRef = useRef(null);

  const addTodo = () => {
    if (item != "") {
      setTodos([
        ...todos,
        {
          id: shortid.generate(),
          task: item,
          completed: lastItemSelected,
        },
      ]);
      setItem("");
      setLastItemSelected(false);
    }
  };

  return (
    <StyledProvider config={config}>
      <StyledKeyboardAvoidingView
        w="100%"
        h="100%"
        bg="$backgroundDark900"
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <StyledSafeArea
          sx={{
            "@base": {
              bg: "backgroundDark900",
            },
            "@md": {
              bg: "$black",
            },
          }}
          w="100%"
          h="100%"
        >
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
                    completedTasks={getCompletedTasks(todos, lastItemSelected)}
                    totalTasks={todos.length + 1}
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
                    swipedItemId={swipedItemId}
                    setSwipedItemId={setSwipedItemId}
                    editItemId={editItemId}
                    setEditItemId={setEditItemId}
                    imputRef={inputRef}
                  />
                ))}
              </VStack>
              <VStack px="$6">
                <HStack minHeight={38} alignItems="center" py="$2">
                  <Checkbox
                    checked={lastItemSelected}
                    onChange={() => setLastItemSelected(!lastItemSelected)}
                  />
                  <Input
                    h={22}
                    pl="$2"
                    color="$textDark50"
                    value={item}
                    placeholder=""
                    textDecorationLine={
                      lastItemSelected ? "line-through" : "none"
                    }
                    onChangeText={(val) => {
                      setItem(val);
                    }}
                    onSubmitEditing={addTodo}
                    autoCompleteType="off"
                    ref={inputRef}
                  />
                </HStack>

                <Button
                  mb="$32"
                  sx={{
                    "@md": {
                      mb: 0,
                    },
                  }}
                  onPress={() => {
                    addTodo();
                    setTimeout(() => {
                      inputRef.current.focus();
                    }, 100);
                  }}
                >
                  <HStack alignItems="center" mt="$4">
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
      </StyledKeyboardAvoidingView>
    </StyledProvider>
  );
};

export default App;
