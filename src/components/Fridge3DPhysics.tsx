// 파일명: src/components/Fridge3DPhysics.tsx
import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useIngredient } from "../context/IngredientContext";
import { checkCategory } from "../utils/ingredientUtils";
import type { Ingredient } from "../types/Ingredient";
import * as THREE from "three";

// 1. 🚪 경첩 축(Pivot) 기준 개폐형 메탈 도어
function FridgeDoor({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  const doorGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (doorGroupRef.current) {
      const targetRotation = isOpen ? -Math.PI * 0.6 : 0;
      doorGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        doorGroupRef.current.rotation.y,
        targetRotation,
        0.08
      );
    }
  });

  return (
    <group ref={doorGroupRef} position={[-1.2, 0, 0.9]}>
      <mesh
        position={[1.2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <boxGeometry args={[2.4, 3.8, 0.08]} />
        <meshStandardMaterial 
          color={isOpen ? "#e2e8f0" : "#94a3b8"} 
          metalness={0.8} 
          roughness={0.2}
          opacity={isOpen ? 0.25 : 1.0} 
          transparent
        />
      </mesh>
      <mesh position={[2.2, 0, 0.08]}>
        <boxGeometry args={[0.06, 0.8, 0.06]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 2. 🗄️ 유리 선반이 장착된 미니어처 냉장고 프레임 구조체
function FridgeStructure() {
  const [floor] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1.8, 0] }));
  const [back] = useBox(() => ({ position: [0, 0, -0.8], args: [2.4, 4, 0.1] }));
  const [left] = useBox(() => ({ position: [-1.25, 0, 0.05], args: [0.1, 4, 1.7] }));
  const [right] = useBox(() => ({ position: [1.25, 0, 0.05], args: [0.1, 4, 1.7] }));
  const [top] = useBox(() => ({ position: [0, 1.95, 0.05], args: [2.4, 0.1, 1.7] }));
  
  const [shelf1] = useBox(() => ({ position: [0, -0.6, 0.05], args: [2.4, 0.06, 1.6] }));
  const [shelf2] = useBox(() => ({ position: [0, 0.6, 0.05], args: [2.4, 0.06, 1.6] }));

  return (
    <>
      <mesh ref={floor as any}><planeGeometry args={[10, 10]} /><meshStandardMaterial color="#0f172a" opacity={0.15} transparent /></mesh>
      <mesh ref={back as any}><boxGeometry args={[2.4, 4, 0.1]} /><meshStandardMaterial color="#1e293b" /></mesh>
      <mesh ref={left as any}><boxGeometry args={[0.1, 4, 1.7]} /><meshStandardMaterial color="#334155" /></mesh>
      <mesh ref={right as any}><boxGeometry args={[0.1, 4, 1.7]} /><meshStandardMaterial color="#334155" /></mesh>
      <mesh ref={top as any}><boxGeometry args={[2.4, 0.1, 1.7]} /><meshStandardMaterial color="#334155" /></mesh>
      
      <mesh ref={shelf1 as any}><boxGeometry args={[2.4, 0.06, 1.6]} /><meshStandardMaterial color="#38bdf8" opacity={0.4} transparent roughness={0.1} /></mesh>
      <mesh ref={shelf2 as any}><boxGeometry args={[2.4, 0.06, 1.6]} /><meshStandardMaterial color="#38bdf8" opacity={0.4} transparent roughness={0.1} /></mesh>
    </>
  );
}

