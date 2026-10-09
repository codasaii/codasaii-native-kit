export const smoothAbs = (x: number, eps: number) => {
	"worklet";
	return Math.sqrt(x ** 2 + eps ** 2) - eps;
};

export const softCap = (v: number, max: number) => {
	"worklet";
	return v / (1 + v / max);
};
