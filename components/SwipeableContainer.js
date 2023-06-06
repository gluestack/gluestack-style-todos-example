import React, { useState, useRef, useEffect } from "react";
import Hoverable from "../ui-components/Hoverable";
import Checkbox from "../ui-components/Checkbox";
import Txt from "../ui-components/Txt";
import { Swipeable } from "react-native-gesture-handler";
import Button from "../ui-components/Button";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import Input from "../ui-components/Input";
const SwipeableContainer = ({ todo, todos, setTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastTap, setLastTap] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState(todo.task);
  const inputRef = useRef(null);
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
    setIsEdit(false);
    console.log("isEdit value", isEdit);
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
        setIsEdit(true);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      }
      setLastTap(null);
    }
  };

  const swipeFromRight = (id) => {
    return (
      <Button
        h="100%"
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
        onPress={handleDoubleTap}
        px="$6"
        py="$2"
        minHeight={38}
        flexDirection="row"
        bg={isOpen ? "$backgroundDark700" : "backgroundDark900"}
        key={todo.id}
        alignItems="center"
      >
        <Checkbox
          label={todo.task}
          checked={todo.completed}
          onChange={() => toggleCheckbox(todo.id)}
        />

        {!isEdit ? (
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
            minHeight={22}
            pl="$2"
            color="$textDark50"
            value={editItem}
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
