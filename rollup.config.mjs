import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: 'dist',
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: 'named'
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            clean: true
        }),
        postcss({
            config: {
                path: './postcss.config.js'
            },
            extensions: ['.css'],
            minimize: true,
            inject: {
                insertAt: 'top'
            }
        })
    ],
    external: ['react', 'react-dom']
}