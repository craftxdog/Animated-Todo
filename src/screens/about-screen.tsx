import { Text, useColorModeValue } from "native-base";
import AnimatedColorBox from "../components/animated-color-box";

export default function AboutScreen() {
  return (
    <>
      <AnimatedColorBox
        flex={1}
        bg={useColorModeValue("warmGray.50", "primary.900")}
        w="full"
      >
        <Text>Hello world !</Text>
      </AnimatedColorBox>
    </>
  );
}
