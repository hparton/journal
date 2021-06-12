import React from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'

import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
          listItem: false,
          bulletList: false,
          orderedList: false
        }),
        TaskList,
        TaskItem,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg m-5 focus:outline-none"
      }
    },
    content: `<h2>
    Hi there,
  </h2>
  <p>
    this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul data-type="task_list">
    <li data-type="taskItem" data-checked="true">A list item</li>
    <li data-type="taskItem" data-checked="false">And another one</li>
    <li data-type="taskItem" data-checked="false">And another one</li>
    <li data-type="taskItem" data-checked="false">And another one</li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
  display: none;
}</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>

  
  `,
  })

  return (
    <>
      {editor && <BubbleMenu className="bg-black text-white p-2" editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 ${editor.isActive('strike') ? 'is-active' : ''}`}
        >
          strike
        </button>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap