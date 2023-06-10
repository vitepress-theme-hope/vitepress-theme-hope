import type { Alias } from '@rollup/plugin-alias'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import type { RollupReplaceOptions } from '@rollup/plugin-replace'
import replace from '@rollup/plugin-replace'
import type { ModuleSideEffectsOption, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const isProduction = process.env['NODE_ENV'] === 'production'

export interface FileInfo {
  base: string
  files: string[]
  target?: string
}

export interface BundleOptions {
  dts?: boolean
  external?: (RegExp | string)[]
  dtsExternal?: (RegExp | string)[]
  resolve?: boolean
  copy?: (string | [string, string])[]
  output?: Record<string, unknown>
  inlineDynamicImports?: boolean
  preserveShebang?: boolean
  replace?: RollupReplaceOptions
  alias?: Alias[] | { [find: string]: string }
  moduleSideEffects?: ModuleSideEffectsOption
}

export const bundle = (
  filePath: string | FileInfo,
  {
    dts: enableDts = typeof filePath === 'object'
      ? !filePath.base.startsWith('cli/') && filePath.base !== 'cli'
      : !filePath.startsWith('cli/'),
    external = [],
    dtsExternal = [],
    resolve = false,
    output = {},
    inlineDynamicImports = typeof filePath !== 'object',
    alias: entries,
    replace: replaceOptions,
    moduleSideEffects = (id): boolean =>
      id.endsWith('.css') || id.endsWith('.scss')
  }: BundleOptions = {}
): RollupOptions[] => [
  {
    input:
      typeof filePath === 'object'
        ? Object.fromEntries(
            filePath.files.map((item) => [
              item,
              `./src/${filePath.base}/${item}.ts`
            ])
          )
        : `./src/${filePath}.ts`,

    output: [
      {
        ...(typeof filePath === 'object'
          ? {
              dir: `./dist/${filePath.target || filePath.base}`,
              entryFileNames: '[name].js'
            }
          : { file: `./dist/${filePath}.js` }),
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        inlineDynamicImports,
        ...output
      }
    ],

    plugins: [
      typeof replaceOptions === 'object'
        ? replace({
            preventAssignment: true,
            ...replaceOptions
          })
        : null,
      entries ? alias({ entries }) : null,
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      esbuild({
        charset: 'utf8',
        minify: isProduction,
        target: 'node16'
      })
    ],

    external,

    treeshake: {
      moduleSideEffects,
      preset: 'smallest'
    }
  },
  ...(enableDts
    ? [
        {
          input:
            typeof filePath === 'object'
              ? Object.fromEntries(
                  filePath.files.map((item) => [
                    item,
                    `./src/${filePath.base}/${item}.ts`
                  ])
                )
              : `./src/${filePath}.ts`,
          output: [
            {
              ...(typeof filePath === 'object'
                ? {
                    dir: `./dist/${filePath.target || filePath.base}`,
                    entryFileNames: '[name].d.ts'
                  }
                : { file: `./dist/${filePath}.d.ts` }),

              format: 'esm'
            }
          ],
          plugins: [
            entries ? alias({ entries }) : null,
            dts({
              compilerOptions: {
                preserveSymlinks: false
              }
            })
          ],
          external: dtsExternal
        } as RollupOptions
      ]
    : [])
]
