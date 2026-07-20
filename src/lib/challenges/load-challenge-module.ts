import { transform } from 'sucrase'
import * as Vue from 'vue'

export type LoadedModule = Record<string, unknown>

let vueShimUrl: string | null = null

function ensureVueShim(): string {
  if (vueShimUrl) return vueShimUrl
  ;(globalThis as unknown as { __CHALLENGE_LAB_VUE__: typeof Vue }).__CHALLENGE_LAB_VUE__ = Vue
  const keys = Object.keys(Vue).filter((k) => k !== 'default')
  const body = [
    'const __V__ = globalThis.__CHALLENGE_LAB_VUE__;',
    ...keys.map((k) => `export const ${k} = __V__.${k};`),
    'export default __V__.default ?? __V__;',
  ].join('\n')
  vueShimUrl = URL.createObjectURL(new Blob([body], { type: 'text/javascript' }))
  return vueShimUrl
}

function rewriteVueImports(js: string, shim: string): string {
  return js
    .replace(/from\s+['"]vue['"]/g, `from '${shim}'`)
    .replace(/from\s+['"]vue\/[^'"]+['"]/g, `from '${shim}'`)
}

async function importBlobModule(js: string): Promise<LoadedModule> {
  const blob = new Blob([js], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  try {
    const mod = await import(/* webpackIgnore: true */ /* @vite-ignore */ url)
    return mod as LoadedModule
  } finally {
    URL.revokeObjectURL(url)
  }
}

function isVueSfc(source: string, filename?: string): boolean {
  if (filename?.endsWith('.vue')) return true
  return /<script[\s>]/.test(source) && /<template[\s>]/.test(source)
}

async function loadVueSfc(source: string, filename: string): Promise<LoadedModule> {
  const { parse, compileScript } = await import('@vue/compiler-sfc')
  const { descriptor, errors } = parse(source, { filename })
  if (errors.length > 0) {
    throw new Error(errors.map((e) => e.message).join('\n'))
  }
  if (!descriptor.script && !descriptor.scriptSetup) {
    throw new Error('Vue SFC needs a <script> or <script setup> block')
  }

  let compiled
  try {
    compiled = compileScript(descriptor, {
      id: 'data-v-challenge',
      inlineTemplate: true,
    })
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : `Failed to compile Vue SFC: ${String(err)}`,
    )
  }

  const js = transform(compiled.content, {
    transforms: ['typescript'],
    disableESTransforms: true,
  }).code

  const shim = ensureVueShim()
  return importBlobModule(rewriteVueImports(js, shim))
}

/**
 * Transpile challenge source (TS/JS or Vue SFC) and load it as an ES module in the browser.
 */
export async function loadChallengeModule(
  source: string,
  filename = 'challenge.ts',
): Promise<LoadedModule> {
  if (isVueSfc(source, filename)) {
    return loadVueSfc(source, filename.endsWith('.vue') ? filename : 'Challenge.vue')
  }

  const js = transform(source, {
    transforms: ['typescript'],
    disableESTransforms: true,
  }).code

  const shim = ensureVueShim()
  return importBlobModule(rewriteVueImports(js, shim))
}

/** Whether the starter can be executed by the in-browser runner. */
export function isRunnableInBrowser(_starterFile: string): boolean {
  return true
}
