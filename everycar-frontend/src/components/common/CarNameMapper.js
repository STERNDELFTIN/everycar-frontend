// CarNameMapper.js
const CarNameMapper = (carName) => {
    const carNames = {
      "캐스퍼": "casper",
      "스타리아": "staria",
      "아이오닉5": "ionic5",
      "아이오닉6": "ionic6",
      "gv60": "gv60",
      "g70": "g70",
      "g80": "g80",
      "g90": "g90",
      "gv70": "gv70",
      "gv80": "gv80",
      "모닝": "mornig",
      "베뉴": "venue",
      "레이": "ray",
      "k3": "k3",
      "k5": "k5",
      "k8": "k8",
      "k9": "k9",
      "셀토스": "seltos",
      "니로": "niro",
      "스포티지": "spotige",
      "쏘렌토": "sorentto",
      "카니발": "carnibal",
      "아반떼": "avante",
      "EV3": "ev3",
      "EV6": "ev6",
      "EV9": "ev9",
      "티볼리": "tivoli",
      "코란도": "korando",
      "토레스": "torrez",
      "액티언": "actyon",
      "쏘나타": "sonata",
      "그랜저": "grandeur",
      "팰리세이드": "palisade",
      "싼타페": "santa fe",
      "투싼": "tucson",
      "코나": "kona"
    };
  
    return carNames[carName] || carName; // 매핑된 이름이 없으면 원래 이름을 그대로 반환
  };
  
  export default CarNameMapper;
  