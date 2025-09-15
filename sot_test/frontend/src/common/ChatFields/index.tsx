import React, { useState } from "react";
import Input from "../../components/Input";

const ChatFields: React.FC<any> = ({ handleSendCommented }) => {
  const [inputs, setInputs] = useState<string>("");
  return (
    
    <Input
      value={inputs}
      onChange={(e: any) =>
        setInputs((prev: any) => ({ ...prev, userName: e.target.value }))
      }
      placeholder="Username"
      aria-label="Room name input"
    />
  );
};

export default ChatFields;
