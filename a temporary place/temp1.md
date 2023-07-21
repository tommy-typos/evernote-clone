```ts
{
	!selectedNote && <EditorContent editor={editor} className="flex-grow bg-slate-900" />;
}

{
	selectedNote ? (
		<Tiptap />
	) : (
		<div className="z-10 flex h-full w-full flex-grow items-center justify-center bg-slate-900 text-xl text-slate-300">
			<p>Please choose a note to start writing</p>
		</div>
	);
}
```
