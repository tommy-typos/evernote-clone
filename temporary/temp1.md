```ts
React.cloneElement(children, { className: `classNamesToAdd ${children.props.className ?? ""}` });

