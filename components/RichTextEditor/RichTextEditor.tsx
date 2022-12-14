import {
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Link2Icon,
} from "@radix-ui/react-icons"
import { Editor } from "@tiptap/core"
import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import Document from "@tiptap/extension-document"
import History from "@tiptap/extension-history"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import Strike from "@tiptap/extension-strike"
import Text from "@tiptap/extension-text"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import CharacterCount from "@tiptap/extension-character-count"
import Link from "@tiptap/extension-link"
import { EditorContent, useEditor } from "@tiptap/react"
import { useCallback, useEffect } from "react"
import { useHover } from "@mantine/hooks"

interface RichTextEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string
  placeholder?: string
  isValid?: boolean
  setContent: (value: string) => void
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor | null
}

interface MenuBarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface MenuBarButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive?: boolean
}

const MenuBarGroup = ({ children, className = "" }: MenuBarGroupProps) => (
  <div
    className={`flex gap-[4px] border-r-[1px] border-opacity-50 pr-[8px] ${className}`}
  >
    {children}
  </div>
)

const MenuBarButton = ({
  onClick,
  disabled,
  isActive,
  children,
}: MenuBarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled ?? false}
    className={`${
      isActive
        ? "bg-black/90 text-white hover:bg-opacity-70"
        : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
    } rounded-md p-[1px] transition`}
  >
    {children}
  </button>
)

const MenuBar = ({ editor, className = "" }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  return (
    <div
      className={`my-[8px] flex w-full gap-[8px] border-b-[1px] border-opacity-20 bg-[#ffffff] px-[8px] pb-[10px] text-black ${className}`}
    >
      <MenuBarGroup>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <FontBoldIcon width={20} height={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <FontItalicIcon width={20} height={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`${
            editor.isActive("underline")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <UnderlineIcon width={20} height={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive("link")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <StrikethroughIcon width={20} height={18} />
        </button>
      </MenuBarGroup>
      <MenuBarGroup>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <ListBulletIcon width={20} height={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          className={`${
            editor.isActive("orderedList")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
            />
            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
          </svg>
        </button>
      </MenuBarGroup>
      <MenuBarGroup>
        <button
          type="button"
          onClick={setLink}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("link")
              ? "bg-black/90 text-white hover:bg-opacity-70"
              : "bg-black bg-opacity-0 text-black hover:bg-opacity-[0.13]"
          } rounded-md p-[1px] transition`}
        >
          <Link2Icon width={20} height={16} />
        </button>
      </MenuBarGroup>
      <MenuBarGroup>
        <div className="flex gap-[4px] text-sm opacity-50">
          <span>{editor.storage.characterCount.characters()} huruf</span>
          <span>{editor.storage.characterCount.words()} kata</span>
        </div>
      </MenuBarGroup>
    </div>
  )
}

export default ({
  setContent,
  fontSize = "14",
  placeholder,
  isValid,
}: RichTextEditorProps) => {
  const { hovered, ref } = useHover()

  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Strike,
        Italic,
        OrderedList,
        BulletList,
        ListItem,
        Typography,
        Underline,
        History,
        CharacterCount,
        Link.configure({
          HTMLAttributes: {
            class: "link",
          },
        }),
        Placeholder.configure({
          placeholder,
          showOnlyWhenEditable: false,
        }),
      ],

      editorProps: {
        attributes: {
          class: "focus-visible:outline-none",
        },
      },

      onCreate: ({ editor }) => {
        editor.setEditable(false)
      },

      onUpdate: ({ editor }) => {
        setContent(editor.getHTML())
      },
    },
    [setContent]
  )

  useEffect(() => {
    if (editor) {
      editor.setEditable(hovered)
    }
  }, [hovered])

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <div
        className={`relative min-h-[300px] w-full rounded-md border-[2px] border-white bg-[#ffffff] ${
          isValid ? `border-white` : `border-red-500`
        }`}
        ref={ref}
      >
        <MenuBar editor={editor} />
        <EditorContent
          style={{ fontSize: `${fontSize}px` }}
          editor={editor}
          className="px-[12px] pb-[16px] text-black hover:cursor-text"
          spellCheck={false}
        />
      </div>
      {!isValid && (
        <p className="text-[11px] font-medium text-[#fa5252]">
          Deskripsi harus diisi
        </p>
      )}
    </div>
  )
}
