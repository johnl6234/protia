export function makeId(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

export const moveInArray = (movingItemId, droppedItemId, passedArray) => {
	let array = passedArray.map(lap => lap);
	let placeLap = array.find(el => el.id == droppedItemId);
	let toOrder;
	if (placeLap) toOrder = placeLap.order;
	else toOrder = this.workout.laps.length + 1;
	array.forEach(el => {
		if (el.order >= toOrder && el.id != movingItemId) el.order++;
	});

	let droppedItem = array.find(el => el.id == movingItemId);
	droppedItem.order = toOrder;
	array.sort((a, b) => a.order - b.order);
	// adjust order from 0 - length
	array.forEach((el, index) => (el.order = index + 1));
	return array;
};
