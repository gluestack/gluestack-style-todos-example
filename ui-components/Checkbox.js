import Button from "./Button";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
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
export default Checkbox;
