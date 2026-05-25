// Auto-adds "use client" directive when React hooks are used in a file.
export default {
	meta: {
		type: 'problem',
		fixable: 'code',
		schema: [],
		messages: {
			missing: 'Files using React hooks must have "use client" directive.',
		},
	},
	create(context) {
		let hasUseClient = false;
		let hookUsed = null;
		const HOOK_RE = /^use[A-Z]/;

		return {
			// Detect existing "use client" directive at top of file
			Program(node) {
				const first = node.body[0];
				if (
					first &&
					first.type === 'ExpressionStatement' &&
					first.expression.type === 'Literal' &&
					first.expression.value === 'use client'
				) {
					hasUseClient = true;
				}
			},
			// Catch any identifier matching useXxx pattern when called
			CallExpression(node) {
				if (hookUsed) return;
				const callee = node.callee;
				if (callee.type === 'Identifier' && HOOK_RE.test(callee.name)) {
					hookUsed = node;
				} else if (
					callee.type === 'MemberExpression' &&
					callee.property.type === 'Identifier' &&
					HOOK_RE.test(callee.property.name)
				) {
					hookUsed = node;
				}
			},
			'Program:exit'(node) {
				if (hookUsed && !hasUseClient) {
					context.report({
						node: hookUsed,
						messageId: 'missing',
						fix(fixer) {
							return fixer.insertTextBefore(node, `'use client';\n`);
						},
					});
				}
			},
		};
	},
};
