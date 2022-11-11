import {
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons"
import { Editor } from "@tiptap/core"
import { EditorContent, useEditor } from "@tiptap/react"
import Bold from "@tiptap/extension-bold"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Strike from "@tiptap/extension-strike"
import Italic from "@tiptap/extension-italic"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import BulletList from "@tiptap/extension-bullet-list"
import Typography from "@tiptap/extension-typography"
import History from "@tiptap/extension-history"
import Underline from "@tiptap/extension-underline"

interface RichTextEditorProps {
  fontSize?: string
  placeholder?: string
  setContent: (value: string) => void
}

interface MenuBarProps {
  editor: Editor | null
}

interface MenuBarGroupProps {
  children: React.ReactNode
}

interface MenuBarButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isActive?: boolean
}

const MenuBarGroup = ({ children }: MenuBarGroupProps) => (
  <div className="flex gap-[4px] border-r-[1px] border-opacity-50 pr-[8px]">
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
        ? "bg-black text-white hover:bg-opacity-70"
        : "bg-black bg-opacity-0 text-black hover:bg-opacity-10"
    } rounded-md p-[1px] transition`}
  >
    {children}
  </button>
)

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  editor.setEditable(true)

  return (
    <div className="m-[8px] flex gap-[8px] border-b-[1px] border-opacity-20 bg-[#ffffff] pb-[10px] text-black">
      <MenuBarGroup>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <FontBoldIcon width={20} height={20} />
        </MenuBarButton>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <FontItalicIcon width={20} height={20} />
        </MenuBarButton>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <StrikethroughIcon width={20} height={20} />
        </MenuBarButton>
      </MenuBarGroup>
      <MenuBarGroup>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <ListBulletIcon width={24} height={20} />
        </MenuBarButton>
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
            />
            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
          </svg>
        </MenuBarButton>
      </MenuBarGroup>
    </div>
  )
}

export default ({
  setContent,
  fontSize = "14",
  placeholder,
}: RichTextEditorProps) => {
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
        Placeholder.configure({
          placeholder,
          showOnlyWhenEditable: false,
        }),
      ],

      onUpdate: ({ editor }) => {
        setContent(editor.getHTML())
      },

      onBeforeCreate: ({ editor }) => {
        editor.setEditable(false)
      },

      onCreate: ({ editor }) => {
        editor.setEditable(true)
      },

      onFocus: ({ editor }) => {
        editor.setEditable(true)
      },

      onBlur: ({ editor }) => {
        editor.setEditable(false)
      },
    },
    [setContent, placeholder]
  )

  return (
    <div className="relative h-fit w-full rounded-md border-[1px] border-white bg-[#ffffff]">
      <EditorContent
        style={{ fontSize: `${fontSize}px` }}
        editor={editor}
        className="px-[16px] pb-[16px] text-black hover:cursor-text"
      >
        <MenuBar editor={editor} />
      </EditorContent>
    </div>
  )
}
