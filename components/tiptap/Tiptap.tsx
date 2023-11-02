"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { mergeAttributes } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { WebrtcProvider } from "y-webrtc";
import { useSession } from "next-auth/react";

const ydoc = new Y.Doc();

const provider = new WebrtcProvider("tiptap-collaboration-extension", ydoc);

export default function Tiptap({
  content,
  onChange,
}: {
  content: string;
  onChange: any;
}) {
  const { data: session } = useSession();
  const userName = session?.user.name;
  console.log(userName);
  const editor = useEditor({
    extensions: [
      Color.configure({
        types: [TextStyle.name, ListItem.name],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        heading: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }).extend({
        levels: [1, 2, 3],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: Record<number, string> = {
            1: "text-4xl font-bold",
            2: "text-2xl font-semibold",
            3: "text-xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200",
        },
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: userName,
          color: "#f783ac",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input bg-back",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch text-start min-h-[250px]">
      <div className="flex flex-col items-start ">
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
