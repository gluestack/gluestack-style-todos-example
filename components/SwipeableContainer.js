import React, { useState, useRef, useEffect } from "react";
import { Checkbox, Input, Hoverable, Button, Txt } from "../ui-components";
import { Swipeable } from "react-native-gesture-handler";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

const SwipeableContainer = ({
  todo,
  todos,
  setTodos,
  swipedItemId,
  setSwipedItemId,
  editItemId,
  setEditItemId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const [editItem, setEditItem] = useState(todo.task);
  const swipeableRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (swipedItemId !== null && swipedItemId !== todo.id) {
      swipeableRef.current.close();
    }
  });

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
  const handleEdit = (id) => {
    setEditItemId(null);
    if (editItem != "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, item: editItem } : todo
      );
      setTodos(updatedTodos);
    }
  };
  const handleDoubleTap = () => {
    const now = Date.now();
    if (!lastTap) {
      setLastTap(now);
    } else {
      if (now - lastTap < 700) {
        setEditItemId(todo.id);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      }
      setLastTap(null);
    }
  };
  const handleSwipeStart = () => {
    if (todo.id !== swipedItemId) setSwipedItemId(todo.id);
    setIsOpen(true);
  };

  const handleSwipeClose = () => {
    setSwipedItemId(null);
    setIsOpen(false);
  };
  const renderRightActions = (progress, dragX) => {
    if (swipedItemId !== null && swipedItemId !== todo.id) {
      return null;
    }
    return (
      <Button
        zIndex={9999}
        h="100%"
        p="$3"
        bg="$error900"
        borderRightRadius="$md"
        onPress={() => handleDelete(todo.id)}
      >
        <EvilIconsIcon name="trash" size={18} color="white" />
      </Button>
    );
  };

  return (
    <Swipeable
      key={todo.id}
      onSwipeableWillOpen={handleSwipeStart}
      onSwipeableWillClose={handleSwipeClose}
      renderRightActions={renderRightActions}
      ref={swipeableRef}
      friction={1}
    >
      <Hoverable
        px="$6"
        py="$2"
        minHeight={38}
        flexDirection="row"
        bg={isOpen ? "$backgroundDark700" : "$backgroundDark900"}
        key={todo.id}
        alignItems="center"
        onPress={handleDoubleTap}
      >
        <Checkbox
          label={todo.task}
          checked={todo.completed}
          onChange={() => toggleCheckbox(todo.id)}
        />
        {editItemId != todo.id ? (
          <Txt
            textDecorationLine={todo.completed ? "line-through" : "none"}
            color="$textDark50"
            ml="$2"
            w="100%"
            lineHeight="$md"
            fontSize="$sm"
            fontWeight="$normal"
          >
            {editItem}
          </Txt>
        ) : (
          <Input
            editable={!isOpen}
            minHeight={22}
            pl="$2"
            color="$textDark50"
            value={editItem}
            textDecorationLine={todo.completed ? "line-through" : "none"}
            placeholder=""
            onChangeText={(val) => {
              setEditItem(val);
            }}
            onSubmitEditing={() => {
              handleEdit(todo.id);
            }}
            ref={inputRef}
          />
        )}
      </Hoverable>
    </Swipeable>
  );
};
export default SwipeableContainer;
