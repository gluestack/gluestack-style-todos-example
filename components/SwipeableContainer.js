import React, { useState, useRef, useEffect } from "react";
import Hoverable from "../ui-components/Hoverable";
import Checkbox from "../ui-components/Checkbox";
import Txt from "../ui-components/Txt";
import { Swipeable } from "react-native-gesture-handler";
import Button from "../ui-components/Button";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
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
export default SwipeableContainer;
