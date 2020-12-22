import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const MessageField = (props) => {
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };
  return (
    <Container style={{ textAlign: "right" }}>
      <TextField
        variant="outlined"
        color="primary"
        margin="dense"
        type="text"
        name="message"
        fullWidth
        value={message}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setMessage("");
          props.sendMessage(message);
        }}
      >
        Send
      </Button>
    </Container>
  );
};

export default MessageField;