// 3. 🥕🥩🥛🥫 카테고리별 정밀 3D 미니어처 식재료 컴포넌트
function SmartIngredient({ 
  item, 
  index, 
  isFridgeOpen, 
  setOrbitEnabled 
}: { 
  item: Ingredient; 
  index: number; 
  isFridgeOpen: boolean;
  setOrbitEnabled: (v: boolean) => void;
}) {
  const { isVegetable, isMeat, isDairy } = checkCategory(item);

  // 💡 드래그 및 호버 상태 관리
  const [isHovered, setIsHovered] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const innerGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  let boxArgs: [number, number, number] = [0.26, 0.28, 0.26];
  if (isVegetable) boxArgs = [0.2, 0.45, 0.2];
  else if (isMeat) boxArgs = [0.45, 0.14, 0.32];
  else if (isDairy) boxArgs = [0.22, 0.38, 0.22];

  const shelfYPositions = [1.2, 0.0, -1.2];
  const targetShelfY = shelfYPositions[index % 3];

  const initialPosition: [number, number, number] = [
    (Math.random() - 0.5) * 0.4,
    isFridgeOpen ? targetShelfY + 0.5 : -1.7,
    (Math.random() - 0.5) * 0.4
  ];

  const [boxRef, api] = useBox(() => ({ 
    mass: 1.2, 
    position: initialPosition, 
    args: boxArgs, 
    restitution: 0.05, 
    friction: 0.3 
  }));

  // 💡 마우스 위치를 3D 공간으로 변환하여 오브젝트 이동 및 스케일 애니메이션 처리
  useFrame(({ mouse }) => {
    // 1) 크기 강조 효과 (Lerp)
    if (innerGroupRef.current) {
      const targetScale = isGrabbed ? 1.25 : isHovered ? 1.1 : 1;
      innerGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }

    // 2) 드래그 물리 처리
    if (isGrabbed) {
      const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      
      const targetZ = 0.5; // 드래그 시 고정될 Z 평면 깊이
      const distance = (targetZ - camera.position.z) / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      api.position.set(pos.x, pos.y, targetZ);
      api.velocity.set(0, 0, 0); // 이동 중 중력 가속도 초기화
      api.angularVelocity.set(0, 0, 0);
    }
  });

  const emissiveColor = isGrabbed ? "#444444" : isHovered ? "#222222" : "#000000";

  // 이벤트 핸들러 모음
  const handlers = {
    onPointerOver: (e: any) => { e.stopPropagation(); setIsHovered(true); },
    onPointerOut: (e: any) => { e.stopPropagation(); setIsHovered(false); },
    onPointerDown: (e: any) => {
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      setIsGrabbed(true);
      setOrbitEnabled(false); // 드래그 중 화면 회전 방지
      api.mass.set(0); // 드래그 중 무중력 상태
    },
    onPointerUp: (e: any) => {
      e.stopPropagation();
      setIsGrabbed(false);
      setOrbitEnabled(true);
      api.mass.set(1.2); // 물리 엔진(중력) 복구
      api.velocity.set(0, 0, 0);
    },
  };

  const renderIngredientShape = () => {
    if (isVegetable) {
      return (
        <group ref={innerGroupRef}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.04, 0.32, 12]} />
            <meshStandardMaterial color="#f97316" roughness={0.5} emissive={emissiveColor} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#22c55e" roughness={0.6} emissive={emissiveColor} />
          </mesh>
        </group>
      );
    }
    if (isMeat) {
      return (
        <group ref={innerGroupRef}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.14, 0.32]} />
            <meshStandardMaterial color="#ef4444" roughness={0.4} emissive={emissiveColor} />
          </mesh>
          <mesh position={[0, 0.075, 0]}>
            <boxGeometry args={[0.3, 0.01, 0.1]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} emissive={emissiveColor} />
          </mesh>
        </group>
      );
    }
    if (isDairy) {
      return (
        <group ref={innerGroupRef}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.28, 0.2]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.3} emissive={emissiveColor} />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <boxGeometry args={[0.2, 0.06, 0.2]} />
            <meshStandardMaterial color="#2563eb" roughness={0.4} emissive={emissiveColor} />
          </mesh>
        </group>
      );
    }
    return (
      <group ref={innerGroupRef}>
        <mesh castShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.26, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} emissive={emissiveColor} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.135, 0.135, 0.12, 16]} />
          <meshStandardMaterial color="#a78bfa" roughness={0.4} emissive={emissiveColor} />
        </mesh>
      </group>
    );
  };

  // 물리 박스(boxRef)에 이벤트를 바인딩하고, 렌더링 형태는 innerGroupRef 내부에서 처리합니다.
  return (
    <group ref={boxRef as any} {...handlers}>
      {renderIngredientShape()}
    </group>
  );
}

// 4. 🧊 메인 3D 인터랙티브 미니어처 엔진 컨테이너
export default function Fridge3DPhysics() {
  const { ingredients } = useIngredient();
  const [isOpen, setIsOpen] = useState(false);
  const [orbitEnabled, setOrbitEnabled] = useState(true); // 💡 컨트롤 상태 추가

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-black text-gray-800 dark:text-white flex items-center gap-2">
            🧊 리얼 3D 미니어처 스마트 쇼케이스
          </h3>
          <p className="text-xs text-gray-400 font-medium">중앙 제어형 카테고리 유틸 엔진이 탑재되어 통계 지표와 100% 동기화됩니다.</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-4 py-2 text-xs font-black rounded-xl shadow-md transition-all ${isOpen ? "bg-rose-500 text-white" : "bg-blue-600 text-white animate-pulse"}`}
        >
          {isOpen ? "🚪 냉장고 문 닫기" : "🔓 냉장고 문 열기"}
        </button>
      </div>

      <div className="w-full h-[520px] bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative">
        <Canvas shadows camera={{ position: [0, 0.4, 5.5], fov: 42 }}>
          <ambientLight intensity={0.75} />
          <pointLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-3, 6, 4]} intensity={0.9} />

          <Physics gravity={[0, -9.5, 0]}>
            <FridgeStructure />
            {ingredients.map((item, index) => (
              <SmartIngredient 
                key={item.id} 
                item={item} 
                index={index} 
                isFridgeOpen={isOpen}
                setOrbitEnabled={setOrbitEnabled}
              />
            ))}
          </Physics>

          <FridgeDoor isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          <OrbitControls 
            enabled={orbitEnabled} // 💡 드래그 시 제어 방해 차단
            enableZoom={true} 
            minDistance={2.5} 
            maxDistance={7} 
            maxPolarAngle={Math.PI / 2} 
          />
        </Canvas>

        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-all">
            <span className="bg-blue-600/95 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-blue-400 animate-bounce">
              🖱️ 실버 도어를 클릭하면 실제 모형 재료들이 쏟아집니다!
            </span>
          </div>
        )}

        {/* 🛠️ 좌측 하단 미니 도표 */}
        <div className="absolute bottom-4 left-4 bg-zinc-900/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-zinc-800 text-[11px] font-bold space-y-1.5 pointer-events-none z-10">
          <div className="text-gray-400 uppercase tracking-wider mb-1">실시간 로드 미니어처 오브젝트</div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-3 bg-orange-500 rounded-sm"></span>
            <span className="text-zinc-300">채소류 (주황 당근 모형 🥕)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3.5 h-2 bg-red-500 rounded-sm"></span>
            <span className="text-zinc-300">육류 (마블링 소고기 팩 🥩)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-3.5 bg-slate-200 rounded-sm"></span>
            <span className="text-zinc-300">유제품 (스퀘어 우유 팩 🥛)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-purple-400 rounded-sm"></span>
            <span className="text-zinc-300">기타 품목 (실버 통조림 캔 🥫)</span>
          </div>
        </div>
      </div>
    </div>
  );
}