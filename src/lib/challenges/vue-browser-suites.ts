import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import {
  defineComponent,
  h,
  nextTick,
  ref,
  type Component,
} from 'vue'
import type { LoadedModule } from '@/lib/challenges/load-challenge-module'

export interface TestCaseResult {
  name: string
  passed: boolean
  error?: string
}

type AssertFn = (condition: unknown, message?: string) => void
type Suite = (mod: LoadedModule, assert: AssertFn) => Promise<TestCaseResult[]> | TestCaseResult[]

function assertEqual<T>(actual: T, expected: T, message?: string) {
  const a = JSON.stringify(actual)
  const e = JSON.stringify(expected)
  if (a !== e) {
    throw new Error(message ?? `Expected ${e}, got ${a}`)
  }
}

function assert(condition: unknown, message = 'Assertion failed'): asserts condition {
  if (!condition) throw new Error(message)
}

async function runCase(name: string, fn: () => void | Promise<void>): Promise<TestCaseResult> {
  try {
    await fn()
    return { name, passed: true }
  } catch (err) {
    return {
      name,
      passed: false,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

function component(mod: LoadedModule): Component {
  const c = mod.default
  if (c == null) {
    throw new Error('Expected a default-exported Vue component')
  }
  return c as Component
}

function createSpy<T extends (...args: never[]) => unknown>(impl?: T) {
  const calls: unknown[][] = []
  const spy = ((...args: unknown[]) => {
    calls.push(args)
    return impl?.(...(args as never[]))
  }) as ((...args: unknown[]) => unknown) & {
    calls: unknown[][]
    toHaveBeenCalled: () => boolean
    toHaveBeenCalledWith: (...args: unknown[]) => boolean
    toHaveBeenCalledTimes: (n: number) => boolean
  }
  spy.calls = calls
  spy.toHaveBeenCalled = () => calls.length > 0
  spy.toHaveBeenCalledWith = (...args: unknown[]) =>
    calls.some((c) => JSON.stringify(c) === JSON.stringify(args))
  spy.toHaveBeenCalledTimes = (n: number) => calls.length === n
  return spy
}

export const vueSfcSuites: Record<string, Suite> = {
  'vue-01-counter': async (mod) => {
    const Counter = component(mod)
    return [
      await runCase('starts at 0', () => {
        const wrapper = mount(Counter)
        assertEqual(wrapper.get('[data-testid="count"]').text(), '0')
      }),
      await runCase('increments', async () => {
        const wrapper = mount(Counter)
        await wrapper.get('[data-testid="inc"]').trigger('click')
        await wrapper.get('[data-testid="inc"]').trigger('click')
        assertEqual(wrapper.get('[data-testid="count"]').text(), '2')
      }),
      await runCase('decrements but not below 0', async () => {
        const wrapper = mount(Counter)
        await wrapper.get('[data-testid="inc"]').trigger('click')
        await wrapper.get('[data-testid="dec"]').trigger('click')
        assertEqual(wrapper.get('[data-testid="count"]').text(), '0')
        await wrapper.get('[data-testid="dec"]').trigger('click')
        assertEqual(wrapper.get('[data-testid="count"]').text(), '0')
      }),
      await runCase('resets', async () => {
        const wrapper = mount(Counter)
        await wrapper.get('[data-testid="inc"]').trigger('click')
        await wrapper.get('[data-testid="inc"]').trigger('click')
        await wrapper.get('[data-testid="reset"]').trigger('click')
        assertEqual(wrapper.get('[data-testid="count"]').text(), '0')
      }),
    ]
  },

  'vue-02-computed': async (mod) => {
    const Cart = component(mod)
    return [
      await runCase('computes initial count and total', () => {
        const wrapper = mount(Cart)
        assert(wrapper.get('[data-testid="count"]').text().includes('7'))
        assert(wrapper.get('[data-testid="total"]').text().includes('39'))
      }),
      await runCase('updates when items are added', async () => {
        const wrapper = mount(Cart)
        await wrapper.get('[data-testid="add"]').trigger('click')
        assert(wrapper.get('[data-testid="count"]').text().includes('8'))
        assert(wrapper.get('[data-testid="total"]').text().includes('41'))
      }),
    ]
  },

  'vue-03-props-emits': async (mod) => {
    const Rating = component(mod)
    return [
      await runCase('renders max stars (default 5)', () => {
        const wrapper = mount(Rating, { props: { modelValue: 0 } })
        assertEqual(wrapper.findAll('.star').length, 5)
      }),
      await runCase('marks active stars from modelValue', () => {
        const wrapper = mount(Rating, { props: { modelValue: 3 } })
        const stars = wrapper.findAll('.star')
        assert(stars[0].classes().includes('active'))
        assert(stars[1].classes().includes('active'))
        assert(stars[2].classes().includes('active'))
        assert(!stars[3].classes().includes('active'))
      }),
      await runCase('emits update:modelValue on click', async () => {
        const wrapper = mount(Rating, { props: { modelValue: 1 } })
        await wrapper.get('[data-testid="star-4"]').trigger('click')
        assertEqual(wrapper.emitted('update:modelValue')?.[0], [4])
      }),
      await runCase('works with v-model in a parent', async () => {
        const Parent = defineComponent({
          setup() {
            const rating = ref(2)
            return () =>
              h('div', [
                h(Rating, {
                  modelValue: rating.value,
                  'onUpdate:modelValue': (v: number) => {
                    rating.value = v
                  },
                }),
                h('span', { 'data-testid': 'val' }, String(rating.value)),
              ])
          },
        })
        const wrapper = mount(Parent)
        await wrapper.get('[data-testid="star-5"]').trigger('click')
        assertEqual(wrapper.get('[data-testid="val"]').text(), '5')
      }),
    ]
  },

  'vue-04-watch': async (mod) => {
    const SearchBox = component(mod)
    return [
      await runCase('does not search for short queries', async () => {
        const onSearch = createSpy()
        const wrapper = mount(SearchBox, { props: { onSearch } })
        await wrapper.get('[data-testid="input"]').setValue('a')
        assert(!onSearch.toHaveBeenCalled())
      }),
      await runCase('calls onSearch when query has 2+ characters', async () => {
        const onSearch = createSpy()
        const wrapper = mount(SearchBox, { props: { onSearch } })
        await wrapper.get('[data-testid="input"]').setValue('vu')
        assert(onSearch.toHaveBeenCalledWith('vu'))
      }),
      await runCase('trims whitespace before checking length', async () => {
        const onSearch = createSpy()
        const wrapper = mount(SearchBox, { props: { onSearch } })
        await wrapper.get('[data-testid="input"]').setValue('  hi  ')
        assert(onSearch.toHaveBeenCalledWith('hi'))
      }),
    ]
  },

  'vue-06-list': async (mod) => {
    const TodoApp = component(mod)
    async function add(wrapper: VueWrapper, text: string) {
      await wrapper.get('[data-testid="input"]').setValue(text)
      await wrapper.get('form').trigger('submit')
    }
    return [
      await runCase('adds a todo and clears the input', async () => {
        const wrapper = mount(TodoApp)
        await add(wrapper, 'Learn Vue')
        assert(wrapper.get('[data-testid="list"]').text().includes('Learn Vue'))
        assertEqual(
          (wrapper.get('[data-testid="input"]').element as HTMLInputElement).value,
          '',
        )
        assert(wrapper.get('[data-testid="remaining"]').text().includes('1'))
      }),
      await runCase('ignores empty input', async () => {
        const wrapper = mount(TodoApp)
        await add(wrapper, '   ')
        assertEqual(wrapper.findAll('li[data-testid^="todo-"]').length, 0)
      }),
      await runCase('toggles and filters', async () => {
        const wrapper = mount(TodoApp)
        await add(wrapper, 'A')
        await add(wrapper, 'B')
        await wrapper.get('[data-testid="toggle-1"]').setValue(true)
        assert(wrapper.get('[data-testid="remaining"]').text().includes('1'))
        await wrapper.get('[data-testid="filter-done"]').trigger('click')
        assertEqual(wrapper.findAll('li[data-testid^="todo-"]').length, 1)
        assert(wrapper.get('[data-testid="list"]').text().includes('A'))
        await wrapper.get('[data-testid="filter-active"]').trigger('click')
        assert(wrapper.get('[data-testid="list"]').text().includes('B'))
        assert(!wrapper.get('[data-testid="list"]').text().includes('A'))
      }),
      await runCase('removes a todo', async () => {
        const wrapper = mount(TodoApp)
        await add(wrapper, 'Gone')
        await wrapper.get('[data-testid="remove-1"]').trigger('click')
        assertEqual(wrapper.findAll('li[data-testid^="todo-"]').length, 0)
      }),
    ]
  },

  'vue-07-define-model': async (mod) => {
    const TextField = component(mod)
    return [
      await runCase('renders label and placeholder', () => {
        const wrapper = mount(TextField, {
          props: { modelValue: '', label: 'Name', placeholder: 'Ada' },
        })
        assert(wrapper.text().includes('Name'))
        assertEqual(wrapper.get('[data-testid="input"]').attributes('placeholder'), 'Ada')
      }),
      await runCase('syncs with v-model', async () => {
        const Parent = defineComponent({
          setup() {
            const name = ref('Vue')
            return () =>
              h('div', [
                h(TextField, {
                  modelValue: name.value,
                  'onUpdate:modelValue': (v: string) => {
                    name.value = v
                  },
                }),
                h('span', { 'data-testid': 'val' }, name.value),
              ])
          },
        })
        const wrapper = mount(Parent)
        assertEqual(wrapper.get('[data-testid="val"]').text(), 'Vue')
        await wrapper.get('[data-testid="input"]').setValue('Nuxt')
        assertEqual(wrapper.get('[data-testid="val"]').text(), 'Nuxt')
      }),
    ]
  },

  'vue-08-accordion': async (mod) => {
    const Accordion = component(mod)
    const panels = [
      { id: 'a', title: 'What is Vue?', body: 'A progressive framework.' },
      { id: 'b', title: 'Composition API?', body: 'Functions that compose state.' },
    ]
    return [
      await runCase('starts with all panels closed', () => {
        const wrapper = mount(Accordion, { props: { panels } })
        assert(!wrapper.find('[data-testid="body-a"]').exists())
        assert(!wrapper.find('[data-testid="body-b"]').exists())
      }),
      await runCase('opens a panel on header click', async () => {
        const wrapper = mount(Accordion, { props: { panels } })
        await wrapper.get('[data-testid="header-a"]').trigger('click')
        assert(wrapper.get('[data-testid="body-a"]').text().includes('progressive'))
        assert(!wrapper.find('[data-testid="body-b"]').exists())
      }),
      await runCase('closes when clicking the open header again', async () => {
        const wrapper = mount(Accordion, { props: { panels } })
        await wrapper.get('[data-testid="header-a"]').trigger('click')
        await wrapper.get('[data-testid="header-a"]').trigger('click')
        assert(!wrapper.find('[data-testid="body-a"]').exists())
      }),
      await runCase('only one panel open at a time', async () => {
        const wrapper = mount(Accordion, { props: { panels } })
        await wrapper.get('[data-testid="header-a"]').trigger('click')
        await wrapper.get('[data-testid="header-b"]').trigger('click')
        assert(!wrapper.find('[data-testid="body-a"]').exists())
        assert(wrapper.find('[data-testid="body-b"]').exists())
      }),
    ]
  },

  'vue-09-status-badge': async (mod) => {
    const StatusBadge = component(mod)
    return [
      await runCase('applies status class', () => {
        const wrapper = mount(StatusBadge, { props: { status: 'success' } })
        assert(wrapper.get('[data-testid="badge"]').classes().includes('badge-success'))
        assertEqual(wrapper.text(), 'success')
      }),
      await runCase('uses custom label', () => {
        const wrapper = mount(StatusBadge, {
          props: { status: 'error', label: 'Failed' },
        })
        assertEqual(wrapper.text(), 'Failed')
        assert(wrapper.get('[data-testid="badge"]').classes().includes('badge-error'))
      }),
      await runCase('applies color override as inline style', () => {
        const wrapper = mount(StatusBadge, {
          props: { status: 'idle', color: '#ff00aa' },
        })
        const el = wrapper.get('[data-testid="badge"]').element as HTMLElement
        assert(/rgb\(255,\s*0,\s*170\)|#ff00aa/i.test(el.style.backgroundColor))
      }),
    ]
  },

  'vue-10-auto-focus': async (mod) => {
    const AutoFocus = component(mod)
    return [
      await runCase('focuses the input on mount', async () => {
        const wrapper = mount(AutoFocus, { attachTo: document.body })
        const input = wrapper.get('[data-testid="input"]').element as HTMLInputElement
        await nextTick()
        assertEqual(document.activeElement, input)
        wrapper.unmount()
      }),
      await runCase('focus() focuses the input again', async () => {
        const wrapper = mount(AutoFocus, { attachTo: document.body })
        const input = wrapper.get('[data-testid="input"]').element as HTMLInputElement
        let focusCalls = 0
        const original = input.focus.bind(input)
        input.focus = () => {
          focusCalls += 1
          return original()
        }
        ;(document.activeElement as HTMLElement | null)?.blur?.()
        await wrapper.get('[data-testid="refocus"]').trigger('click')
        assert(focusCalls > 0)
        wrapper.unmount()
      }),
    ]
  },

  'vue-11-provide-inject': async (mod) => {
    const ThemeSwitch = component(mod)
    return [
      await runCase('provider starts with initial theme', () => {
        const wrapper = mount(ThemeSwitch, {
          props: { root: true, initial: 'dark' },
        })
        assert(wrapper.get('[data-testid="label"]').text().includes('dark'))
        assertEqual(
          wrapper.get('[data-testid="theme-box"]').attributes('data-theme'),
          'dark',
        )
      }),
      await runCase('toggle flips provider theme', async () => {
        const wrapper = mount(ThemeSwitch, { props: { root: true, initial: 'light' } })
        await wrapper.get('[data-testid="toggle"]').trigger('click')
        assert(wrapper.get('[data-testid="label"]').text().includes('dark'))
      }),
      await runCase('child injects parent theme', async () => {
        const Parent = defineComponent({
          setup() {
            return () =>
              h(
                ThemeSwitch,
                { root: true, initial: 'light' },
                { default: () => h(ThemeSwitch) },
              )
          },
        })
        const wrapper = mount(Parent)
        const boxes = wrapper.findAll('[data-testid="theme-box"]')
        assertEqual(boxes.length, 2)
        assertEqual(boxes[1].attributes('data-theme'), 'light')
        await boxes[0].get('[data-testid="toggle"]').trigger('click')
        assertEqual(boxes[1].attributes('data-theme'), 'dark')
      }),
    ]
  },

  'vue-12-slots': async (mod) => {
    const SlotCard = component(mod)
    return [
      await runCase('renders default slot in body', () => {
        const wrapper = mount(SlotCard, {
          slots: { default: '<p>Hello body</p>' },
        })
        assert(wrapper.get('[data-testid="body"]').text().includes('Hello body'))
      }),
      await runCase('renders named header and footer slots', () => {
        const wrapper = mount(SlotCard, {
          slots: {
            header: 'Title',
            default: 'Content',
            footer: 'Actions',
          },
        })
        assertEqual(wrapper.get('[data-testid="header"]').text(), 'Title')
        assertEqual(wrapper.get('[data-testid="body"]').text(), 'Content')
        assertEqual(wrapper.get('[data-testid="footer"]').text(), 'Actions')
      }),
      await runCase('hides header/footer when slots are absent', () => {
        const wrapper = mount(SlotCard, {
          slots: { default: 'Only body' },
        })
        assert(!wrapper.find('[data-testid="header"]').exists())
        assert(!wrapper.find('[data-testid="footer"]').exists())
      }),
    ]
  },

  'vue-13-lifecycle': async (mod) => {
    const UserLoader = component(mod)
    const ada = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' }
    return [
      await runCase('loads user on mount', async () => {
        const fetchUser = createSpy(async () => ada)
        const wrapper = mount(UserLoader, {
          props: { userId: 1, fetchUser },
        })
        assert(fetchUser.toHaveBeenCalledWith(1))
        await flushPromises()
        assertEqual(wrapper.get('[data-testid="name"]').text(), 'Ada Lovelace')
        assertEqual(wrapper.get('[data-testid="email"]').text(), 'ada@example.com')
      }),
      await runCase('shows error when fetch fails', async () => {
        const fetchUser = createSpy(async () => {
          throw new Error('Nope')
        })
        const wrapper = mount(UserLoader, {
          props: { userId: 2, fetchUser },
        })
        await flushPromises()
        assert(wrapper.get('[data-testid="error"]').text().includes('Nope'))
      }),
      await runCase('reload fetches again', async () => {
        const fetchUser = createSpy(async () => ada)
        const wrapper = mount(UserLoader, {
          props: { userId: 1, fetchUser },
        })
        await flushPromises()
        await wrapper.get('[data-testid="reload"]').trigger('click')
        await flushPromises()
        assert(fetchUser.toHaveBeenCalledTimes(2))
      }),
    ]
  },

  'vue-14-deep-watch': async (mod) => {
    const DeepWatch = component(mod)
    return [
      await runCase('logs when a top-level field changes', async () => {
        const wrapper = mount(DeepWatch)
        await wrapper.get('[data-testid="rename"]').trigger('click')
        assert(wrapper.get('[data-testid="logs"]').text().includes('Changed: Grace @ London'))
      }),
      await runCase('logs when a nested field changes', async () => {
        const wrapper = mount(DeepWatch)
        await wrapper.get('[data-testid="move"]').trigger('click')
        assert(wrapper.get('[data-testid="logs"]').text().includes('Changed: Ada @ Oxford'))
      }),
    ]
  },

  'vue-15-reactive-form': async (mod) => {
    const ReactiveForm = component(mod)
    return [
      await runCase('starts invalid and submit disabled', () => {
        const wrapper = mount(ReactiveForm)
        assertEqual(wrapper.get('[data-testid="email-valid"]').text(), 'invalid')
        assert(wrapper.get('[data-testid="submit"]').attributes('disabled') !== undefined)
      }),
      await runCase('validates email containing @', async () => {
        const wrapper = mount(ReactiveForm)
        await wrapper.get('[data-testid="email"]').setValue('ada@lovelace.dev')
        assertEqual(wrapper.get('[data-testid="email-valid"]').text(), 'valid')
      }),
      await runCase('enables submit when name and email are valid', async () => {
        const wrapper = mount(ReactiveForm)
        await wrapper.get('[data-testid="name"]').setValue('Ada')
        await wrapper.get('[data-testid="email"]').setValue('ada@x.com')
        assert(wrapper.get('[data-testid="submit"]').attributes('disabled') === undefined)
      }),
      await runCase('reset clears fields', async () => {
        const wrapper = mount(ReactiveForm)
        await wrapper.get('[data-testid="name"]').setValue('Ada')
        await wrapper.get('[data-testid="email"]').setValue('ada@x.com')
        await wrapper.get('[data-testid="reset"]').trigger('click')
        assertEqual(
          (wrapper.get('[data-testid="name"]').element as HTMLInputElement).value,
          '',
        )
        assertEqual(wrapper.get('[data-testid="email-valid"]').text(), 'invalid')
      }),
    ]
  },

  'vue-16-checkbox-model': async (mod) => {
    const FancyCheckbox = component(mod)
    return [
      await runCase('renders label', () => {
        const wrapper = mount(FancyCheckbox, {
          props: { modelValue: false, label: 'Accept terms' },
        })
        assert(wrapper.text().includes('Accept terms'))
      }),
      await runCase('syncs with v-model', async () => {
        const Parent = defineComponent({
          setup() {
            const on = ref(false)
            return () =>
              h('div', [
                h(FancyCheckbox, {
                  modelValue: on.value,
                  label: 'On',
                  'onUpdate:modelValue': (v: boolean) => {
                    on.value = v
                  },
                }),
                h('span', { 'data-testid': 'val' }, String(on.value)),
              ])
          },
        })
        const wrapper = mount(Parent)
        assertEqual(wrapper.get('[data-testid="val"]').text(), 'false')
        await wrapper.get('[data-testid="input"]').setValue(true)
        assertEqual(wrapper.get('[data-testid="val"]').text(), 'true')
      }),
    ]
  },

  'vue-17-teleport-modal': async (mod) => {
    const Modal = component(mod)
    return [
      await runCase('does not render when closed', () => {
        mount(Modal, {
          props: { open: false, title: 'Hi' },
          attachTo: document.body,
          slots: { default: 'Body' },
        })
        assert(document.body.querySelector('[data-testid="dialog"]') === null)
      }),
      await runCase('teleports dialog to body when open', () => {
        const wrapper = mount(Modal, {
          props: { open: true, title: 'Confirm' },
          attachTo: document.body,
          slots: { default: '<p>Are you sure?</p>' },
        })
        const dialog = document.body.querySelector('[data-testid="dialog"]')
        assert(dialog !== null)
        assert(dialog?.textContent?.includes('Are you sure?'))
        assert(dialog?.textContent?.includes('Confirm'))
        assert(!wrapper.find('[data-testid="dialog"]').exists())
        wrapper.unmount()
      }),
      await runCase('emits close from backdrop and button', async () => {
        const wrapper = mount(Modal, {
          props: { open: true },
          attachTo: document.body,
        })
        const backdrop = document.body.querySelector('[data-testid="backdrop"]')!
        backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        assert(wrapper.emitted('close'))

        const closeBtn = document.body.querySelector(
          '[data-testid="close"]',
        ) as HTMLButtonElement
        closeBtn.click()
        assert((wrapper.emitted('close')?.length ?? 0) >= 2)
        wrapper.unmount()
      }),
    ]
  },

  'vue-18-transition': async (mod) => {
    const FadeToggle = component(mod)
    return [
      await runCase('hides panel when visible is false', () => {
        const wrapper = mount(FadeToggle, {
          props: { visible: false },
          slots: { default: 'Secret' },
        })
        assert(!wrapper.find('[data-testid="panel"]').exists())
      }),
      await runCase('shows panel when visible is true', async () => {
        const wrapper = mount(FadeToggle, {
          props: { visible: true },
          slots: { default: 'Secret' },
        })
        await nextTick()
        assert(wrapper.get('[data-testid="panel"]').text().includes('Secret'))
      }),
      await runCase('toggles when prop changes', async () => {
        const wrapper = mount(FadeToggle, {
          props: { visible: false },
          slots: { default: 'Hi' },
        })
        await wrapper.setProps({ visible: true })
        await nextTick()
        assert(wrapper.find('[data-testid="panel"]').exists())
        await wrapper.setProps({ visible: false })
        await nextTick()
        await new Promise((r) => setTimeout(r, 250))
        assert(!wrapper.find('[data-testid="panel"]').exists())
      }),
    ]
  },

  'vue-20-notes': async (mod) => {
    const NotesApp = component(mod)
    async function add(wrapper: VueWrapper, title: string, body = '') {
      await wrapper.get('[data-testid="new-title"]').setValue(title)
      await wrapper.get('[data-testid="new-body"]').setValue(body)
      await wrapper.get('form.add').trigger('submit')
    }
    return [
      await runCase('adds a note and selects it', async () => {
        const wrapper = mount(NotesApp)
        await add(wrapper, 'Vue tips', 'Use refs')
        assert(wrapper.get('[data-testid="list"]').text().includes('Vue tips'))
        assert(wrapper.get('[data-testid="count"]').text().includes('1'))
        assertEqual(
          (wrapper.get('[data-testid="edit-title"]').element as HTMLInputElement).value,
          'Vue tips',
        )
        assertEqual(
          (wrapper.get('[data-testid="new-title"]').element as HTMLInputElement).value,
          '',
        )
      }),
      await runCase('ignores empty titles', async () => {
        const wrapper = mount(NotesApp)
        await add(wrapper, '   ')
        assertEqual(wrapper.findAll('li[data-testid^="note-"]').length, 0)
      }),
      await runCase('edits selected note in place', async () => {
        const wrapper = mount(NotesApp)
        await add(wrapper, 'Draft', 'one')
        await wrapper.get('[data-testid="edit-title"]').setValue('Final')
        await wrapper.get('[data-testid="edit-body"]').setValue('two')
        assert(wrapper.get('[data-testid="list"]').text().includes('Final'))
        assertEqual(
          (wrapper.get('[data-testid="edit-body"]').element as HTMLTextAreaElement).value,
          'two',
        )
      }),
      await runCase('filters by title search', async () => {
        const wrapper = mount(NotesApp)
        await add(wrapper, 'Alpha')
        await add(wrapper, 'Beta')
        await wrapper.get('[data-testid="search"]').setValue('alp')
        assert(wrapper.get('[data-testid="list"]').text().includes('Alpha'))
        assert(!wrapper.get('[data-testid="list"]').text().includes('Beta'))
      }),
      await runCase('deletes the selected note', async () => {
        const wrapper = mount(NotesApp)
        await add(wrapper, 'Gone')
        await wrapper.get('[data-testid="delete"]').trigger('click')
        assertEqual(wrapper.findAll('li[data-testid^="note-"]').length, 0)
        assert(wrapper.find('[data-testid="empty"]').exists())
      }),
    ]
  },
}
