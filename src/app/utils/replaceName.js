export const replaceName = (name, format) => {
	return name.replace(/\.[^.]+$/, "") + "." + format;
}
