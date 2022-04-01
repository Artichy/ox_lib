import React from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { Box, Flex, ScaleFade } from "@chakra-ui/react";
import { debugData } from "../utils/debugData";
import ReactMarkdown from "react-markdown";

interface Props {
  text: string;
  position?: "right-center" | "left-center" | "top-center";
  style?: React.CSSProperties;
}

debugData([
  {
    action: "textUi",
    data: {
      text: "[E] - Access locker inventory \n [G] - Do something else  \n ",
      position: "right-center",
    },
  },
]);

const TextUI: React.FC = () => {
  const [data, setData] = React.useState<Props>({
    text: "",
    position: "right-center",
  });
  const [visible, setVisible] = React.useState(false);

  useNuiEvent<Props>("textUi", (data) => {
    setData(data);
    setVisible(true);
  });

  useNuiEvent("textUiHide", () => setVisible(false));

  return (
    <Flex
      w="100%"
      h="100%"
      p={3}
      position="absolute"
      alignItems={data.position === "top-center" ? "baseline" : "center"}
      justifyContent={
        data.position === "right-center"
          ? "flex-end"
          : data.position === "left-center"
          ? "flex-start"
          : "center"
      }
    >
      <ScaleFade in={visible} unmountOnExit>
        <Box
          bg="gray.700"
          boxShadow="lg"
          p={3}
          fontFamily="DM Mono"
          style={data.style}
          borderRadius="md"
          maxW="xs"
        >
          <ReactMarkdown>{data.text}</ReactMarkdown>
        </Box>
      </ScaleFade>
    </Flex>
  );
};

export default TextUI;
