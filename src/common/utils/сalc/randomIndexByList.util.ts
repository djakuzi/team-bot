export function getRandomIndexByList(list: any[]) {
	const index = Math.floor(Math.random() * list.length);
	return index;
}