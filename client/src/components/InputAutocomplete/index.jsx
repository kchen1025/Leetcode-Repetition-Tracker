import { Autocomplete } from "@mui/joy";

const InputAutocomplete = ({ options, placeholder = null }) => {
  return (
    <Autocomplete
      placeholder={placeholder || "Select an option"}
      options={options}
      sx={{ width: 300 }}
    />
  );
};

export default InputAutocomplete;
