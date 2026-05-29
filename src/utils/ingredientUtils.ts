// 파일명: src/utils/ingredientUtils.ts
import type { Ingredient } from "../types/Ingredient";

export const INGREDIENT_REGEX = {
  // 🥕 채소/과일/허브류 총망라 (한국인 선호 채소 및 쌈채소, 버섯, 과일 일체)
  VEGETABLE: /(양파|대파|쪽파|실파|마늘|상추|버섯|배추|고추|토마토|당근|무우|감자|고구마|오이|호박|애호박|가지|브로콜리|양배추|시금치|깻잎|부추|숙주|콩나물|샐러드|파프리카|피망|아스파라거스|사과|바나나|포도|딸기|오렌지|귤|레몬|라임|망고|키위|블루베리|체리|수박|참외|멜론|복숭아|자두|배)/,

  // 🥩 육류/어패류/가공육 일체 (정육 부위 명칭 및 수산물, 소시지류 포함)
  MEAT: /(고기|소고기|돼지고기|닭고기|오리고기|양고기|우육|돈육|계육|삼겹살|목살|항정살|등심|안심|갈비|양지|차돌|닭가슴살|닭다리|오리훈제|고등어|연어|갈치|조기|명태|대구|오징어|낙지|문어|주꾸미|새우|꽃게|조개|굴|전복|홍합|바지락|해물|베이컨|소시지|소세지|햄|스팸|비엔나|미트볼|패티)/,

  // 🥛 유제품/알류/유지류 (우유팩부터 발효유, 알류, 버터치즈류)
  DAIRY: /(우유|치즈|버터|요거트|요구르트|계란|달걀|메추리알|생크림|휘핑크림|마가린|연유|푸딩|아이스크림|모짜렐라|체다|파마산|크림치즈)/,
};

// 어떤 파일에서든 식재료 객체만 넣으면 boolean 값을 뱉어주는 유틸 함수
export const checkCategory = (item: Ingredient) => {
  const isVegetable = !!item.name.match(INGREDIENT_REGEX.VEGETABLE);
  const isMeat = !!item.name.match(INGREDIENT_REGEX.MEAT);
  const isDairy = !!item.name.match(INGREDIENT_REGEX.DAIRY);
  const isOther = !isVegetable && !isMeat && !isDairy;

  return { isVegetable, isMeat, isDairy, isOther };
};