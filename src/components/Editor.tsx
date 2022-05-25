import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import debounce from 'debounce'

import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import {lowlight} from 'lowlight/lib/common'
import TitleBar from './ui/TitleBar'
import { useParams } from 'react-router-dom'

lowlight.registerAlias('javascript', 'js')

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const Editor = () => {
  const [content, setContent] = useState({type: 'doc', content: [{type: "paragraph"}]})
  const [contentLoaded, setContentLoaded] = useState(false)



  const {id} = useParams()


  useEffect(() => {
    const asyncThing = async () => {
      setContentLoaded(false)
      const note = await window.Notes.get(id)
      console.log(note)
      const tmp = JSON.parse(`${note.contents}`)

      setContent(tmp)
      setContentLoaded(true)
    }

    asyncThing()
  }, [id])

  useEffect(() => {
    editor?.commands.setContent(content)
  }, [content])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false
      }),
      CodeBlockLowlight.configure({
        lowlight
      }),
      TaskList,
      TaskItem,
      Placeholder.configure({
        placeholder: 'Whats on your mind?...'
      }),
      Typography,
      Link
    ],
    editorProps: {
      attributes: {
        class:
          "w-full h-full focus:outline-none"
      }
    },
    content
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    const onUpdate = debounce(({editor}) => {
      if (!editor) {
        return
      }
    
      const json = editor.getJSON()

      const getATitle = (editor) => {
        const body = editor.getText()
        const [firstLine] = body.split("\n")
        const limited = truncateString(firstLine, 50)
        return limited
      }

      window.Notes.update(id, {contents: JSON.stringify(json), title: getATitle(editor)})
    }, 750)



    editor.on('update', onUpdate)

    return () => {
      editor.off('update', onUpdate)
    }
  }, [editor])


  const handleEditorFocus = (event) => {
    if(event.target != event.currentTarget){
      return
    }

    editor?.commands.focus('end')
  }

  return (
    <div className="flex flex-col w-full h-full">
      <TitleBar />
      <div className="w-full h-full flex flex-col overflow-auto px-11 text-sidebarText">
        <div 
          className="editor w-full h-full py-11 mx-auto font-normal leading-relaxed cursor-text text-sm" 
          style={{maxWidth: 920}} 
          onClick={handleEditorFocus}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}

export default Editor
