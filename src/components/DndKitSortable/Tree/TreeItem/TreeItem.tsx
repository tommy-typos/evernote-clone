import React, { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";

import { Action } from "./Action";
import styles from "./TreeItem.module.css";
import { UniqueIdentifier } from "@dnd-kit/core";
import { twColors } from "@/utils/colors/twTheme";
import {
	ChevronRightIcon,
	EllipsisHorizontalIcon,
	LinkIcon,
	PencilSquareIcon,
	PlusIcon,
	TrashIcon,
} from "@heroicons/react/20/solid";
import { MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { ControlledMenu } from "@szhsin/react-menu";
import { CornerUpRight, Star, StarOff } from "lucide-react";
import { NoteId, useSelectedNoteStore } from "@/state/selectedNote";

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
	clone?: boolean;
	collapsed?: boolean;
	depth: number;
	disableInteraction?: boolean;
	disableSelection?: boolean;
	ghost?: boolean;
	handleProps?: any;
	indentationWidth: number;
	noteName: string;
	noteId?: UniqueIdentifier;
	isFavorite?: boolean;
	onCollapse?(): void;
	onRemove?(): void;
	onAddChild?(): void;
	wrapperRef?(node: HTMLLIElement): void;
	onMakeFavorite?(): void;
	isOver?: boolean;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
	(
		{
			clone,
			depth,
			disableSelection,
			disableInteraction,
			ghost,
			handleProps,
			indentationWidth,
			collapsed,
			onCollapse,
			onRemove,
			onAddChild,
			onMakeFavorite,
			isFavorite,
			style,
			noteName,
			noteId,
			wrapperRef,
			isOver,
			...props
		},
		ref
	) => {
		const selectedNote = useSelectedNoteStore((state) => state.selectedNote);
		const setSelectedNote = useSelectedNoteStore((state) => state.setSelectedNote);
		const [isContextOpen, setIsContextOpen] = useState(false);
		const [contextAnchorPoint, setContextAnchorPoint] = useState({ x: 0, y: 0 });

		return (
			<>
				<li
					{...handleProps}
					className={classNames(
						"group mb-1 list-none pl-[var(--spacing)]",
						styles.Wrapper,
						clone && styles.clone,
						ghost && styles.ghost,
						disableInteraction && "pointer-events-none"
					)}
					ref={wrapperRef}
					style={
						{
							"--spacing": `${indentationWidth * depth}px`,
						} as React.CSSProperties
					}
					{...props}
				>
					<div
						className={classNames(styles.TreeItem, "flex items-center text-slate-50 hover:bg-slate-900")}
						ref={ref}
						style={style}
					>
						{onCollapse && (
							<Action onClick={onCollapse} className={classNames("px-1")}>
								<ChevronRightIcon
									className={classNames(
										"h-5 w-5 transition-transform duration-200 ease-in hover:fill-slate-400",
										collapsed && "rotate-90"
									)}
								/>
							</Action>
						)}
						<span
							onContextMenu={(e) => {
								e.preventDefault();
								setContextAnchorPoint({ x: e.clientX, y: e.clientY });
								setIsContextOpen(true);
							}}
							className={classNames(
								styles.Text,
								"flex-grow overflow-hidden text-ellipsis whitespace-nowrap px-1 group-hover:bg-slate-700"
							)}
							onClick={() => {
								if (setSelectedNote) {
									setSelectedNote({ type: "regularNote", id: noteId as NoteId, title: noteName });
								}
							}}
							style={{
								backgroundColor:
									(selectedNote && selectedNote.id === noteId) || isContextOpen
										? twColors.slate[700]
										: undefined,
								color: isFavorite ? twColors.yellow[400] : undefined,
							}}
						>
							{noteName ? noteName : "Untitled"}
						</span>
						{!clone && (
							<Action
								onClick={(e) => {
									setContextAnchorPoint({ x: e.clientX, y: e.clientY });
									setIsContextOpen(true);
								}}
								className="invisible px-1 group-hover:visible"
							>
								<EllipsisHorizontalIcon className="h-5 w-5 hover:fill-slate-400" />
							</Action>
						)}
						{!clone && onAddChild && (
							<Action onClick={onAddChild} className="invisible px-1 group-hover:visible">
								<PlusIcon className="h-5 w-5 hover:fill-slate-400" />
							</Action>
						)}
					</div>
				</li>
				<ControlledMenu
					anchorPoint={contextAnchorPoint}
					state={isContextOpen ? "open" : "closed"}
					direction="right"
					onClose={() => setIsContextOpen(false)}
					position="initial"
				>
					<MenuItem className="text-yellow-400" onClick={onMakeFavorite}>
						{isFavorite ? (
							<>
								<StarOff className="mr-2 h-5 w-5 stroke-yellow-400" />
								Remove from Favorites
							</>
						) : (
							<>
								<Star className="mr-2 h-5 w-5 stroke-yellow-400" />
								Add to Favorites
							</>
						)}
					</MenuItem>

					<MenuItem disabled={true}>
						<PencilSquareIcon className="mr-2 h-5 w-5" />
						Rename
					</MenuItem>
					<MenuItem disabled={true}>
						<LinkIcon className="mr-2 h-5 w-5" />
						Copy link
					</MenuItem>
					<MenuItem disabled={true}>
						<CornerUpRight className="mr-2 h-5 w-5" />
						Move to
					</MenuItem>
					<MenuItem className="text-red-400" onClick={onRemove}>
						<TrashIcon className="mr-2 h-5 w-5 fill-red-400" />
						Delete
					</MenuItem>
				</ControlledMenu>
			</>
		);
	}
);

TreeItem.displayName = "TreeItem";
