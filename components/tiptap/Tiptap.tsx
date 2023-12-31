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
import TextAlign from "@tiptap/extension-text-align";
import { WebrtcProvider } from "y-webrtc";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import Loading from "../shared/Loading";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bot } from "lucide-react";

const ydoc = new Y.Doc();

const provider = new WebrtcProvider("tiptap-collaboration-extension", ydoc);

type ImageData = { url: string };

export default function Tiptap({
  content,
  onChange,
  onImageGenerated,
}: {
  content: string;
  onChange: any;
  onImageGenerated: any;
}) {
  const [loading, setLoading] = useState(false);
  const [AILoading, setAILoading] = useState(false);
  const [renderedImages, setRenderedImages] = useState<ImageData[]>([]);
  const { data: session } = useSession();
  const userName = session?.user.name;
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center"],
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

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const contentImage = editor?.getHTML();

      if (typeof contentImage === "string") {

        const last1000Characters = contentImage.slice(-1000);

        const resp = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: last1000Characters }),
        });

        if (!resp.ok) {
          throw new Error("Unable to generate the image");
        }

        const data = await resp.json();

        const imageUrl = data.data[0].url;

        setRenderedImages(data.data);
        console.log(renderedImages);

        onImageGenerated(imageUrl);
      } else {
        throw new Error("O conteúdo do editor não é uma string válida");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateParagraph = async () => {
    try {
      setAILoading(true);
      const content = editor?.getHTML();

      if (typeof content === "string") {
        const resp = await fetch("/api/openai/completion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (resp.ok && editor) {
          const data = await resp.json();
          const generatedContent = data.data.choices[0].text;
          editor.commands.insertContent(generatedContent);
        } else {
          throw new Error("Unable to generate the AI completion");
        }
      } else {
        throw new Error("O conteúdo do editor não é uma string válida");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setAILoading(false);
    }
  };

  const handleGenerateTwist = async () => {
    try {
      setAILoading(true);
      const content = editor?.getHTML();

      if (typeof content === "string") {
        const resp = await fetch("/api/openai/twist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (resp.ok && editor) {
          const data = await resp.json();
          const generatedContent = data.data.choices[0].text;
          editor.commands.insertContent(generatedContent);
        } else {
          throw new Error("Unable to generate the AI completion");
        }
      } else {
        throw new Error("O conteúdo do editor não é uma string válida");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setAILoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-stretch text-start min-h-[250px]">
      <div className="flex flex-col gap-2 items-center text-center justify-center my-2">
        <Button
          variant="outline"
          className="w-fit"
          type="button"
          onClick={handleGenerateImage}
        >
          {loading ? <Loading /> : "Gerar foto de capa"}
        </Button>
        <Popover>
          <PopoverTrigger>
            {AILoading ? <Loading /> : <Bot />}
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-fit gap-4">
            <Button
              variant={"ghost"}
              onClick={handleGenerateParagraph}
              type="button"
            >
              Completar um parágrafo
            </Button>
            <Button
              variant={"ghost"}
              onClick={handleGenerateTwist}
              type="button"
            >
              Faça uma reviravolta inesperada
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-start gap-2">
        <Toolbar editor={editor} />
        
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
