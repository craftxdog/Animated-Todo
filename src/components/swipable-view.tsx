import React from "react";
import { Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Box } from "native-base";
import { makeStyledComponent } from "../utils/styled";

const StyledView = makeStyledComponent(Animated.View);

interface Props {
  children: React.ReactNode;
  backView?: React.ReactNode;
  onSwipeLeft?: () => void;
  simultaneousHandlers?: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const SwipeView = (props: Props) => {
  const { children, backView, onSwipeLeft, simultaneousHandlers } = props;
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.max(-128, Math.min(0, event.translationX));
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        onSwipeLeft && runOnJS(onSwipeLeft)();
      } else {
        translateX.value = withTiming(0);
      }
    });

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StyledView w="full">
        {backView && (
          <Box position="absolute" left={0} right={0} top={0} bottom={0}>
            {backView}
          </Box>
        )}
        <GestureDetector gesture={panGesture}>
          <StyledView style={facadeStyle}>{children}</StyledView>
        </GestureDetector>
      </StyledView>
    </GestureHandlerRootView>
  );
};

export default SwipeView;
