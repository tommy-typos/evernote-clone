import { useRegularNoteStore } from "@/state/regularNotes";

export function DenemeResetTree() {
	const setRegulars = useRegularNoteStore((state) => state.setRegularNotes);
	const setFavs = useRegularNoteStore((state) => state.setFavoriteNotes);

	return (
		<button
			className="bg-red-400 p-4"
			onClick={() => {
				setFavs([]);
				setRegulars([
					// { id: "noteid 0", title: "note 0", children: [] },
					{
						id: "noteid 1",
						title: "note 1",
						children: [
							{
								id: "noteid 2",
								title: "note 2",
								children: [
									{
										id: "noteid 3",
										title: "note 3",
										children: [],
									},
								],
							},
						],
					},
				]);
			}}
		>
			reset regulars and favs
		</button>
	);
}
