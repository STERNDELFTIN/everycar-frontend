// 반응형 폰트 크기 계산 함수
export const vwFont = (min, max, baseWidth = 1920) => {
    return `clamp(${min}px, calc(${max} / ${baseWidth} * 100vw), ${max}px)`;
};