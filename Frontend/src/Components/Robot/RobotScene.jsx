import { Canvas } from "@react-three/fiber";

import Robot from "./Robot";

const RobotScene = ({ onRobotClick, isAssistantOpen, robotAction }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        position: [0, 1, 8],
        fov: 45,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <ambientLight intensity={1} />

      <directionalLight position={[5, 5, 5]} intensity={2} />

      <directionalLight position={[-3, 2, 2]} intensity={0.6} />

      <Robot
        onRobotClick={onRobotClick}
        isAssistantOpen={isAssistantOpen}
        robotAction={robotAction}
      />
    </Canvas>
  );
};

export default RobotScene;
