import { useGLTF, useAnimations } from "@react-three/drei";

import { useCallback, useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

const MODEL_PATH = "/models/robot.glb";

const ANIMATIONS = {
  IDLE: "RobotArmature|Robot_Idle",
  WAVE: "RobotArmature|Robot_Wave",
  THUMBS_UP: "RobotArmature|Robot_ThumbsUp",
  YES: "RobotArmature|Robot_Yes",
  NO: "RobotArmature|Robot_No",
  JUMP: "RobotArmature|Robot_Jump",
  DANCE: "RobotArmature|Robot_Dance",
  SITTING: "RobotArmature|Robot_Sitting",
  STANDING: "RobotArmature|Robot_Standing",
};

const Robot = ({
  onRobotClick,
  isAssistantOpen = false,
  robotAction = null,
}) => {
  const groupRef = useRef(null);

  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  const isBusyRef = useRef(false);

  const animationTimerRef = useRef(null);

  const lastRobotActionRef = useRef(null);

  const { scene, animations } = useGLTF(MODEL_PATH);

  const { actions } = useAnimations(animations, groupRef);

  // ==========================================
  // STOP ALL ANIMATIONS
  // ==========================================

  const stopAllAnimations = useCallback(() => {
    if (!actions) return;

    Object.values(actions).forEach((action) => {
      if (!action) return;

      action.stop();
      action.reset();
    });
  }, [actions]);

  // ==========================================
  // IDLE
  // ==========================================

  const playIdle = useCallback(() => {
    if (!actions) return;

    const idle = actions[ANIMATIONS.IDLE];

    if (!idle) {
      console.warn("Robot idle animation not found.");
      return;
    }

    stopAllAnimations();

    idle.reset();

    idle.setLoop(THREE.LoopRepeat, Infinity);

    idle.clampWhenFinished = false;

    idle.fadeIn(0.2);
    idle.play();

    isBusyRef.current = false;
  }, [actions, stopAllAnimations]);

  // ==========================================
  // PLAY REACTION
  // ==========================================

  const playReaction = useCallback(
    (animationName, onComplete) => {
      if (!actions) {
        return false;
      }

      const animation = actions[animationName];

      if (!animation) {
        console.warn(`Robot animation "${animationName}" not found.`);

        return false;
      }

      // Clear previous timer
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);

        animationTimerRef.current = null;
      }

      isBusyRef.current = true;

      stopAllAnimations();

      animation.reset();

      animation.setLoop(THREE.LoopOnce, 1);

      animation.clampWhenFinished = true;

      animation.fadeIn(0.15);
      animation.play();

      const duration = animation.getClip().duration * 1000;

      animationTimerRef.current = setTimeout(() => {
        animation.fadeOut(0.15);

        animationTimerRef.current = null;

        playIdle();

        onComplete?.();
      }, duration);

      return true;
    },
    [actions, playIdle, stopAllAnimations],
  );

  // ==========================================
  // INITIAL IDLE
  // ==========================================

  useEffect(() => {
    if (!actions) return;

    playIdle();

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);

        animationTimerRef.current = null;
      }

      stopAllAnimations();
    };
  }, [actions, playIdle, stopAllAnimations]);

  // ==========================================
  // MOUSE TRACKING
  // ==========================================

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;

      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ==========================================
  // SMOOTH MOUSE FOLLOW
  // ==========================================

  useFrame(() => {
    if (!groupRef.current) return;

    const targetY = mouseRef.current.x * 0.35;

    const targetX = mouseRef.current.y * 0.12;

    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.05;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.05;
  });

  // ==========================================
  // CLICK → WAVE → OPEN CHAT
  // ==========================================

  const handleClick = useCallback(() => {
    if (isAssistantOpen) {
      return;
    }

    if (isBusyRef.current) {
      return;
    }

    playReaction(ANIMATIONS.WAVE, () => {
      onRobotClick?.();
    });
  }, [isAssistantOpen, onRobotClick, playReaction]);

  // ==========================================
  // PARENT ROBOT ACTION
  // ==========================================

  useEffect(() => {
    if (!robotAction) {
      return;
    }

    if (lastRobotActionRef.current === robotAction) {
      return;
    }

    lastRobotActionRef.current = robotAction;

    const actionMap = {
      wave: ANIMATIONS.WAVE,
      thumbsUp: ANIMATIONS.THUMBS_UP,
      yes: ANIMATIONS.YES,
      no: ANIMATIONS.NO,
      jump: ANIMATIONS.JUMP,
      dance: ANIMATIONS.DANCE,
      sitting: ANIMATIONS.SITTING,
      standing: ANIMATIONS.STANDING,
    };

    const animationName = actionMap[robotAction];

    if (!animationName) {
      console.warn("Unknown robot action:", robotAction);

      return;
    }

    // Answer reaction should always be allowed.
    playReaction(animationName);
  }, [robotAction, playReaction]);

  // ==========================================
  // RESET ACTION
  // ==========================================

  useEffect(() => {
    if (!robotAction) {
      lastRobotActionRef.current = null;
    }
  }, [robotAction]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <group ref={groupRef} onClick={handleClick}>
      <primitive object={scene} scale={0.4} position={[0, 0, 0]} />
    </group>
  );
};

useGLTF.preload(MODEL_PATH);

export default Robot;
