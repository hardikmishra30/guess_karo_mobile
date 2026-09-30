import { ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface Props {
  /** Whenever this value changes, the children pop in again. */
  trigger: string | number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function PopIn({ trigger, children, style }: Props) {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.spring(anim, { toValue: 1, friction: 6, tension: 140, useNativeDriver: true }).start();
  }, [trigger, anim]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
          transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
